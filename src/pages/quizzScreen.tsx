import React from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { useNavigation } from '@react-navigation/native';

const QuizzScreen = ({ route }: { route: any }) => {

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
	<SafeAreaView style={GlobalStyles.body}>
		
	</SafeAreaView>
  );
};

export default QuizzScreen;
