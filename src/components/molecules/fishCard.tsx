import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';

interface FishCardProps {
	onPress?: () => void;
	fishName: string;
	imgSource: string;
}

const FishCard = ({ onPress, fishName, imgSource }: FishCardProps) => {
	const styles = GlobalStyles();
	const handlePress = () => {
		console.log(`Fish pressed: ${fishName}`);
		if (onPress) {
			onPress();
		}
	};

	return (
		<View style={styles.fishCardContainer}>
		 	<TouchableOpacity onPress={handlePress}>
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