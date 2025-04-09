import React, { useState } from 'react';

import HomePanel from '../components/molecules/homePanel.tsx';
import FishCard from '../components/molecules/fishCard.tsx';
import { View, Text, SafeAreaView, Button } from 'react-native';
import LegislationCard from '../components/molecules/legislationCard.tsx';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import SearchBar from '../components/organisms/searchBar.tsx';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ route }: { route: any }) => {

	const navigation = useNavigation(); // Hook to access navigation

	// use with goToLegislationScreen('test') to search for 'test' in the legislation page
	const goToLegislationScreen = (text: string) => {
		navigation.navigate('Tabs', {
			screen: 'Législation',
			params: { searchText: text },
		  });
	};
  return (
	<SafeAreaView style={GlobalStyles.body}>
		<SearchBar/>
		<HomePanel>
			<Text style={GlobalStyles.h2}>Voir à nouveau</Text>
			<View style={GlobalStyles.fishCardsContainer}>
				<FishCard onPress={() => console.log('Card pressed')} fishName='Mérou brun' />
				<FishCard onPress={() => console.log('Card pressed')} fishName='Thon rouge' />
			</View>
			<LegislationCard
				title="Arrêté du 9 Juillet 2024"
				text="Réglementation particulière de la pêche maritime de loisir à l’intérieur du périmètre de la <h>Réserve Naturelle Marine...</h>"          
			/>
			<LegislationCard
				title="Arrêté du 22 Mars 2024"
				text="Réglementation particulière de la pêche maritime de loisir dans les eaux au droit de l’<h>île de Porquerolles</h>, de ses îlots..."          
			/>
			<LegislationCard
				title="Arrêté du 22 Mars 2024"
				text="Réglementation particulière de la pêche maritime de loisir dans les eaux au droit de l’<h>île de Porquerolles</h>, de ses îlots..."          
			/>
		</HomePanel>
	</SafeAreaView>
  );
};

export default HomeScreen;
