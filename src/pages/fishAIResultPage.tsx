import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { useTheme } from '../components/organisms/ThemeContext.tsx';

const FishAIResultPage = () => {
	const styles = GlobalStyles();
    const { theme } = useTheme();

	return (

		<SafeAreaView style={styles.body}>
            <View style={[styles.homePanel, {paddingTop: 60, paddingBottom: 40}]}>
				<Text style={styles.h2}>Résultats</Text>
				<View style={{backgroundColor: 'red', top: 200, left: 10, width: 40, height: 40, position: 'absolute'}}></View>
			</View>
		</SafeAreaView>
	);
};

export default FishAIResultPage;
