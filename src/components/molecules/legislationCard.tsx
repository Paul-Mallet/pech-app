import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { useTheme } from '../organisms/ThemeContext.tsx';

interface LegislationCardProps {
	text: string;
	title: string;
	onPress?: () => void;
}

const LegislationCard = (props: LegislationCardProps) => {
	const styles = GlobalStyles();
	const { theme } = useTheme();
	const { text } = props;
	const getHighlightedText = (text: string) => {
		const regex = /<h>(.*?)<\/h>/g;
		const parts = [];
		let lastIndex = 0;
		let match;

		while ((match = regex.exec(text)) !== null)
		{
			if (match.index > lastIndex) {
				parts.push(<Text key={lastIndex}>{text.substring(lastIndex, match.index)}</Text>);
			};
			parts.push(
				<Text key={match.index} style={styles.textHighlightDark}>
					{match[1]}
				</Text>
			);
			lastIndex = regex.lastIndex;
		}
		if (lastIndex < text.length) {
			parts.push(<Text key={lastIndex}>{text.substring(lastIndex)}</Text>);
		}
		return parts;
	};

	return (
		<TouchableOpacity onPress={props.onPress} style={styles.legislationCard}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={{ flex: 1 }}>
					<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
						<Text numberOfLines={2} ellipsizeMode="tail" style={[styles.titleDark, { width: '90%' }]}>
							{props.title}
						</Text>
						<Ionicons name="book" size={24} color={theme.textHighlightDark} style={{ position: 'absolute', top: -4, right: 0 }} />
					</View>
					<Text
						numberOfLines={5}
						ellipsizeMode="tail"
						style={styles.textDark}
					>
						{getHighlightedText(text)}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default LegislationCard;
