import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { FlatList, SafeAreaView, Text, View, RefreshControl,
    ScrollView, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FishCard from '../components/molecules/fishCard.tsx';
import DescriptionSheet from '../components/organisms/descriptionSheet.tsx';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../components/organisms/ThemeContext.tsx';
import { getAllFish, getFishById } from '../services/fish.service.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface HomeCardProps {
    children?: ReactNode;
}

export interface Fish {
	scientificName: string;
	minSizeCm: string;
	englishAcronym: string;
	physicalDescription: 
    {
        WRF: string;
        moreInfos: string;
    }
    additionalImages: Array<{
        id: number;
        url: string;
    }>;
    id: number;
    name: string;
    img: string;
    bodyType: {
        id: number;
        name: string;
        description: string;
    };
    fins: Array<{
        id: number;
        type: string;
        shape: string;
        color: string;
        size: string;
    }>;
    eyes: Array<{
        id: number;
        color: string;
        size: string;
        position: string;
    }>;
}

const FishScreen = ({ children }: HomeCardProps) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const [fishes, setFishes] = useState<Fish[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pressedFish, setPressedFish] = useState<Fish | null>(null);
    const [filtered, setFiltered] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const navigation = useNavigation();
	const styles = GlobalStyles();
    const { theme } = useTheme();

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
        fetchFishes();
    };

    const fetchFishes = async () => {
        try {
            const fishesVar = await getAllFish();
            console.log("\x1b[36mFetched all fishes:\x1b[0m", JSON.stringify(fishesVar));
            setFishes(fishesVar);
        } catch (err) {
            setError('Impossible de charger les données des poissons.');
        }
    };

    useEffect(() => {
        fetchFishes();
    }, []);

    const handleFishPress = async (fish: Fish) => {
        try {
            // const fish = await getFishById(id);
            setPressedFish(fish);
        } catch (error) {
            console.error("Failed to fetch fish:", error);
        }
    };

    // used to remove the (not true) errors
    const safeAsyncStorage = AsyncStorage as unknown as {
        getItem: (key: string) => Promise<string | null>;
        setItem: (key: string, value: string) => Promise<void>;
    };

    const saveFishesToStorage = async (fishesData: Fish[]) => {
        try {
            await safeAsyncStorage.setItem('cached_fishes', JSON.stringify(fishesData));
            await safeAsyncStorage.setItem('fishes_last_updated', new Date().toISOString());
        } catch (e) {
            console.error('Erreur lors de la sauvegarde des données dans le stockage local:', e);
        }
    };

    const getStoredFishes = async (): Promise<Fish[] | null> => {
        try {
            const cachedFishes = await safeAsyncStorage.getItem('cached_fishes');
            if (cachedFishes) {
                return JSON.parse(cachedFishes);
            }
            return null;
        } catch (e) {
            console.error('Erreur lors de la récupération des données du stockage local:', e);
            return null;
        }
    };

    // const fetchFishes = async () => {
    //     try {
    //         setLoading(true);
    //         setIsOfflineData(false);
            
    //         const response = await fetch('https://pechapp.edwindev.fr/api/fish');
            
    //         if (!response.ok) {
    //             throw new Error('Erreur lors de la récupération des données');
    //         }
            
    //         const data = await response.json();
    //         setFishes(data);
    //         setError(null);
            
    //         // Sauvegarder les données dans le stockage local
    //         saveFishesToStorage(data);
            
    //     } catch (err) {
    //         console.error('Erreur:', err);
            
    //         // En cas d'erreur (comme pas de connexion), essayer de charger depuis le stockage local
    //         const storedFishes = await getStoredFishes();
            
    //         if (storedFishes && storedFishes.length > 0) {
    //             setFishes(storedFishes);
    //             setIsOfflineData(true);
    //             setError(null);
    //         } else {
    //             setError('Impossible de charger les données. Veuillez réessayer.');
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // };

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

    // if (loading) {
	// 	return (
	// 		<SafeAreaView style={styles.body}>
    //             <Text style={[styles.h2, { zIndex: 110, marginTop: 60, paddingLeft: 16 }]}>Poissons</Text>
    //             <TouchableOpacity style={styles.quizzButton} onPress={handleFilterButtonPress}>
    //                 <FontAwesome name={filtered ? "close" : "filter"} size={20} color={theme.textBoldLight} />
    //             </TouchableOpacity>
    //             <View style={{ marginTop: 110 }}>
    //                 <ActivityIndicator size="large" color={theme.textDark} />
    //             </View>
	// 	    </SafeAreaView>
	// 	);
	// }
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
                        contentContainerStyle={{gap: 6}}
                        scrollEnabled={false}
                        keyExtractor={(item) => item.id.toString()}
                        columnWrapperStyle={{ gap: 6, width: 160, aspectRatio: 1 }}
                        renderItem={({ item }) => (
                            <FishCard
                                onPress={() => handleFishPress(item)}
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