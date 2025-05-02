import React, { useEffect, useState, useMemo } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useHistory } from '../organisms/HistoryContext.tsx';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { API_BASE_URL } from '../../services/fish.service.tsx';

interface FishCardProps {
	onPress?: () => void;
	fishName: string;
	imgSource: string;
	id: string;
	addHistory?: boolean;
}

const FishCard = React.memo(({ onPress, fishName, imgSource, id, addHistory = true }: FishCardProps) => {
	const styles = GlobalStyles();
	const { addToHistory } = useHistory();

	const uri = useMemo(() => {
		if (!imgSource) return null;
		if (imgSource.includes('http')) return imgSource;
		return API_BASE_URL + imgSource;
	}, [imgSource]);

	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	// Reset load/error state when URI changes
	useEffect(() => {
		setLoaded(false);
		setError(false);
	}, [uri]);

	const handlePress = () => {
		if (addHistory) {
			addToHistory({
				entryType: 'Poissons',
				label: fishName,
				id: id,
				parameter: imgSource,
			});
		}
		onPress?.();
	};

	return (
		<View style={styles.fishCardContainer}>
			<TouchableOpacity onPress={handlePress}>
			<Image
				source={
					error || !uri
					? require('../../../assets/DefaultFish.webp')
					: { uri }
				}
				onLoad={() => setLoaded(true)}
				onError={() => setError(true)}
				style={styles.backgroundImage}
			/>
			</TouchableOpacity>
			<View pointerEvents="none">
				<Text numberOfLines={fishName?.length > 15 ? 2 : 1} adjustsFontSizeToFit style={styles.fishCardName}>
					{fishName}
				</Text>
			</View>
		</View>
	);
});

export default FishCard;
