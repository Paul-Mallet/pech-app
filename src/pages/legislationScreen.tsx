import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Button, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SearchBarLegislation from '../components/organisms/searchBarLegislation.tsx';
import LegislationSheet from '../components/organisms/legislationSheet.tsx';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { getAllLegislations, getLegislationById } from '../services/fish.service.tsx';
import { useTheme } from '../components/organisms/ThemeContext.tsx';
import LegislationCard from '../components/molecules/legislationCard.tsx';
import LegislationStyles from '../styles/pages/LegislationStyles.tsx';

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
	const [legislationId, setLegislationId] = useState<string>("");
	const navigation = useNavigation();
	const styles = GlobalStyles();
	const legislationStyles = LegislationStyles();
    const { theme } = useTheme();

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
		legis.content.toLowerCase().includes(searchText.toLowerCase())
	);
	
	const handleLegislationPress = (id: string) => {
		setLegislationId(id);
		bottomSheetRef.current?.expand();
	};
  
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
			<ScrollView style={legislationStyles.legislationPanel}>
				{filtered.map(legis => (
					<LegislationCard
						key={legis.id}
						title={legis.title}
						text={legis.content}
						searchText={searchText}
						onPress={() => handleLegislationPress(legis.id)}
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
