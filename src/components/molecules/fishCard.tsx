import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useHistory } from '../organisms/HistoryContext.tsx';
import GlobalStyles from '../../styles/base/globalStyles.tsx';

interface FishCardProps {
	onPress?: () => void;
	fishName: string;
	imgSource: string;
}

const FishCard = ({ onPress, fishName, imgSource }: FishCardProps) => {
	const styles = GlobalStyles();
	const { addToHistory } = useHistory();
	const handlePress = () => {
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
					source={{ uri: imgSource }}
					style={styles.backgroundImage}
				/>
				<Text style={styles.fishCardName}>{fishName}</Text>
		 	</TouchableOpacity>
		</View>
	);
};

export default FishCard;