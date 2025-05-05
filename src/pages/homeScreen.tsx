import React, { useRef, useState, useEffect } from 'react';
import { View, SafeAreaView, Animated, Dimensions, PanResponder, BackHandler } from 'react-native';
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

const HomeScreen = () => {
	const { groupedHistory, fetchFishes, fetchLegislations, getHomeRandomContent, fishes, legislations } = useHistory();
	const translateX = useRef(new Animated.Value(0)).current;
	const startTouch = useRef({ x: 0, y: 0 });
	const gestureDirection = useRef<'horizontal' | 'vertical' | null>(null);
	const hasSwitched = useRef(false);
	const [pressedFish, setPressedFish] = useState<Fish | null>(null);
	const pressedFishRef = useRef(pressedFish);
	const [activeTab, setActiveTab] = useState('découvrir');
	const styles = GlobalStyles();
	const decouvrir = 'découvrir';
	const historique = 'historique';
	const [legislationId, setLegislationId] = useState<string>("");
	const [pressedLegislation, setPressedLegislation] = useState<string | null>(null);
	const pressedLegislationRef = useRef(pressedLegislation);
	const [homeContent, setHomeContent] = useState<{ fishes: Fish[], legislations: any[] }>({ fishes: [], legislations: [] });
	const fishSheetRef = useRef<BottomSheetModal>(null);
	const legislationSheetRef = useRef<BottomSheetModal>(null);

	const reinitRefs = () =>
	{
		gestureDirection.current = null;
		hasSwitched.current = false;
		// console.log("Gesture direction reset:", gestureDirection.current);
	}
	
	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
		  'hardwareBackPress',
		  () => {
			if (activeTab !== decouvrir) {
				switchTab(decouvrir);
			  return true;
			}
			return false;
		  }
		);
	
		return () => backHandler.remove();
	  }, [activeTab]);


	useEffect(() => {
		const load = async () => {
		  await Promise.all([fetchFishes(), fetchLegislations()]);
		};
	  
		load();
	  }, []);

	useEffect(() => {
	if (fishes.length && legislations.length) {
		const content = getHomeRandomContent();
		setHomeContent(content);
	}
	}, [fishes, legislations]);

	useEffect(() => {
		pressedLegislationRef.current = pressedLegislation;
	}, [pressedLegislation]);

	useEffect(() => {
		pressedFishRef.current = pressedFish;
	}, [pressedFish]);
	
	const handleLegislationPress = (legislationId: string) => {
		setLegislationId(legislationId);
		setPressedLegislation(legislationId.toString());
		legislationSheetRef.current?.expand();
	};

    useEffect(() => {
        if (pressedFish && fishSheetRef.current) {
            fishSheetRef.current.expand();
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
	  
	const { getFishById } = useHistory();
	const handleFishPress = (fishId: string) => {
		const fish = getFishById(fishId);
		if (fish)
			setPressedFish(fish);
	  };
	
	const switchTab = (target: string) => {
		const toValue = target === decouvrir ? 0 : -screenWidth;
		Animated.spring(translateX, {
			toValue,
			useNativeDriver: false,
		}).start();
		setActiveTab(target);
	};

	const handleHorizontalSwipe = (dx: number) => {
		if (dx < -30) {
			switchTab(historique);
			hasSwitched.current = true;
		} else if (dx > 30) {
			switchTab(decouvrir);
			hasSwitched.current = true;
		}
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
			},
			
			onPanResponderMove: (_, { dx, dy }) => {
				if (gestureDirection.current === 'vertical' || hasSwitched.current) return;
			
				if (!gestureDirection.current && (Math.abs(dx) > 40 || Math.abs(dy) > 40)) {
					gestureDirection.current = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical';
					// console.log("Gesture direction:", gestureDirection.current);
				}
			
				if (gestureDirection.current === 'horizontal') {
					handleHorizontalSwipe(dx);
				}
			},
			onPanResponderRelease: () => {
				reinitRefs();
			},
		})
	).current;

	return (
		<SafeAreaView style={styles.body}>
			<SearchBar setPressedFish={handleFishPress} setPressedLegislation={handleLegislationPress} />
			<TabSwitcher
				activeTab={activeTab}
				switchTab={switchTab}
				tabs={[
					{ key: decouvrir, label: 'Découvrir' },
					{ key: historique, label: 'Historique' },
				]}
			/>
			<View style={{ flex: 1 }} {...panResponder.panHandlers}>
				<Animated.View style={{ flexDirection: 'row', width: screenWidth * 2, transform: [{ translateX }] }}>
					<DecouvrirTab handleFishPress={handleFishPress} handleLegislationPress={handleLegislationPress} fishes={homeContent.fishes} legislations={homeContent.legislations} />
					<HistoryList groupedHistory={groupedHistory} handleFishPress={handleFishPress}/>
				</Animated.View>
			</View>
			{pressedFish && (<DescriptionSheet ref={fishSheetRef} fish={pressedFish} onClose={() => {setPressedFish(null)}} />)}
			{pressedLegislation && (<LegislationSheet ref={legislationSheetRef} legislationId={legislationId} onClose={() => setPressedLegislation(null)} />)}
		</SafeAreaView>
	);
};

export default HomeScreen;
