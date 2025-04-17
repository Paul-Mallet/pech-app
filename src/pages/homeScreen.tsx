import React, { useRef, useCallback, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Animated, Dimensions, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FishCard from '../components/molecules/fishCard.tsx';
import LegislationCard from '../components/molecules/legislationCard.tsx';
import SearchBar from '../components/organisms/searchBar.tsx';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { useTheme } from '../components/organisms/ThemeContext.tsx';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({ route }: { route: any }) => {
	const decouvrir = 'découvrir';
	const revoir = 'revoir';
	const styles = GlobalStyles();
	const { theme } = useTheme();
	const [pressedFish, setPressedFish] = useState<string | null>(null);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const styles = GlobalStyles();

	const handleFishPress = (fishName: string) => {
		setPressedFish(fishName);
		bottomSheetRef.current?.expand();
	};

	const handleSheetClose = useCallback(() => {
		setPressedFish(null);
	}, []);
	
	// const [visibleModal, setModalVisible] = useState(false);
	const navigation = useNavigation();

	const [activeTab, setActiveTab] = useState(decouvrir);
	const translateX = useRef(new Animated.Value(0)).current;

	const startTouch = useRef({ x: 0, y: 0 });
	const gestureDirection = useRef<'horizontal' | 'vertical' | null>(null);
	const hasSwitched = useRef(false);

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

	const goToLegislationScreen = (text: string) => {
		navigation.navigate('Tabs', {
			screen: 'Législation',
			params: { searchText: text },
		});
	};

	return (
		<SafeAreaView style={styles.body}>
			<SearchBar />
			<View>
				<View style={styles.homePanelTabs}>
					<TouchableOpacity
						onPress={() => switchTab(decouvrir)}
						style={{
							borderBottomWidth: 2,
							borderBottomColor: activeTab === decouvrir ? theme.navBarBackground : 'transparent',
							flex: 1 / 2,
						}}
					>
						<Text style={[styles.textDark, { textAlign: 'center', fontSize: 16,
							color: activeTab === decouvrir ? theme.textHighlightDark : theme.textDark }]}>
							Découvrir
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => switchTab(revoir)}
						style={{
							flex: 1 / 2,
							borderBottomWidth: 2,
							borderBottomColor: activeTab === revoir ? theme.navBarBackground : 'transparent',
						}}
					>
						<Text style={[styles.textDark, { textAlign: 'center', fontSize: 16,
							color: activeTab === revoir ? theme.textHighlightDark : theme.textDark }]}>
							Revoir
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View style={{ flex: 1 }} {...panResponder.panHandlers}>
				<Animated.View
					style={{
						flexDirection: 'row',
						width: screenWidth * 2,
						transform: [{ translateX }],
					}}
				>
					{/* Découvrir Tab */}
					<ScrollView
						style={[styles.homePanel, { width: screenWidth, padding: 20 }]}
						showsVerticalScrollIndicator={false}
					>
						<View style={styles.fishCardsContainer}>
							<FishCard
								onPress={() => console.log('Card pressed')}
								fishName='Mérou brun'
								imgSource='https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg'
							/>
							<FishCard
								onPress={() => console.log('Card pressed')}
								fishName='Thon rouge'
								imgSource='https://img.cuisineaz.com/660x660/2016/04/28/i58301-thon-rouge-de-ligne-cru.jpg'
							/>
						</View>
						<LegislationCard
							title='Arrêté du 9 Juillet 2024'
							text='Réglementation particulière de la pêche maritime de loisir à l’intérieur du périmètre de la <h>Réserve Naturelle Marine...</h>'
							onPress={() => console.log('Text card pressed')}
						/>
						<LegislationCard
							title='Arrêté du 22 Mars 2024'
							text='Réglementation particulière de la pêche maritime de loisir dans les eaux au droit de l’<h>île de Porquerolles</h>, de ses îlots...'
							onPress={() => console.log('Text card pressed')}
						/>
						<LegislationCard
							title='Arrêté du 9 Juillet 2024 portant réglementation particulière de la pêche maritime de loisir à l’intérieur du périmètre de la Réserve Naturelle Marine de Cerbère-Banyuls :'
							text='Pêche maritime de loisir à l’intérieur de la zone est soumise à la détention préalable d’une autorisation. Maximum de 1000 autorisations sur une année civile. Pêche maritime de loisir autorisée qu’entre le lever et le coucher du soleil.10 prises dans la limite des quotas et tailles minimales, par jour et par navire quel que soit le nombre de personnes embarquées, et par jour et par pêcheur à pied lorsque ce dernier œuvre depuis le rivage.'
							onPress={() => console.log('Text card pressed')}
						/>
						<LegislationCard
							title='Arrêté du 22 Mars 2024'
							text='Réglementation particulière de la pêche maritime de loisir dans les eaux au droit de l’<h>île de Porquerolles</h>, de ses îlots...'
							onPress={() => console.log('Text card pressed')}
						/>
						<LegislationCard
							title='Arrêté du 22 Mars 2024'
							text='Réglementation particulière de la pêche maritime de loisir dans les eaux au droit de l’<h>île de Porquerolles</h>, de ses îlots...'
							onPress={() => console.log('Text card pressed')}
						/>
					</ScrollView>

					{/* Revoir Tab */}
					<ScrollView
						style={{ width: screenWidth, padding: 20 }}
						showsVerticalScrollIndicator={false}
					>
						<Text style={styles.textDark}>Contenu Revoir</Text>
					</ScrollView>
				</Animated.View>
			</View>
			{
				pressedFish && (
					<DescriptionSheet
						ref={bottomSheetRef}
						fishName={pressedFish}
						onClose={handleSheetClose}
					/>
				)
			}
		</SafeAreaView>
	);
};

export default HomeScreen;
