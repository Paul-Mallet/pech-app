import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SearchBarLegislation from '../components/organisms/searchBarLegislation.tsx';
import LegislationPanel from '../components/molecules/legislationPanel.tsx';
import LegislationCard from '../components/molecules/legislationCard.tsx';
import LegislationSheet from '../components/organisms/legislationSheet.tsx';
import type BottomSheet from '@gorhom/bottom-sheet';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { getAllLegislations } from '../services/fish.service.tsx';
import { useTheme } from '../components/organisms/ThemeContext.tsx';

interface Legislation {
    id: string;
    title: string;
    date: string;
    article: string;
    metadata: {
		reference: string,
		lastUpdated: string
	};
	geojson: string;
}

const LegislationScreen = ({ route }: { route: any }) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [searchText, setSearchText] = useState('');
	const [legislations, setLegislations] = useState<Legislation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
	const [pressedLegislation, setPressedLegislation] = useState<string | null>(null);
	const [legislationId, setLegislationId] = useState<string | null>(null);
	const navigation = useNavigation();
	const styles = GlobalStyles();
    const { theme } = useTheme();

	// const handleSearch = (text: string) => {
	//   setSearchText(text);
	// };

	useEffect(() => {
		if (pressedLegislation && bottomSheetRef.current) {
			bottomSheetRef.current.expand();
		}
	}, [pressedLegislation]);

	const handleLegislationPress = (id: string) => {
		setPressedLegislation(id);
	};

	useFocusEffect(
		React.useCallback(() => {
			if (route.params?.searchText) {
				setSearchText(route.params.searchText);
			}
			navigation.setParams({ searchText: undefined });
		}, [route.params?.searchText])
	);

	const fetchLegislations = async () => {
		setLoading(true);
		try {
			const legislations = await getAllLegislations();
			// console.log("Legislations: ", legislations);
			setLegislations(legislations);
		} catch (err) {
			setError("Impossible de charger les infos de la legislation.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchLegislations();
	}, []);

	const filtered = legislations
    ?.filter(legis => 
        legis.title.toLowerCase().includes(searchText.toLowerCase()) || 
        legis.article.toLowerCase().includes(searchText.toLowerCase())
    )
    .map(legis => (
        <LegislationCard
            key={legis.id}
            title={legis.title}
            text={legis.article}
            searchText={searchText}
            onPress={() => handleLegislationPress(legis.id)}
        />
    ));

	// const addParagraph = (title: string, text: string) => {
	// 	const newKey = String(allParagraphs.length + 1);
	// 	const newParagraph = (
	// 		<ParagraphLegislationCard
	// 			key={newKey}
	// 			title={title}
	// 			text={text}
	// 			searchText={searchText}
	// 		/>
	// 	);
	// 	setAllParagraphs(prev => [...prev, newParagraph]);
	// };
  
	if (loading) {
		return (
			<SafeAreaView style={styles.body}>
				<SearchBarLegislation searchText={searchText} setSearchText={setSearchText} />
                <View style={{ marginTop: 110 }}>
                    <ActivityIndicator size="large" color={theme.textDark} />
                </View>
		    </SafeAreaView>
		);
	}
	if (error || !legislations) {
		return (
			<SafeAreaView style={styles.body}>
				<SearchBarLegislation searchText={searchText} setSearchText={setSearchText} />
			<View style={{ marginTop: 110 }}>
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
			<LegislationPanel>
				{filtered}
			</LegislationPanel>
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
