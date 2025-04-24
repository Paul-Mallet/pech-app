import React, { ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import { FlatList, SafeAreaView, Text, View, RefreshControl, ScrollView, Alert, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import FishCard from '../components/molecules/fishCard.tsx';
import DescriptionSheet from '../components/organisms/descriptionSheet.tsx';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../components/organisms/ThemeContext.tsx';
import { getFishById } from '../services/fish.service.tsx';

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
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [pressedFish, setPressedFish] = useState<Fish | null>(null);
    const [filtered, setFiltered] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [fishes, setFishes] = useState<Fish[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isOfflineData, setIsOfflineData] = useState<boolean>(false);
    const navigation = useNavigation();
	const styles = GlobalStyles();
    const { theme } = useTheme();

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

    useEffect(() => {
        if (!isLoaded)
            fetchFishes();
    }, []);

    const handleFishPress = async (id: string) => {
        try {
            const fish = await getFishById(id);
            setPressedFish(fish);
            bottomSheetRef.current?.expand();
        } catch(err) {
            console.error("Failed to fetch fish:", err);
        } //finally loading
    };

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
            console.log(data);
            
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
            setIsLoaded(false);
        }
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
                    {isOfflineData && (
                        <Text style={{textAlign: 'center', color: '#e67e22', marginBottom: 10}}>
                            Données chargées depuis le cache. Tirez vers le bas pour actualiser.
                        </Text>
                    )}
                    <FlatList
                        data={fishes}
                        numColumns={2}
                        contentContainerStyle={{gap: 6}}
                        scrollEnabled={false}
                        keyExtractor={(item) => item.id.toString()}
                        columnWrapperStyle={{
                            gap: 6,
                            width: 160,
                            aspectRatio: 1}}
                        renderItem={({ item }) => (
                            <FishCard
                                onPress={() => handleFishPress(item.id.toString())}
                                fishName={item.name}
                                imgSource={item.img}
                            />
                        )}
                    />
				</View>
			</ScrollView>
            {pressedFish && (
                <DescriptionSheet
                    ref={bottomSheetRef}
                    fishId={pressedFish.id.toString()}
                    onClose={() => setPressedFish(null)}
                />
            )}
		</SafeAreaView>
	);
};

export default FishScreen;