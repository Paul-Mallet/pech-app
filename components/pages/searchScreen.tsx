import React from 'react';
import { View, Text, Button } from 'react-native';

const SearchScreen = ({navigation}: {navigation: any}) => {
	return (
		<View>
			<Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
		</View>
	);
};

export default SearchScreen;
