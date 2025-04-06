import React from 'react';
import { View, Text, Button } from 'react-native';
import MyButton from '../atoms/button.tsx';
import HomeCard from '../molecules/homeCard.tsx';
import HomeTextCard from '../molecules/homeTextCard.tsx';
import MiniFishPicture from '../atoms/miniFishPicture.tsx';
import FishCard from '../molecules/fishCard.tsx';

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
