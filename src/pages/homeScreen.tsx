import React from 'react';

// <<<<<<< HEAD:src/pages/homeScreen.tsx
// import { View, Text, Button } from 'react-native';
// import MyButton from '../components/atoms/button.tsx';
import HomeCard from '../components/molecules/homeCard.tsx';
// import HomeTextCard from '../components/molecules/homeTextCard.tsx';
// import MiniFishPicture from '../components/atoms/miniFishPicture.tsx';
import FishCard from '../components/molecules/fishCard.tsx';
// =======
import { View, Text, SafeAreaView } from 'react-native';
// import HomeCard from '../molecules/homeCard.tsx';
// import FishCard from '../molecules/fishCard.tsx';
import LegislationCard from '../components/molecules/legislationCard.tsx';
import GlobalStyles from '../themes/globalStyles.tsx';
// >>>>>>> origin/styling-home-page-pamallet:components/pages/homeScreen.tsx

const HomeScreen = ({navigation}: {navigation: any}) => {
  return (
	<SafeAreaView style={GlobalStyles.body}>
		<HomeCard onPress={() => console.log('Card pressed')}>
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
		</HomeCard>
	</SafeAreaView>
  );
};

export default HomeScreen;
