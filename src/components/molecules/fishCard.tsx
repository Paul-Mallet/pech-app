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
	fishMinSize?: string;
	imgSource: string;
	id: string;
	addHistory?: boolean;
}

const FishCard = React.memo(({ onPress, fishName, fishMinSize, imgSource, id, addHistory = true }: FishCardProps) => {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
	const { addToHistory } = useHistory();
	const { theme, font } = useTheme();
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

	// const getImageUrl = (imgSource: string) =>
	// {
	// 	if (imgSource.includes("http"))
	// 		return imgSource;
	// 	if (imgSource)
	// 		return API_BASE_URL + imgSource;
	// }

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
		<View style={{position: 'relative', height: 'auto'}}>
			<View style={styles.cardContainer}>
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
					<Text numberOfLines={fishName?.length > 15 ? 2 : 1} adjustsFontSizeToFit style={styles.cardName}>
						{fishName}
					</Text>
				</View>
			</View>
			{fishMinSize && 
			<View style={{position: 'absolute', bottom: -20, backgroundColor: '#00000010', width: '100%', height: 60, borderRadius: 12,}}>
				<Text style={{textAlign: 'center', bottom: -40, zIndex: 1,
			fontSize: 10,
			fontFamily: font.bold,
			color: theme.textBoldLight,
			textShadowColor: 'black',
			textShadowOffset: { width: 1, height: 1 },
			textShadowRadius: 6,
			pointerEvents: 'none'}}>{fishMinSize}Taille minimale : 144cm</Text>
			</View>}
		</View>
	);
});

export default FishCard;
