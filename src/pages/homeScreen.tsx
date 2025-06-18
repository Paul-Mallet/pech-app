import { useRef, useState, useEffect } from 'react';
import * as React from 'react';
import { View, SafeAreaView, Animated, Dimensions, PanResponder, BackHandler } from 'react-native';
import SearchBar from '../components/organisms/searchBar.tsx';
import DecouvrirTab from './discoverSection.tsx';
import HistoryList from './historySection.tsx';
import { useHistory } from '../components/organisms/HistoryContext.tsx';
import DescriptionSheet from '../components/organisms/descriptionSheet.tsx';
import LegislationSheet from '../components/organisms/legislationSheet.tsx';
import TabSwitcher from '../components/organisms/tabSwitcher.tsx';
import EventBus from '../components/organisms/EventBus.tsx';
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
	const [pressedLegislation, setPressedLegislation] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState('Découvrir');
	const [legislationId, setLegislationId] = useState<string>("");
	const [homeContent, setHomeContent] = useState<{ fishes: Fish[], legislations: any[] }>({ fishes: [], legislations: [] });
	const styles = GlobalStyles();

	const reinitRefs = () => {
		gestureDirection.current = null;
		hasSwitched.current = false;
	};

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => {
				if (activeTab !== 'Découvrir') {
					switchTab('Découvrir');
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
		const handler = () => {
			if (pressedLegislation)
				setPressedLegislation(null);
			else if (pressedFish)
				setPressedFish(null);
			else
				switchTab('Découvrir');
		};
		EventBus.on('homeTabPress', handler);
		return () => {
			EventBus.off('homeTabPress', handler);
		};
	}, [pressedFish, pressedLegislation]);

	const { getFishById } = useHistory();
	const handleFishPress = (fishId: string) => {
		const fish = getFishById(fishId);
		if (fish)
			setPressedFish(fish);
	};

	const handleLegislationPress = (legislationId: string) => {
		setLegislationId(legislationId);
		setPressedLegislation(legislationId);
	};

	const switchTab = (target: string) => {
		const toValue = target === 'Découvrir' ? 0 : -screenWidth;
		Animated.spring(translateX, {
			toValue,
			useNativeDriver: false,
		}).start();
		setActiveTab(target);
	};

	const handleHorizontalSwipe = (dx: number) => {
		if (dx < -30) {
			switchTab('Historique');
			hasSwitched.current = true;
		} else if (dx > 30) {
			switchTab('Découvrir');
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
				tabs={[{ key: 'Découvrir', label: 'Découvrir' }, { key: 'Historique', label: 'Historique' }]}
			/>
			<View style={{ flex: 1 }} {...panResponder.panHandlers}>
				<Animated.View style={{ flexDirection: 'row', width: screenWidth * 2, transform: [{ translateX }] }}>
					<DecouvrirTab handleFishPress={handleFishPress} handleLegislationPress={handleLegislationPress} fishes={homeContent.fishes} legislations={homeContent.legislations} />
					<HistoryList groupedHistory={groupedHistory} handleFishPress={handleFishPress} />
				</Animated.View>
			</View>
			<DescriptionSheet fish={pressedFish} visible={!!pressedFish} onClose={() => setPressedFish(null)} />
			<LegislationSheet legislationId={legislationId} visible={!!pressedLegislation} onClose={() => setPressedLegislation(null)} />
		</SafeAreaView>
	);
};

export default HomeScreen;
