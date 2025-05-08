import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FishCard from '../molecules/fishCard.tsx';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { ItemType, ExpandableSectionProps } from '../../models/quiz.model.tsx';

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ entryType, items, onFishPress }) => {
  const [expanded, setExpanded] = useState(true);
  const styles = GlobalStyles();
  const navigation = useNavigation();

  const toggleExpand = useCallback(() => setExpanded(prev => !prev), []);

  const handleRightIconPress = useCallback((text: string) => {
    navigation.navigate('Tabs', {
      screen: 'Législation',
      params: { searchText: text },
    });
  }, [navigation]);

  const renderItem = useCallback(({ item }: { item: ItemType }) => {
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
            <Text style={[styles.textDark, styles.researchItem]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      default:
        return (
          <Text style={styles.textDark}>{item.label}</Text>
        );
    }
  }, [entryType, onFishPress, styles, handleRightIconPress]);

  const keyExtractor = useCallback((item: ItemType) => `${entryType}-${item.label}`, [entryType]);

  return (
    <View style={styles.expandableSection}>
      <TouchableOpacity onPress={toggleExpand} style={styles.expandableSectionButton}>
        <Text style={[styles.textDark, { fontSize: 18, paddingLeft: 12 }]}>
          {entryType}
        </Text>
        <Text style={[styles.textDark, { fontSize: 18 }]}>
          {expanded ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {expanded && (
        <FlatList
          data={items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={entryType === 'Recherches' ? 1 : 2}
          columnWrapperStyle={entryType !== 'Recherches' ? styles.expandableSectionList : undefined}
        />
      )}
    </View>
  );
};

export default React.memo(ExpandableSection);
