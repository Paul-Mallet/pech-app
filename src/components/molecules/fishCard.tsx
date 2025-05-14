import React, { useState, useMemo, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useHistory } from '../organisms/HistoryContext.tsx';
import { useTheme } from '../organisms/ThemeContext.tsx';
import FishCardStyles from '../../styles/molecules/fishCardStyles.tsx';
import { API_BASE_URL } from '../../services/fish.service.tsx';

interface FishCardProps {
	onPress?: () => void;
	fishName: string;
	fishMinSize?: string | null;
	imgSource: string | null;
	id: string;
	addHistory?: boolean;
	probability?: number | null;
}

const FishCard = React.memo(({ onPress, fishName, fishMinSize, imgSource, id, addHistory = true, probability }: FishCardProps) => {
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

			{probability && 
			<View style={{
				top: 40, 
				backgroundColor: '#00000020', 
				width: '100%', 
				height: 60, 
				borderRadius: 12}}>
				<Text style={{textAlign: 'center', 
			top: 2, 
			zIndex: 1,
			fontSize: 10,
			fontFamily: font.bold,
			color: theme.textBoldLight,
			textShadowColor: 'black',
			textShadowOffset: { width: 0.8, height: 0.8 },
			textShadowRadius: 4,
			pointerEvents: 'none'}}>Probabilite : {probability}%</Text>
			</View>}
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
			<View style={{
				bottom: 40, 
				backgroundColor: '#00000020', 
				width: '100%', 
				height: 60, 
				borderRadius: 12}}>
				<Text style={{textAlign: 'center', 
			bottom: -40, 
			zIndex: 1,
			fontSize: 10,
			fontFamily: font.bold,
			color: theme.textBoldLight,
			textShadowColor: 'black',
			textShadowOffset: { width: 0.8, height: 0.8 },
			textShadowRadius: 4,
			pointerEvents: 'none'}}>Taille min. : {fishMinSize}</Text>
			</View>}
		</View>
	);
});

export default FishCard;
