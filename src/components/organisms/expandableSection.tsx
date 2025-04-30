import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import FishCard from '../molecules/fishCard.tsx';
import { useTheme } from './ThemeContext.tsx';
import { useNavigation } from '@react-navigation/native';
import { ItemType } from './questionExpandable.tsx';
import { Fish } from '../../pages/fishScreen.tsx';


type ExpandableSectionProps = {
  entryType: string;
  items: ItemType[];
  onFishPress?: (fishId: string) => void;
};

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ entryType, items, onFishPress }) => {
  const [expanded, setExpanded] = useState(true);
  const { theme } = useTheme();
  const styles = GlobalStyles();

  const navigation = useNavigation();
  const handleRightIconPress = (text: string) => {
      navigation.navigate('Tabs', {
          screen: 'Législation',
          params: { searchText: text },
      });
  };

  const toggleExpand = () => setExpanded(prev => !prev);
  
  const renderItem = ({ item }: { item: ItemType }) => {
    switch (entryType) {
      case 'Poissons':
        return (
          <FishCard
            fishName={item.label}
            id={item.id.toString()}
            imgSource={item.parameter || ''}
            onPress={() => onFishPress?.(item.id.toString())}
          />
        );
      case 'Recherches':
        return (
            <TouchableOpacity onPress={() => handleRightIconPress(item.label)}>
                <Text style={[styles.textDark, { fontSize: 16, padding: 6, borderColor: '#00000010', borderBottomWidth: 2, borderRadius: 8, color: theme.textHighlightDark }]}>
                {item.label}
                </Text>
          </TouchableOpacity>
        );
      default:
        return (
          <Text style={styles.textDark}>{item.label}</Text>
        );
    }
  };

  return (
    <View style={{ marginBottom: 20, padding: 6, borderRadius: 24, backgroundColor: theme.cardBackground }}>
      <TouchableOpacity onPress={toggleExpand} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={[styles.textDark, { fontWeight: 'bold', fontSize: 18, paddingLeft: 12 }]}>
          {entryType}
        </Text>
        <Text style={[styles.textDark, { fontSize: 18 }]}>
          {expanded ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {expanded && (
        <FlatList
          data={items}
          keyExtractor={(item, index) => `${entryType}-${index}`}
          renderItem={renderItem}
          numColumns={entryType === 'Recherches' ? 1 : 2}
          columnWrapperStyle={entryType !== 'Recherches' ? { marginTop: 10, justifyContent: 'space-between', alignItems: 'center', width: "50%", aspectRatio: 1.05, gap: 6 } : undefined}
        />
      )}
    </View>
  );
};

export default ExpandableSection;
