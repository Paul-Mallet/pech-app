import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Button, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LegislationCard from '../components/molecules/legislationCard.tsx';
import SearchBarLegislation from '../components/organisms/searchBarLegislation.tsx';
import LegislationSheet from '../components/organisms/legislationSheet.tsx';
import EventBus from '../components/organisms/EventBus.tsx';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useHistory } from '../components/organisms/HistoryContext.tsx';
import { useTheme } from '../components/organisms/ThemeContext.tsx';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import LegislationScreenStyles from '../styles/pages/legislationScreenStyles.tsx';

const LegislationScreen = ({ route }: { route: any }) => {
	const scrollViewRef = useRef<ScrollView>(null);
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const [searchText, setSearchText] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [pressedLegislation, setPressedLegislation] = useState<string | null>(null);
	const [legislationId, setLegislationId] = useState<string>("");
	const navigation = useNavigation();
	const { theme } = useTheme();
	const globalStyles = GlobalStyles();
	const styles = LegislationScreenStyles();
	const pressedLegislationRef = useRef(pressedLegislation);
	const { fetchLegislations, legislations } = useHistory();

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
	
	const filtered = legislations?.filter(legis => 
		legis.title.toLowerCase().includes(searchText.toLowerCase()) || 
		legis.article.toLowerCase().includes(searchText.toLowerCase())
	);
	
	const handleLegislationPress = (id: string) => {
		setLegislationId(id);
		setPressedLegislation(id.toString());
		bottomSheetRef.current?.expand();
	};
  
	if (!legislations.length) {
		return (
			<SafeAreaView style={globalStyles.body}>
				<SearchBarLegislation searchText={searchText} setSearchText={setSearchText} />
                <View style={{ marginTop: 100 }}>
                    <ActivityIndicator size="large" color={theme.textDark} />
                </View>
		    </SafeAreaView>
		);
	}
	if (error || !legislations) {
		return (
			<SafeAreaView style={globalStyles.body}>
				<SearchBarLegislation searchText={searchText} setSearchText={setSearchText} />
			<View style={{ marginTop: 100 }}>
                    <Text>Erreur</Text>
                    <Text>{"Données non disponibles"}</Text>
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
		<SafeAreaView style={globalStyles.body}>
			<SearchBarLegislation searchText={searchText} setSearchText={setSearchText} />
			<ScrollView ref={scrollViewRef} style={styles.scrollView}>
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