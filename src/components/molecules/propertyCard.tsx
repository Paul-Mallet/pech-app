import GlobalStyles from '../../styles/base/globalStyles.tsx';
import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

interface PropertyCardProps {
	onPress?: () => void;
	propertyName: string;
	imgSource: string;
}

const PropertyCard = ({ onPress, propertyName: propertyName, imgSource }: PropertyCardProps) => {
	return (
		<View style={GlobalStyles.fishCardContainer}>
		 	<TouchableOpacity onPress={onPress}>
				<Image
					source={{ uri: imgSource }}
					style={GlobalStyles.backgroundImage}
				/>
				<Text style={[GlobalStyles.fishCardName, GlobalStyles.propertyCardName]}>{propertyName}</Text>
		 	</TouchableOpacity>
		</View>
	);
};

export default PropertyCard;