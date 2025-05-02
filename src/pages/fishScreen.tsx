import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { FlatList, SafeAreaView, Text, View, RefreshControl,
    ScrollView, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FishCard from '../components/molecules/fishCard.tsx';
import DescriptionSheet from '../components/organisms/descriptionSheet.tsx';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../components/organisms/ThemeContext.tsx';
import { getFishById } from '../services/fish.service.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import EventBus from '../components/organisms/EventBus.tsx';
import { useHistory } from '../components/organisms/HistoryContext.tsx';
import { Fish } from '../models/fish.model.tsx';

const FishScreen = () => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    // const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pressedFish, setPressedFish] = useState<Fish | null>(null);
    const [filtered, setFiltered] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const navigation = useNavigation();
	const styles = GlobalStyles();
    const { theme } = useTheme();
    const { fetchFishes, fishes } = useHistory();

    useEffect(() => {
        const handler = () => {
          navigation.navigate("Poissons");
        };
        EventBus.on('poissonsTabPress', handler);
        return () => {
          EventBus.off('poissonsTabPress', handler);
        };
      }, []);

    useEffect(() => {
        if (pressedFish && bottomSheetRef.current) {
            bottomSheetRef.current.expand();
        }
    }, [pressedFish]);

    const handleFilterButtonPress = () => {
        if (!filtered)
            navigation.navigate('FishResearch');
        else
            setFiltered(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
    };

    const handleFishPress = async (fishId: string) => {
        try {
            const fish = await getFishById(fishId);
            if (fish)
                setPressedFish(fish);
            else
                console.error("Failed to fetch fish:", error);
        } catch (error) {
            console.error("Failed to fetch fish:", error);
        }
    };

    // used to remove the (not true) errors
    // const safeAsyncStorage = AsyncStorage as unknown as {
    //     getItem: (key: string) => Promise<string | null>;
    //     setItem: (key: string, value: string) => Promise<void>;
    // };

    // const saveFishesToStorage = async (fishesData: Fish[]) => {
    //     try {
    //         await safeAsyncStorage.setItem('cached_fishes', JSON.stringify(fishesData));
    //         await safeAsyncStorage.setItem('fishes_last_updated', new Date().toISOString());
    //     } catch (e) {
    //         console.error('Erreur lors de la sauvegarde des données dans le stockage local:', e);
    //     }
    // };

    // const getStoredFishes = async (): Promise<Fish[] | null> => {
    //     try {
    //         const cachedFishes = await safeAsyncStorage.getItem('cached_fishes');
    //         if (cachedFishes) {
    //             return JSON.parse(cachedFishes);
    //         }
    //         return null;
    //     } catch (e) {
    //         console.error('Erreur lors de la récupération des données du stockage local:', e);
    //         return null;
    //     }
    // };

	if (error || !fishes) {
		return (
			<SafeAreaView style={styles.body}>
                <View>
                    <Text style={styles.h2}>Poissons</Text>
                    <TouchableOpacity style={styles.quizzButton} onPress={handleFilterButtonPress}>
                        <FontAwesome name={filtered ? "close" : "filter"} size={20} color={theme.textBoldLight} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 110 }}>
                    <Text>Erreur</Text>
                    <Text>{error || "Données non disponibles"}</Text>
                    <Button
                        title="Réessayer"
                        onPress={fetchFishes}
                        color={theme.textDark}
                    />
                </View>
		    </SafeAreaView>
		);
	};
	return (
		<SafeAreaView style={styles.body}>
            <TouchableOpacity style={styles.quizzButton} onPress={handleFilterButtonPress}>
                <FontAwesome name={filtered ? "close" : "filter"} size={20} color={theme.textBoldLight} />
            </TouchableOpacity>
			<ScrollView
				contentContainerStyle={{flexGrow: 1}}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={['#2e86de']}
						tintColor={'#2e86de'}
						title={'Chargement des poissons...'}
						titleColor={'#2e86de'}
					/>
				}
			>
				<View style={[styles.homePanel, {paddingTop: 20, marginTop: 40, paddingBottom: 40}]}>
                    <Text style={styles.h2}>Poissons</Text>
                    <FlatList
                        data={fishes}
                        numColumns={2}
                        contentContainerStyle={{gap: 6, paddingBottom: 8}}
                        scrollEnabled={false}
                        keyExtractor={(item) => item.id.toString()}
                        columnWrapperStyle={{ gap: 6, width: 160, aspectRatio: 1 }}
                        renderItem={({ item }) => (
                            <FishCard
                                onPress={() => handleFishPress(item.id.toString())}
                                id={item.id.toString()}
                                fishName={item.name}
                                imgSource={item.additionalImages[0].url}
                            />
                        )}
                    />
				</View>
			</ScrollView>
            {pressedFish && (
                <DescriptionSheet
                    ref={bottomSheetRef}
                    fish={pressedFish}
                    onClose={() => setPressedFish(null)}
                />
            )}
		</SafeAreaView>
	);
};

export default FishScreen;