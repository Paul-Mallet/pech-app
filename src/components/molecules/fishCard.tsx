import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useHistory } from '../organisms/HistoryContext.tsx';
import GlobalStyles from '../../styles/base/globalStyles.tsx';

interface FishCardProps {
	onPress?: () => void;
	fishName: string;
	imgSource: string;
	addHistory?: boolean;
}

const FishCard = ({ onPress, fishName, imgSource, addHistory = true }: FishCardProps) => {
	const styles = GlobalStyles();
	const { addToHistory } = useHistory();
	const hasImage = imgSource ? true : false;
	const handlePress = () => {
		if (addHistory)
			addToHistory({
				entryType: "Poissons",
				label: fishName,
				parameter: imgSource,
			})
		if (onPress) {
			onPress();
		}
	};

	return (
		<View style={styles.fishCardContainer}>
		 	<TouchableOpacity onPress={handlePress}>
				<Image
					source={hasImage ? { uri: imgSource } : require('../../../assets/DefaultFish.webp')}
					style={styles.backgroundImage}
				/>
				<Text numberOfLines={fishName?.length > 15 ? 2 : 1} adjustsFontSizeToFit style={styles.fishCardName}>{fishName}</Text>
		 	</TouchableOpacity>
		</View>
	);
};

export default FishCard;