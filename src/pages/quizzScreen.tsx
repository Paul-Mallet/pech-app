import React from 'react';
import { SafeAreaView } from 'react-native';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { useNavigation } from '@react-navigation/native';
import LegislationCard from '../components/molecules/legislationCard.tsx';

const QuizzScreen = ({ route }: { route: any }) => {
	const globalStyles = GlobalStyles();

	const navigation = useNavigation(); // Hook to access navigation

	// use with goToLegislationScreen('test') to search for 'test' in the legislation page
	const goToLegislationScreen = (text: string) => {
		navigation.navigate('Tabs', {
			screen: 'Législation',
			params: { searchText: text },
		  });
	};
  return (
	// content here
	<SafeAreaView style={globalStyles.body}>
		<LegislationCard
			title="Ceci est la quizz page"
			text="quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page "         
		/>
		<LegislationCard
			title="Ceci est la quizz page"
			text="quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page "         
		/>
		<LegislationCard
			title="Ceci est la quizz page"
			text="quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page quizz page "         
		/>
	</SafeAreaView>
  );
};

export default QuizzScreen;
