import React from 'react';
import { Text, View } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import LegislationStyles from '../../styles/pages/LegislationStyles.tsx';

interface ParagraphLegislationCardProps {
  text: string;
  title: string;
  searchText?: string;
}

const ParagraphLegislationCard = ({ text, title, searchText }: ParagraphLegislationCardProps) => {
	const styles = GlobalStyles();

  const highlightSearchMatches = (text: string, query: string) => {
    if (!query) return [<Text key="0">{text}</Text>];

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

  return (
    <View style={LegislationStyles.legislationParagraph}>
      <Text style={styles.titleDark}>
        {searchText ? highlightSearchMatches(title, searchText) : title}
      </Text>
      <Text style={styles.textDark}>
        {searchText ? highlightSearchMatches(text, searchText) : text}
      </Text>
    </View>
  );
};

export default ParagraphLegislationCard;
