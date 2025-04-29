import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useHistory } from '../organisms/HistoryContext.tsx';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { API_BASE_URL } from '../../services/fish.service.tsx';

interface FishCardProps {
	onPress?: () => void;
	fishName: string;
	imgSource: string;
	addHistory?: boolean;
}

const FishCard = ({ onPress, fishName, imgSource, addHistory = true }: FishCardProps) => {
	const styles = GlobalStyles();
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
	const { addToHistory } = useHistory();
	const getImageUrl = (imgSource: string) =>
	{
		console.log("Image: " + imgSource);
		if (imgSource.includes("http"))
			return imgSource;
		if (imgSource)
			return API_BASE_URL + imgSource;
	}
	const uri = imgSource ? getImageUrl(imgSource) : null;
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

	// useEffect(() => 
	// {
	// 	console.log("Loaded: " + loaded);
	// }, [loaded])

	// useEffect(() => 
	// {
	// 	console.log("Error: " + error);
	// }, [error])

	return (
		<View style={styles.fishCardContainer}>
		 	<TouchableOpacity onPress={handlePress}>
				{(!loaded || error) && (
					<Image
						source={require('../../../assets/DefaultFish.webp')}
						style={styles.backgroundImage}
					/>
				)}
				{uri && !error && (
					<Image
						source={{ uri }}
						onLoad={() => setLoaded(true)}
						onError={() => setError(true)}
						style={styles.backgroundImage}
					/>
				)}
				<Text numberOfLines={fishName?.length > 15 ? 2 : 1} adjustsFontSizeToFit style={styles.fishCardName}>{fishName}</Text>
		 	</TouchableOpacity>
		</View>
	);
};

export default FishCard;