import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';

interface HomeTextCardProps {
	text: string;
	title: string;
	onPress?: () => void;
}

const LegislationCard = (props: HomeTextCardProps) => {
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
				<Text key={match.index} style={GlobalStyles.textHighlightDark}>
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
		<TouchableOpacity onPress={props.onPress} style={GlobalStyles.legislationCard}>
			<Text style={GlobalStyles.titleDark}>
				{props.title}
			</Text>
			<Text style={GlobalStyles.textDark}>
				{getHighlightedText(text)}
			</Text>
		</TouchableOpacity>
	);
};

export default LegislationCard;
