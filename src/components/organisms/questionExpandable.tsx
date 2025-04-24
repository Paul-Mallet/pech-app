import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import FishCard from '../molecules/fishCard.tsx';
import { useTheme } from './ThemeContext.tsx';
import { useNavigation } from '@react-navigation/native';
import { useAnswers } from '../../@config/answerContext.tsx';

type ItemType = {
  label: string;
  parameter?: string;
};

type QuestionExpandableProps = {
  question: string;
  questionType: string;
  items: ItemType[];
};

const QuestionExpandable: React.FC<QuestionExpandableProps> = ({ question, questionType, items }) => {
    const {answers, setAnswers } = useAnswers();
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

	const handleAnswerPress = (field: string, answer: string) =>
	{
		console.log("Answer: ", field, ", ", answer);
	}

	const toggleExpand = () => setExpanded(prev => !prev);

	return (
		<View style={{ padding: 6, borderRadius: 24, backgroundColor: theme.cardBackground }}>
			<TouchableOpacity onPress={toggleExpand} style={ {width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
				<Text style={[styles.textDark, { fontWeight: 'bold', fontSize: 18, paddingLeft: 12 }]}>
					{question}
				</Text>
				<Text style={[styles.textDark, { fontSize: 18 }]}>
					{expanded ? '▲' : '▼'}
				</Text>
			</TouchableOpacity>

			{expanded && (
				<View style={{ marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 6}}>
					{items.map((item, index) => (
						<View key={`${question}-${index}`} style={{ width: '48.5%', height: 'auto'}}>
							<FishCard
								fishName={item.label}
								imgSource={item.parameter?.toString() || ''}
								onPress={() => handleAnswerPress(questionType, item.label)}
							/>
						</View>
					))}
				</View>
			)}
		</View>
	);
};

export default QuestionExpandable;
