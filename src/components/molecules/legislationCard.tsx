import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { useTheme } from '../organisms/ThemeContext.tsx';

interface LegislationCardProps {
	title: string;
	text: string;
	searchText?: string;
	onPress?: () => void;
}

const LegislationCard: React.FC<LegislationCardProps> = ({ title, text, searchText, onPress }) => {
	const styles = GlobalStyles();
	const { theme } = useTheme();

	const highlightSearchMatches = (text: string, query: string) => {
		if (!query)
			return [<Text key="0">{text}</Text>];
		const regex = new RegExp(`(${query})`, 'gi');
		const parts = text.split(regex);
		return parts.map((part, i) => (
		  part.toLowerCase() === query.toLowerCase() ? (
				<Text key={i} style={styles.textHighlightSearch}>{part}</Text>
			) : (
				<Text key={i}>{part}</Text>
			)
		));
	};

	// const getHighlightedText = (text: string) => {
	// 	const regex = /<h>(.*?)<\/h>/g;
	// 	const parts = [];
	// 	let lastIndex = 0;
	// 	let match;

	// 	while ((match = regex.exec(text)) !== null)
	// 	{
	// 		if (match.index > lastIndex) {
	// 			parts.push(<Text key={lastIndex}>{text.substring(lastIndex, match.index)}</Text>);
	// 		};
	// 		parts.push(
	// 			<Text key={match.index} style={styles.textHighlightDark}>
	// 				{match[1]}
	// 			</Text>
	// 		);
	// 		lastIndex = regex.lastIndex;
	// 	}
	// 	if (lastIndex < text.length) {
	// 		parts.push(<Text key={lastIndex}>{text.substring(lastIndex)}</Text>);
	// 	}
	// 	return parts;
	// };

	return (
		<TouchableOpacity onPress={onPress} style={styles.legislationCard}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={{ flex: 1 }}>
					<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
						<Text numberOfLines={2} ellipsizeMode="tail" style={[styles.titleDark, { width: '90%' }]}>
							{searchText ? highlightSearchMatches(title, searchText) : title}
						</Text>
						<Ionicons name="book" size={24} color={theme.textHighlightDark} style={{ position: 'absolute', top: -4, right: 0 }} />
					</View>
					<Text
						numberOfLines={5}
						ellipsizeMode="tail"
						style={styles.textDark}
					>
						{searchText ? highlightSearchMatches(text, searchText) : text}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default LegislationCard;
