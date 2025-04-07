// <<<<<<< HEAD:src/components/molecules/fishCard.tsx
// import React, { ReactNode } from 'react';
// import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
// =======
import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
// >>>>>>> origin/styling-home-page-pamallet:components/molecules/fishCard.tsx
import GlobalStyles from '../../themes/globalStyles.tsx';

interface FishCardProps {
	onPress?: () => void;
	fishName: string;
}

const FishCard = ({ onPress, fishName }: FishCardProps) => {
	return (
		<View style={GlobalStyles.fishCardContainer}>
		 	<TouchableOpacity onPress={onPress}>
				<Image
					source={{ uri: 'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg' }}
					style={GlobalStyles.backgroundImage}
					// resizeMode="contain"
				/>
				<Text style={GlobalStyles.fishCardName}>{fishName}</Text>
		 	</TouchableOpacity>
		</View>
	);
};

export default FishCard;