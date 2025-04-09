import React, { useState } from 'react';

import HomePanel from '../components/molecules/homePanel.tsx';
import FishCard from '../components/molecules/fishCard.tsx';
import { View, Text, SafeAreaView, Button } from 'react-native';
import LegislationCard from '../components/molecules/legislationCard.tsx';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import SearchBar from '../components/organisms/searchBar.tsx';
import { useNavigation } from '@react-navigation/native';

const QuizzScreen = ({ route }: { route: any }) => {

	const navigation = useNavigation(); // Hook to access navigation

	// use with goToLegislationScreen('test') to search for 'test' in the legislation page
	const goToLegislationScreen = (text: string) => {
		navigation.navigate('Législation', { searchText: text });
	};
  return (
	// content here
	<SafeAreaView style={GlobalStyles.body}>

	</SafeAreaView>
  );
};

export default QuizzScreen;
