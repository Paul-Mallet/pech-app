import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Button, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SearchBarLegislation from '../components/organisms/searchBarLegislation.tsx';
import LegislationSheet from '../components/organisms/legislationSheet.tsx';
import LegislationCard from '../components/molecules/legislationCard.tsx';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { useTheme } from '../components/organisms/ThemeContext.tsx';
import LegislationStyles from '../styles/pages/LegislationStyles.tsx';
import { getAllLegislations } from '../services/fish.service.tsx';
import EventBus from '../components/organisms/EventBus.tsx';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export interface Legislation {
    id: number;
    title: string;
    article: string;
    date: string;
    link: string;
    places: {
		id: number;
		name: string;
		geojson?: {
			type: string;
			features: {
				type: string;
				properties: {
					nom: string;
					code: string;
					codeDepartement: string;
					siren: string;
					codeEpci: string;
					codeRegion: string;
					codesPostaux: string[];
					population: number;
				},
				geometry: {
					type: string;
					coordinates:[number, number][][][];
				}
			}[];
		}
	}[];
	fishingTypes: {
		id: number,
		name: string
	}[];
	fish: [];
}

const LegislationScreen = ({ route }: { route: any }) => {
	const scrollViewRef = useRef<ScrollView>(null);
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const [searchText, setSearchText] = useState('');
	const [legislations, setLegislations] = useState<Legislation[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [pressedLegislation, setPressedLegislation] = useState<string | null>(null);
	const [legislationId, setLegislationId] = useState<string>("");
	const navigation = useNavigation();
	const styles = GlobalStyles();
	const legislationStyles = LegislationStyles();
	const { theme } = useTheme();
	const pressedLegislationRef = useRef(pressedLegislation);

	useEffect(() => {
		pressedLegislationRef.current = pressedLegislation;
	  }, [pressedLegislation]);

	useEffect(() => {
		const handler = () => {
			if (pressedLegislationRef.current)
				setPressedLegislation(null);
			else
				scrollToTop();
		};
		EventBus.on('legislationTabPress', handler);
		return () => {
		  EventBus.off('legislationTabPress', handler);
		};
	  }, []);

	useFocusEffect(
		React.useCallback(() => {
			if (route.params?.searchText) {
				setSearchText(route.params.searchText);
			}
			navigation.setParams({ searchText: undefined });
		}, [route.params?.searchText])
	);

	const scrollToTop = () => {
		if (scrollViewRef.current) {
		  scrollViewRef.current.scrollTo({ y: 0, animated: true });
		}
	  };
	
	const fetchLegislations = async () => {
		setLoading(true);
		try {
			const legislations = await getAllLegislations();
			// console.log("\x1b[36mLegislations:\x1b[0m ", JSON.stringify(legislations));
			setLegislations(legislations);
		} catch (err) {
			setError("Impossible de charger les infos des legislations.");
		} finally {
			setLoading(false);
		}
	};
	
	useEffect(() => {
		fetchLegislations();
	}, []);
	
	const filtered = legislations?.filter(legis => 
		legis.title.toLowerCase().includes(searchText.toLowerCase()) || 
		legis.article.toLowerCase().includes(searchText.toLowerCase())
	);
	
	const handleLegislationPress = (id: string) => {
		setLegislationId(id);
		setPressedLegislation(id.toString());
		bottomSheetRef.current?.expand();
	};
  
	if (loading) {
		return (
			<SafeAreaView style={styles.body}>
				<SearchBarLegislation searchText={searchText} setSearchText={setSearchText} />
                <View style={{ marginTop: 100 }}>
                    <ActivityIndicator size="large" color={theme.textDark} />
                </View>
		    </SafeAreaView>
		);
	}
	if (error || !legislations) {
		return (
			<SafeAreaView style={styles.body}>
				<SearchBarLegislation searchText={searchText} setSearchText={setSearchText} />
			<View style={{ marginTop: 100 }}>
                    <Text>Erreur</Text>
                    <Text>{error || "Données non disponibles"}</Text>
                    <Button
                        title="Réessayer"
                        onPress={fetchLegislations}
                        color={theme.textDark}
                    />
                </View>
		    </SafeAreaView>
		);
	};
	return (
		<SafeAreaView style={styles.body}>
			<SearchBarLegislation searchText={searchText} setSearchText={setSearchText} />
			<ScrollView ref={scrollViewRef} style={legislationStyles.legislationPanel}>
				{filtered.map(legis => (
					<LegislationCard
						key={legis.id}
						title={legis.title}
						text={legis.article}
						searchText={searchText}
						onPress={() => handleLegislationPress(legis.id.toString())}
					/>
				))}
			</ScrollView>
			{pressedLegislation && (
				<LegislationSheet
					ref={bottomSheetRef}
					legislationId={legislationId}
					onClose={() => setPressedLegislation(null)}
				/>
			)}
		</SafeAreaView>
	);
};

export default LegislationScreen;
