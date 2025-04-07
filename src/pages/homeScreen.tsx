import React from 'react';

import HomePanel from '../components/molecules/homePanel.tsx';
import FishCard from '../components/molecules/fishCard.tsx';
import { View, Text, SafeAreaView } from 'react-native';
import LegislationCard from '../components/molecules/legislationCard.tsx';
import GlobalStyles from '../themes/globalStyles.tsx';
import SearchBar from '../components/organisms/searchBar.tsx';

const HomeScreen = ({navigation}: {navigation: any}) => {
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
