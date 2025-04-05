import React from 'react';
import { View, Text, Button } from 'react-native';
import MyButton from './button.tsx';
import HomeCard from './homeCard.tsx';
import HomeTextCard from './homeTextCard.tsx';
import MiniFishPicture from './miniFishPicture.tsx';
import FishCard from './fishCard.tsx';

const HomeScreen = ({navigation}: {navigation: any}) => {
  return (
    <View>
      <Button title="Go to Search" onPress={() => navigation.navigate('Search')} />
      <MyButton text='Un bouton'></MyButton>
      <HomeCard onPress={() => console.log('Card pressed')}>
        <HomeTextCard
          title="Arrêté du 9 Juillet 2024"
          text="Réglementation particulière de la pêche maritime de loisir à l’intérieur du périmètre de la <h>Réserve Naturelle Marine...</h>"          
        />
      </HomeCard>
      <FishCard onPress={() => console.log('Card pressed')} fishName='Merou brun'>
      </FishCard>
      <FishCard onPress={() => console.log('Card pressed')} fishName='Merou pas brun'>
      </FishCard>
    </View>
  );
};

export default HomeScreen;
