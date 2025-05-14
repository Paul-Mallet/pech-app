import React from 'react';
import { Text, Pressable, GestureResponderEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ButtonStyles from '../../styles/atoms/buttonStyles.tsx';

interface CTAButtonProps {
  searchText?: string;
  buttonText?: string;
  onPress?: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  searchText, 
  buttonText = "Réglementation",
  onPress
}) => {
  const navigation = useNavigation();
  const styles = ButtonStyles();

  const handlePress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    
    if (onPress) {
      onPress();
    } else if (searchText) {
      // Navigation par défaut vers l'écran Législation si searchText est fourni
      navigation.navigate('Tabs', {
        screen: 'Réglementation',
        params: { searchText: searchText },
      });
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.containerCTAButton, 
        { opacity: pressed ? 0.5 : 1 }
      ]}
      onTouchStart={handlePress}
    >
      <Text style={styles.textCTAButton}>
        {buttonText}
      </Text>
    </Pressable>
  );
};

export default CTAButton;