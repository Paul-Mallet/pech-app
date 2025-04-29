import React, { useRef, useCallback, useState } from 'react';
import { View, SafeAreaView, Animated, Dimensions, PanResponder } from 'react-native';
import SearchBar from '../components/organisms/searchBar.tsx';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { useTheme } from '../components/organisms/ThemeContext.tsx';
import DescriptionSheet from '../components/organisms/descriptionSheet.tsx';
import { useHistory } from '../components/organisms/HistoryContext.tsx';
import HistoryList from './historySection.tsx';
import DecouvrirTab from './discoverSection.tsx';
import TabSwitcher from '../components/organisms/tabSwitcher.tsx';
import { Fish } from './fishScreen.tsx';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({ route }: { route: any }) => {
	const { groupedHistory } = useHistory();
	const bottomSheetRef = useRef<BottomSheet>(null);
	const translateX = useRef(new Animated.Value(0)).current;
	const startTouch = useRef({ x: 0, y: 0 });
	const gestureDirection = useRef<'horizontal' | 'vertical' | null>(null);
	const hasSwitched = useRef(false);
	const [pressedFish, setPressedFish] = useState<Fish | null>(null);
	const [activeTab, setActiveTab] = useState('découvrir');
	const styles = GlobalStyles();
	const { theme } = useTheme();
	const decouvrir = 'découvrir';
	const revoir = 'revoir';

	const handleFishPress = (fish: Fish) => {
		setPressedFish(fish);
		bottomSheetRef.current?.expand();
	};

	const handleSheetClose = useCallback(() => {
		setPressedFish(null);
	}, []);
	
	const switchTab = (target: string) => {
		const toValue = target === decouvrir ? 0 : -screenWidth;
		Animated.spring(translateX, {
			toValue,
			useNativeDriver: true,
		}).start();
		setActiveTab(target);
	};

	// probable bug with multiple tabs (more than 2): the activeTab doesn't update correctly
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

	// const goToLegislationScreen = (text: string) => {
	// 	navigation.navigate('Tabs', {
	// 		screen: 'Législation',
	// 		params: { searchText: text },
	// 	});
	// };

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
					<DecouvrirTab handleFishPress={handleFishPress} />
					<HistoryList groupedHistory={groupedHistory} handleFishPress={handleFishPress}/>
				</Animated.View>
			</View>
			{pressedFish && (<DescriptionSheet ref={bottomSheetRef} fish={pressedFish} onClose={handleSheetClose} />)}
		</SafeAreaView>
	);
};

export default HomeScreen;
