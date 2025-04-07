import React from 'react';
import { Text, View } from 'react-native';
import GlobalStyles from '../../themes/globalStyles.tsx';
import Colors from '../../themes/colors.tsx';

interface HomeTextCardProps {
    text: string;
    title: string;
}

const HomeTextCard = (props: HomeTextCardProps) => {
  const { text, title } = props;

  // Function to parse the text and apply styles to the <h> tags
  const getHighlightedText = (text: string) => {
    // Regular expression to find <h> and </h> tags
    const regex = /<h>(.*?)<\/h>/g;
    const parts = [];
    let lastIndex = 0;

    // Iterate through all matches of the <h> tag and split the string accordingly
    let match;
    while ((match = regex.exec(text)) !== null) {
      // Add the part of the text before the <h> tag
      if (match.index > lastIndex) {
        parts.push(<Text key={lastIndex}>{text.substring(lastIndex, match.index)}</Text>);
      }

      // Add the highlighted part inside <h> tag
      parts.push(
        <Text key={match.index} style={GlobalStyles.textHighlightDark}>
          {match[1]}
        </Text>
      );

      // Update the last index to the end of the current match
      lastIndex = regex.lastIndex;
    }

    // Add any remaining text after the last <h> tag
    if (lastIndex < text.length) {
      parts.push(<Text key={lastIndex}>{text.substring(lastIndex)}</Text>);
    }

    return parts;
  };

  return (
    <View>
      <Text style={GlobalStyles.titleDark}>{props.title}</Text>
      <Text style={GlobalStyles.textDark}>
        {getHighlightedText(text)}
      </Text>
    </View>
  );
};

export default HomeTextCard;
