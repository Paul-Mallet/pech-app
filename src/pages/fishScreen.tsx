import React, { ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import { FlatList, SafeAreaView, Text, View, RefreshControl, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import FishCard from '../components/molecules/fishCard.tsx';
import BottomSheet from '@gorhom/bottom-sheet';
import DescriptionSheet from '../components/organisms/descriptionSheet.tsx';

interface HomeCardProps {
    children?: ReactNode;
}

interface Fish {
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
	const styles = GlobalStyles();
    const [pressedFish, setPressedFish] = useState<string | null>(null);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [fishes, setFishes] = useState<Fish[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isOfflineData, setIsOfflineData] = useState<boolean>(false);

    useEffect(() => {
        fetchFishes();
    }, []);

    const handleFishPress = (fishName: string) => {
		setPressedFish(fishName);
		bottomSheetRef.current?.expand();
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

    const fetchFishes = async () => {
        try {
            setLoading(true);
            setIsOfflineData(false);
            
            const response = await fetch('https://pechapp.edwindev.fr/api/fish');
            
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            
            const data = await response.json();
            setFishes(data);
            setError(null);
            
            // Sauvegarder les données dans le stockage local
            saveFishesToStorage(data);
            
        } catch (err) {
            console.error('Erreur:', err);
            
            // En cas d'erreur (comme pas de connexion), essayer de charger depuis le stockage local
            const storedFishes = await getStoredFishes();
            
            if (storedFishes && storedFishes.length > 0) {
                setFishes(storedFishes);
                setIsOfflineData(true);
                setError(null);
            } else {
                setError('Impossible de charger les données. Veuillez réessayer.');
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchFishes();
    };

	return (
		<SafeAreaView style={styles.body}>
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
					{isOfflineData && (
						<Text style={{textAlign: 'center', color: '#e67e22', marginBottom: 10}}>
							Données chargées depuis le cache. Tirez vers le bas pour actualiser.
						</Text>
					)}
					<FlatList
						contentContainerStyle={{gap: 12}}
						data={fishes}
						numColumns={2}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
                            <FishCard
                                onPress={() => handleFishPress(item.name)}
                                fishName={item.name}
                                imgSource={item.img}
                            />
						)}
						scrollEnabled={false}
					/>
				</View>
			</ScrollView>
            {pressedFish && (
                <DescriptionSheet
                    ref={bottomSheetRef}
                    fishName={pressedFish}
                    onClose={() => setPressedFish(null)}
                />
            )}
		</SafeAreaView>
	);
};

export default FishScreen;