import React from 'react';
import { Text, Pressable, GestureResponderEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';

interface CTAButton {
  fishName: string;
}

const CTAButton: React.FC<CTAButton> = ({ fishName }) => {
	const navigation = useNavigation();
  const styles = GlobalStyles();

  const goToLegislationScreen = (text: string) => {
		navigation.navigate('Tabs', {
			screen: 'Législation',
			params: { searchText: text },
		});
	};

  return (
    <Pressable
      style={({ pressed }) => [
        styles.containerCTAButton, 
        { opacity: pressed ? 0.5 : 1 }
      ]}
      onTouchStart={(e: GestureResponderEvent) => {
        e.stopPropagation();
        goToLegislationScreen(fishName);
      }}
    >
      <Text style={styles.textCTAButton}>
        Législation
      </Text>
    </Pressable>
  );
};

export default CTAButton;