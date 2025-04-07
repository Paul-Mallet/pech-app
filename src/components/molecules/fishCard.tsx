import React, { ReactNode } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import GlobalStyles from '../../themes/globalStyles.tsx';

interface FishCardProps {
	onPress?: () => void;
	fishName: string;
}

const FishCard = ({ onPress, fishName }: FishCardProps) => {
	return (
		<View style={GlobalStyles.fishCard}>
			<TouchableOpacity onPress={onPress}>
				<Image
					source={{ uri: 'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg' }}
					style={GlobalStyles.miniImg}
					resizeMode="cover" // use 'contain' to get the full image, but it must have a 1:1 ratio
					/>
				<Text style={GlobalStyles.fishCardName}>{fishName}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default FishCard;