import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { FlatList, SafeAreaView, Text, View, ScrollView, TouchableOpacity, Button, BackHandler } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
    // const [refreshing, setRefreshing] = useState<boolean>(false);
    const navigation = useNavigation();
	const styles = GlobalStyles();
    const { theme } = useTheme();
    const { fetchFishes, fishes, probaFishes, setProbabilityFishes } = useHistory();
    const {filteredFishes, addFilteredFish} = useFilteredFishes();
    
    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            if (probaFishes.length !== 0) {
                setProbabilityFishes([]);
              return true;
            }
            return false;
          };
      
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
          return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [probaFishes])
    );

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

    const handleCameraButtonPress = () => {
        if (!filtered)
            navigation.navigate('FishAICamera');
        else
            setFiltered(false);
    };

    // const onRefresh = () => {
    //     setRefreshing(true);
    // };

    const handleFishPress = async (fishId: string) => {
        // try {
        //     const fish = await getFishById(fishId);
        //     if (fish)
        //         setPressedFish(fish);
        // } catch (error) {
        //     console.error("Failed to fetch fish:", error);
        // }
        setPressedFish(fishes[parseInt(fishId)]);
    };

    const visibleFishes = useMemo(() => {
        if (probaFishes.length !== 0) {
            return probaFishes.filter(fish => {
                const matchingFish = fishes.find(f => f.faoCode === fish.faoCode);
                return matchingFish ? !filteredFishes.includes(matchingFish.id) : true;
            });
        } else {
            return fishes.filter(fish => !filteredFishes.includes(fish.id));
        }
    }, [fishes, filteredFishes, probaFishes]);

	if (!fishes) {
		return (
			<SafeAreaView style={styles.body}>
                <View>
                    <Text style={styles.h2}>Poissons</Text>
                    <View style={{zIndex: 10, backgroundColor: 'red', height: 100, position: 'absolute', top: 60, right: 20}}>
                        <TouchableOpacity style={styles.quizzButton} onPress={handleFilterButtonPress}>
                            <FontAwesome name={filtered ? "close" : "filter"} size={20} color={theme.textBoldLight} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.quizzButton} onPress={handleFilterButtonPress}>
                            <FontAwesome name={filtered ? "close" : "filter"} size={20} color={theme.textBoldLight} />
                        </TouchableOpacity>
                    </View>
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
            <View style={{zIndex: 10, position: 'absolute', top: 60, right: 20, flexDirection: 'row', gap: 6}}>
                <TouchableOpacity style={styles.quizzButton} onPress={handleFilterButtonPress}>
                    <FontAwesome name={filtered ? "close" : "filter"} size={20} color={theme.textBoldLight} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.quizzButton} onPress={handleCameraButtonPress}>
                    <FontAwesome name={"camera"} size={20} color={theme.textBoldLight} />
                </TouchableOpacity>
            </View>
            <View style={[styles.homePanel, {paddingTop: 60, paddingBottom: 40}]}>
                <Text style={styles.h2}>{probaFishes.length !== 0 ? 'Résultats' : 'Poissons'}</Text>
                
                {visibleFishes.length > 0 ? (
                <FlatList
                    data={visibleFishes}
                    numColumns={2}
                    contentContainerStyle={{ gap: probaFishes.length !== 0 ? 46 : 26, paddingBottom: probaFishes.length !== 0 ? 90 : 38 }}
                    scrollEnabled={true}
                    keyExtractor={(item) => item.id.toString()}
                    columnWrapperStyle={{ gap: 6, width: 160, aspectRatio: 1 }}
                    renderItem={({ item }) => (
                    <FishCard
                        onPress={() => handleFishPress(item.id.toString())}
                        id={item.id.toString()}
                        fishName={item.name}
                        imgSource={item.img ? item.img : null}
                        fishMinSize={item.minSizeCm}
                        probability={probaFishes.length !== 0 ? item.probability : null}
                    />
                    )}
                />
                ) : (
                <Text style={styles.textDark}>Pas de données</Text>
                )}
                
            </View>
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