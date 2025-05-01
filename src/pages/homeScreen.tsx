import React, { useRef, useCallback, useState, useEffect } from 'react';
import { View, SafeAreaView, Animated, Dimensions, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/organisms/searchBar.tsx';
import DecouvrirTab from './discoverSection.tsx';
import HistoryList from './historySection.tsx';
import { useHistory } from '../components/organisms/HistoryContext.tsx';
import DescriptionSheet from '../components/organisms/descriptionSheet.tsx';
import LegislationSheet from '../components/organisms/legislationSheet.tsx';
import TabSwitcher from '../components/organisms/tabSwitcher.tsx';
import EventBus from '../components/organisms/EventBus.tsx';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { Fish } from '../models/fish.model.tsx';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({ route }: { route: any }) => {
	const { groupedHistory, fetchFishes } = useHistory();
	const { getFishById } = useHistory();
	const navigation = useNavigation();
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const translateX = useRef(new Animated.Value(0)).current;
	const startTouch = useRef({ x: 0, y: 0 });
	const gestureDirection = useRef<'horizontal' | 'vertical' | null>(null);
	const hasSwitched = useRef(false);
	const [pressedFish, setPressedFish] = useState<Fish | null>(null);
	const pressedFishRef = useRef(pressedFish);
	const [activeTab, setActiveTab] = useState('découvrir');
	const styles = GlobalStyles();
	const decouvrir = 'découvrir';
	const revoir = 'revoir';
	const [legislationId, setLegislationId] = useState<string>("");
	const [pressedLegislation, setPressedLegislation] = useState<string | null>(null);
	const pressedLegislationRef = useRef(pressedLegislation);

	useEffect(() => 
	{
		fetchFishes();
	}, [])

	useEffect(() => {
		pressedLegislationRef.current = pressedLegislation;
	}, [pressedLegislation]);

	useEffect(() => {
		pressedFishRef.current = pressedFish;
	}, [pressedFish]);
	
	const handleLegislationPress = (id: string) => {
		setLegislationId(id);
		setPressedLegislation(id.toString());
		bottomSheetRef.current?.expand();
	};

    useEffect(() => {
        if (pressedFish && bottomSheetRef.current) {
            bottomSheetRef.current.expand();
        }
    }, [pressedFish]);

	useEffect(() => {
		const handler = () => {
			if (pressedLegislationRef.current)
				setPressedLegislation(null);
			else if (pressedFishRef.current)
				setPressedFish(null);
			else
		  		switchTab(decouvrir);
		};
		EventBus.on('homeTabPress', handler);
		return () => {
		  EventBus.off('homeTabPress', handler);
		};
	  }, []);

	const handleFishPress = (fishId: string) => {
		const fish = getFishById(fishId);
		if (fish)
			setPressedFish(fish);
	  };
	
	const switchTab = (target: string) => {
		const toValue = target === decouvrir ? 0 : -screenWidth;
		Animated.spring(translateX, {
			toValue,
			useNativeDriver: true,
		}).start();
		setActiveTab(target);
	};

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: (_, gestureState) => {
				const { dx, dy } = gestureState;
				return Math.abs(dx) > 20 && Math.abs(dx) > Math.abs(dy);
			},
			onPanResponderGrant: (evt) => {
				startTouch.current = {
					x: evt.nativeEvent.pageX,
					y: evt.nativeEvent.pageY,
				};
				gestureDirection.current = null;
				hasSwitched.current = false;
			},
			onPanResponderMove: (_, gestureState) => {
				if (gestureDirection.current === 'vertical' || hasSwitched.current) return;
			
				const { dx, dy } = gestureState;
				if (!gestureDirection.current && (Math.abs(dx) > 40 || Math.abs(dy) > 40)) {
					gestureDirection.current = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical';
				}
			
				if (gestureDirection.current === 'horizontal') {
					if (dx < -30) {
						switchTab(revoir);
						hasSwitched.current = true;
					} else if (dx > 30) {
						switchTab(decouvrir);
						hasSwitched.current = true;
					}
				}
			},
			onPanResponderRelease: () => {
				gestureDirection.current = null;
				hasSwitched.current = false;
			},
			onPanResponderTerminate: () => {
				gestureDirection.current = null;
				hasSwitched.current = false;
			},
		})
	).current;

	return (
		<SafeAreaView style={styles.body}>
			<SearchBar />
			<TabSwitcher
				activeTab={activeTab}
				switchTab={switchTab}
				tabs={[
					{ key: decouvrir, label: 'Découvrir' },
					{ key: revoir, label: 'Revoir' },
				]}
			/>
			<View style={{ flex: 1 }} {...panResponder.panHandlers}>
				<Animated.View style={{ flexDirection: 'row', width: screenWidth * 2, transform: [{ translateX }] }}>
					<DecouvrirTab
						handleFishPress={handleFishPress}
						handleLegislationPress={handleLegislationPress}
					/>
					<HistoryList
						groupedHistory={groupedHistory}
						handleFishPress={handleFishPress}
					/>
				</Animated.View>
			</View>
			{pressedFish && (
				<DescriptionSheet
					ref={bottomSheetRef}
					fish={pressedFish}
					onClose={() => {setPressedFish(null)}}
				/>
			)}
			{pressedLegislation && (
				<LegislationSheet
					ref={bottomSheetRef}
					legislationId={legislationId}
					onClose={() => setPressedLegislation(null)}
				/>
			)}
		</SafeAreaView>
	);
};

export default HomeScreen;
