import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import FishCard from '../molecules/fishCard.tsx';
import { useTheme } from './ThemeContext.tsx';
import { useNavigation } from '@react-navigation/native';

type ItemType = {
  label: string;
  parameter?: string;
};

type QuestionExpandableProps = {
  entryType: string;
  field: string;
  items: ItemType[];
  onFishPress?: (label: string) => void;
};

const QuestionExpandable: React.FC<QuestionExpandableProps> = ({ entryType, field, items, onFishPress }) => {
  const [expanded, setExpanded] = useState(false);
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
	switch (field) {
	  case 'fin':
		return (
		  <FishCard
			fishName={item.label}
			imgSource={item.parameter || ''}
			onPress={() => onFishPress?.(item.label)}
		  />
		);
	  case 'body':
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
	<View style={{ padding: 6, borderRadius: 24, backgroundColor: theme.cardBackground }}>
	  <TouchableOpacity onPress={toggleExpand} style={ {width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
		<Text style={[styles.textDark, { fontWeight: 'bold', fontSize: 18, paddingLeft: 12 }]}>
			{entryType}
		</Text>
		<Text style={[styles.textDark, { fontSize: 18 }]}>
		  {expanded ? '▲' : '▼'}
		</Text>
	  </TouchableOpacity>

	  {expanded && (
		<View style={{ marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
			{items.map((item, index) => (
			<React.Fragment key={`${entryType}-${index}`}>
				{renderItem({ item })}
			</React.Fragment>
			))}
		</View>
)}
	</View>
  );
};

export default QuestionExpandable;
