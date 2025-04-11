import GlobalStyles from '../../styles/base/globalStyles.tsx';
import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

interface FishCardProps {
	onPress?: () => void;
	fishName: string;
}

const FishCard = ({ onPress, fishName }: FishCardProps) => {
	const styles = GlobalStyles();
	return (
		<View style={styles.fishCardContainer}>
		 	<TouchableOpacity onPress={onPress}>
				<Image
					source={{ uri: 'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg' }}
					style={styles.backgroundImage}
				/>
				<Text style={styles.fishCardName}>{fishName}</Text>
		 	</TouchableOpacity>
		</View>
	);
};

export default FishCard;