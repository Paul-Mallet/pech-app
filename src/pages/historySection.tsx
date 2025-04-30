import React from 'react';
import { FlatList, Dimensions } from 'react-native';
import ExpandableSection from '../components/organisms/expandableSection.tsx';

const screenWidth = Dimensions.get('window').width;

type HistoryListProps = {
  groupedHistory: Record<string, any[]>;
  handleFishPress: (fishId: string) => void;
};

const HistoryList: React.FC<HistoryListProps> = ({ groupedHistory, handleFishPress }) => {
  return (
    <FlatList
      data={Object.entries(groupedHistory)}
      keyExtractor={([entryType]) => entryType}
      renderItem={({ item: [entryType, items] }) => {
        const maxItems = entryType === 'Poissons' ? 4 : entryType === 'Recherches' ? 6 : items.length;
        return (
          <ExpandableSection
            entryType={entryType}
            items={items.slice(0, maxItems)}
            onFishPress={handleFishPress}
          />
        );
      }}
      contentContainerStyle={{ width: screenWidth, padding: 20 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HistoryList;
