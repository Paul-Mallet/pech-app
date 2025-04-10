import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import PropertyCard from './propertyCard.tsx';

interface QuizzItemSelectionPanelProps {
    elementsData: Record<string, string>; // Dictionary of fish name (key) and image URL (value)
    questionType: string;
}

const QuizzItemSelectionPanel: React.FC<QuizzItemSelectionPanelProps> = ({ elementsData, questionType }) => {

    return (
        <View style={styles.container}>
            <Text style={GlobalStyles.titleDark}>{questionType}</Text>
        <View style={styles.grid}>
          {Object.entries(elementsData).map(([propertyName, imageSource], index) => (
            <View key={index} style={styles.element}>
              <PropertyCard
                onPress={() => console.log(`${propertyName} pressed`)}
                fishName={propertyName}
                imgSource={imageSource}
              />
            </View>
          ))}
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
      },
      grid: {
        flexDirection: 'row',  // Align children in a row
        flexWrap: 'wrap',      // Allow wrapping of elements to the next line
        justifyContent: 'space-between', // Space out the items evenly across rows
      },
      element: {
        width: '48%',
        marginBottom: 10, // Optional: adds space between rows
      },
  });

export default QuizzItemSelectionPanel;