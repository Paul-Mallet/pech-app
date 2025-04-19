import React from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import FishCard from '../components/molecules/fishCard.tsx';
import LegislationCard from '../components/molecules/legislationCard.tsx';
import GlobalStyles from '../styles/base/globalStyles.tsx';

const screenWidth = Dimensions.get('window').width;

type DecouvrirTabProps = {
  handleFishPress: (fishName: string) => void;
};

const DecouvrirTab: React.FC<DecouvrirTabProps> = ({ handleFishPress }) => {
  const styles = GlobalStyles();

  return (
    <ScrollView
      style={[styles.homePanel, { width: screenWidth, padding: 20 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.fishCardsContainer}>
        <FishCard
          onPress={() => handleFishPress('Mérou brun')}
          fishName="Mérou brun"
          imgSource="https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg"
        />
        <FishCard
          onPress={() => handleFishPress('Thon rouge')}
          fishName="Thon rouge"
          imgSource="https://img.cuisineaz.com/660x660/2016/04/28/i58301-thon-rouge-de-ligne-cru.jpg"
        />
      </View>
      <LegislationCard
        title="Arrêté du 9 Juillet 2024"
        text="Réglementation particulière de la pêche maritime de loisir à l’intérieur du périmètre de la <h>Réserve Naturelle Marine...</h>"
        onPress={() => console.log('Text card pressed')}
      />
      <LegislationCard
        title="Arrêté du 22 Mars 2024"
        text="Réglementation particulière de la pêche maritime de loisir dans les eaux au droit de l’<h>île de Porquerolles</h>, de ses îlots..."
        onPress={() => console.log('Text card pressed')}
      />
      <LegislationCard
        title="Arrêté du 9 Juillet 2024 portant réglementation particulière de la pêche maritime de loisir à l’intérieur du périmètre de la Réserve Naturelle Marine de Cerbère-Banyuls :"
        text="Pêche maritime de loisir à l’intérieur de la zone est soumise à la détention préalable d’une autorisation. Maximum de 1000 autorisations sur une année civile. Pêche maritime de loisir autorisée qu’entre le lever et le coucher du soleil.10 prises dans la limite des quotas et tailles minimales, par jour et par navire quel que soit le nombre de personnes embarquées, et par jour et par pêcheur à pied lorsque ce dernier œuvre depuis le rivage."
        onPress={() => console.log('Text card pressed')}
      />
      <LegislationCard
        title="Arrêté du 22 Mars 2024"
        text="Réglementation particulière de la pêche maritime de loisir dans les eaux au droit de l’<h>île de Porquerolles</h>, de ses îlots..."
        onPress={() => console.log('Text card pressed')}
      />
      <LegislationCard
        title="Arrêté du 22 Mars 2024"
        text="Réglementation particulière de la pêche maritime de loisir dans les eaux au droit de l’<h>île de Porquerolles</h>, de ses îlots..."
        onPress={() => console.log('Text card pressed')}
      />
    </ScrollView>
  );
};

export default DecouvrirTab;
