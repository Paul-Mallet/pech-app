import GlobalStyles from '../../styles/base/globalStyles.tsx';
import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

interface FishCardProps {
	onPress?: () => void;
	fishName: string;
	imgSource: string;
}

const FishCard = ({ onPress, fishName, imgSource }: FishCardProps) => {
	const styles = GlobalStyles();
	return (
		<View style={styles.fishCardContainer}>
		 	<TouchableOpacity onPress={onPress}>
				<Image
					source={{ uri: imgSource }}
					style={styles.backgroundImage}
				/>
				<Text style={styles.fishCardName}>{fishName}</Text>
		 	</TouchableOpacity>
		</View>
	);
};

export default FishCard;