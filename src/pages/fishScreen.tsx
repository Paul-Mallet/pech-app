import React, { useState, useEffect, useRef } from 'react';
import { FlatList, SafeAreaView, Text, View, RefreshControl, ScrollView, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FishCard from '../components/molecules/fishCard.tsx';
import DescriptionSheet from '../components/organisms/descriptionSheet.tsx';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../components/organisms/ThemeContext.tsx';
import { getFishById } from '../services/fish.service.tsx';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import EventBus from '../components/organisms/EventBus.tsx';
import { useHistory } from '../components/organisms/HistoryContext.tsx';
import { Fish } from '../models/fish.model.tsx';

export const useFilteredFishes = () => {
    const [filteredFishes, setFilteredFishes] = useState<number[]>([]);
  
    const addFilteredFish = (ids: number | number[]) => {
      setFilteredFishes(prev => {
        const newIds = Array.isArray(ids) ? ids : [ids];
        const uniqueNewIds = newIds.filter(id => !prev.includes(id));
        return [...prev, ...uniqueNewIds];
      });
    };

    const replaceFilteredFishes = (ids: number | number[]) =>
    {
        setFilteredFishes(Array.isArray(ids) ? ids : [ids]);
    }

    const resetFilteredFishes = () =>
    {
        setFilteredFishes([]);
    }
  
    return { filteredFishes, addFilteredFish, resetFilteredFishes, replaceFilteredFishes };
  };
  
const FishScreen = () => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const [pressedFish, setPressedFish] = useState<Fish | null>(null);
    const [filtered, setFiltered] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const navigation = useNavigation();
	const styles = GlobalStyles();
    const { theme } = useTheme();
    const { fetchFishes, fishes } = useHistory();
    const {filteredFishes, addFilteredFish} = useFilteredFishes();
    
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
        } catch (error) {
            console.error("Failed to fetch fish:", error);
        }
    };

    const visibleFishes = fishes.filter(fish => !filteredFishes.includes(fish.id));

	if (!fishes) {
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
                    <Text>{"Données non disponibles"}</Text>
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
        {/* <TouchableOpacity style={[styles.quizzButton, {right: 80}]} onPress={() => {addFilteredFish([1, 3])}}>
            <FontAwesome name={filtered ? "close" : "filter"} size={20} color={theme.textBoldLight} />
        </TouchableOpacity> */}
            <TouchableOpacity style={styles.quizzButton} onPress={handleFilterButtonPress}>
                <FontAwesome name={filtered ? "close" : "filter"} size={20} color={theme.textBoldLight} />
            </TouchableOpacity>
			<ScrollView
				contentContainerStyle={{flexGrow: 1}}
				// refreshControl={
				// 	<RefreshControl
				// 		refreshing={refreshing}
				// 		onRefresh={onRefresh}
				// 		colors={['#2e86de']}
				// 		tintColor={'#2e86de'}
				// 		title={'Chargement des poissons...'}
				// 		titleColor={'#2e86de'}
				// 	/>
				// }
			>
				<View style={[styles.homePanel, {paddingTop: 60, paddingBottom: 40}]}>
                    <Text style={styles.h2}>Poissons</Text>
                    
                    {visibleFishes.length > 0 ? (
                    <FlatList
                        data={visibleFishes}
                        numColumns={2}
                        contentContainerStyle={{ gap: 26, paddingBottom: 28 }}
                        scrollEnabled={false}
                        keyExtractor={(item) => item.id.toString()}
                        columnWrapperStyle={{ gap: 6, width: 160, aspectRatio: 1 }}
                        renderItem={({ item }) => (
                        <FishCard
                            onPress={() => handleFishPress(item.id.toString())}
                            id={item.id.toString()}
                            fishName={item.name}
                            imgSource={item.additionalImages[0].url}
                            fishMinSize={item.minSizeCm}
                        />
                        )}
                    />
                    ) : (
                    <Text>Pas de données</Text>
                    )}
                    
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