import React, { useState, useMemo, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useHistory } from '../organisms/HistoryContext.tsx';
import { FontAwesome6 } from '@expo/vector-icons';
import { useTheme } from '../organisms/ThemeContext.tsx';
import FishCardStyles from '../../styles/molecules/fishCardStyles.tsx';
import { API_BASE_URL } from '../../services/fish.service.tsx';

interface FishCardProps {
	onPress?: () => void;
	fishName: string;
	fishMinSize: string;
	imgSource: string;
	id: string;
	addHistory?: boolean;
}

const FishCard = React.memo(({ onPress, fishName, fishMinSize, imgSource, id, addHistory = true }: FishCardProps) => {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
	const { addToHistory } = useHistory();
	const { theme } = useTheme();
	const styles = FishCardStyles();

	const uri = useMemo(() => {
		if (!imgSource) return null;
		if (imgSource.includes('http')) return imgSource;
		return API_BASE_URL + imgSource;
	}, [imgSource]);

	useEffect(() => {
		setLoaded(false);
		setError(false);
	}, [uri]);

	const getImageUrl = (imgSource: string) =>
	{
		if (imgSource.includes("http"))
			return imgSource;
		if (imgSource)
			return API_BASE_URL + imgSource;
	}

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
		<View style={styles.cardContainer}>
			<TouchableOpacity onPress={handlePress}>
				<View style={styles.minSizeContainer}>
					<FontAwesome6 name="ruler" size={20} color={theme.textDark} />
					<Text style={styles.hSize}>{fishMinSize}cm</Text>
				</View>
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
				<Text numberOfLines={fishName?.length > 15 ? 2 : 1} adjustsFontSizeToFit style={styles.cardName}>
					{fishName}
				</Text>
			</View>
		</View>
	);
});

export default FishCard;
