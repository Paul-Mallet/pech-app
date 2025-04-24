import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Text, Button } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SearchBarLegislation from '../components/organisms/searchBarLegislation.tsx';
import LegislationPanel from '../components/molecules/legislationPanel.tsx';
import LegislationCard from '../components/molecules/legislationCard.tsx';
import LegislationSheet from '../components/organisms/legislationSheet.tsx';
import type BottomSheet from '@gorhom/bottom-sheet';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { getAllLegislations } from '../services/fish.service.tsx';

interface Legislation {
    id: string;
    title: string;
    date: string;
    content: string;
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

	// const handleSearch = (text: string) => {
	//   setSearchText(text);
	// };

	const handleLegislationPress = (id: string) => {
		setLegislationId(id);
		bottomSheetRef.current?.expand();
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

	const filtered = legislations?.filter(legis => 
		legis.title.toLowerCase().includes(searchText.toLowerCase()) || 
		legis.content.toLowerCase().includes(searchText.toLowerCase())
	)
	.map(legis => React.cloneElement(legis, { searchText }));

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
  
	// Filter the children by inspecting props

	if (loading) {
		return (
			<SafeAreaView style={styles.body}>
                <TouchableOpacity style={styles.quizzButton} onPress={handleFilterButtonPress}>
                    <FontAwesome name={filtered ? "close" : "filter"} size={20} color={theme.textBoldLight} />
                </TouchableOpacity>
                <View>
                    <ActivityIndicator size="large" color={theme.textDark} />
                    <Text style={styles.h2}>Chargement...</Text>
                </View>
		    </SafeAreaView>
		);
	}
	if (error || !legislations) {
		return (
			<SafeAreaView style={styles.body}>
				<SearchBarLegislation searchText={searchText} setSearchText={setSearchText} />
                <View>
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
