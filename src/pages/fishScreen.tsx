import React, { ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import { FlatList, SafeAreaView, Text, View, RefreshControl, ScrollView } from 'react-native';
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

    useEffect(() => {
        fetchFishes();
    }, []);

    const handleFishPress = (fishName: string) => {
		setPressedFish(fishName);
		bottomSheetRef.current?.expand();
	};

    const fetchFishes = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://pechapp.edwindev.fr/api/fish');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            const data = await response.json();
            setFishes(data);
            setError(null);
        } catch (err) {
            console.error('Erreur:', err);
            setError('Impossible de charger les données. Veuillez réessayer.');
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
					<Text style={styles.titleDark}>Poissons</Text>
					<FlatList
						contentContainerStyle={{gap: 12}}
						data={fishes}
						numColumns={2}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<View style={{flex: 1}}>
								<FishCard
									onPress={() => handleFishPress(item.name)}
									fishName={item.name}
									imgSource={item.img}
								/>
							</View>
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