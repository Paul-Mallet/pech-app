import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../organisms/ThemeContext.tsx';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import LegislationCardStyles from '../../styles/molecules/legislationCardStyles.tsx';

interface LegislationCardProps {
	title: string;
	text: string;
	searchText?: string;
	onPress?: () => void;
}

const LegislationCard: React.FC<LegislationCardProps> = ({ title, text, searchText, onPress }) => {
	const { theme } = useTheme();
	const globalStyles = GlobalStyles();
	const styles = LegislationCardStyles();

	const highlightSearchMatches = (text: string, query: string) => {
		if (!query)
			return [<Text key="0">{text}</Text>];
		const regex = new RegExp(`(${query})`, 'gi');
		const parts = text.split(regex);
		return parts.map((part, i) => (
		  part.toLowerCase() === query.toLowerCase() ? (
				<Text key={i} style={globalStyles.textHighlightSearch}>{part}</Text>
			) : (
				<Text key={i}>{part}</Text>
			)
		));
	};

	return (
		<TouchableOpacity onPress={onPress} style={styles.cardContainer}>
			<View style={styles.titleContainer}>
				<Text
					numberOfLines={2}
					ellipsizeMode="tail"
					style={styles.title}
				>
					{searchText ? highlightSearchMatches(title, searchText) : title}
				</Text>
				<Ionicons
					name="book"
					size={24}
					color={theme.textHighlightDark}
					style={styles.icon}
				/>
			</View>
			<Text
				numberOfLines={5}
				ellipsizeMode="tail"
				style={styles.text}
			>
				{searchText ? highlightSearchMatches(text, searchText) : text}
			</Text>
		</TouchableOpacity>
	);
};

export default LegislationCard;
