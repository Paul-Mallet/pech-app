import GlobalStyles from '../../styles/base/globalStyles.tsx';
import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

interface PropertyCardProps {
	onPress?: () => void;
	propertyName: string;
	imgSource: string;
}

const PropertyCard = ({ onPress, propertyName: propertyName, imgSource }: PropertyCardProps) => {
	const styles = GlobalStyles();
	return (
		<View style={styles.fishCardContainer}>
		 	<TouchableOpacity onPress={onPress}>
				<Image
					source={{ uri: imgSource }}
					style={styles.backgroundImage}
				/>
				<Text style={[styles.fishCardName, styles.propertyCardName]}>{propertyName}</Text>
		 	</TouchableOpacity>
		</View>
	);
};

export default PropertyCard;