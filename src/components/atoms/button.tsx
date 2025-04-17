import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
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
    <TouchableOpacity
      style={styles.containerCTAButton}
      onPress={() => goToLegislationScreen(fishName)}
    >
      <Text style={styles.textCTAButton}>
        Législation
      </Text>
    </TouchableOpacity>
  );
};

export default CTAButton;