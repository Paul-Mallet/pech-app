import React from 'react';
import { View, Animated, Dimensions } from 'react-native';
import DecouvrirTab from './discoverSection.tsx';
import HistoryList from './historySection.tsx';

const screenWidth = Dimensions.get('window').width;

type MainContentProps = {
  activeTab: string;
  switchTab: (target: string) => void;
  handleFishPress: (fishName: string) => void;
  groupedHistory: any;
};

const MainContent: React.FC<MainContentProps> = ({ activeTab, switchTab, handleFishPress, groupedHistory }) => {
  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={{ flexDirection: 'row', width: screenWidth * 2 }}>
        {activeTab === 'découvrir' ? (
          <DecouvrirTab handleFishPress={handleFishPress} />
        ) : (
          <HistoryList groupedHistory={groupedHistory} handleFishPress={handleFishPress} />
        )}
      </Animated.View>
    </View>
  );
};

export default MainContent;