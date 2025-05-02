import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FishCard from '../molecules/fishCard.tsx';
import { useTheme } from './ThemeContext.tsx';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { AnswerField, QuestionExpandableProps } from '../../models/quiz.model.tsx';

const QuestionExpandable: React.FC<QuestionExpandableProps> = ({ question, questionType, items, callBack, resetFilter }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const { theme, font } = useTheme();
  const styles = GlobalStyles();

  function isAnswerField(answer: string): answer is AnswerField {
    return ["bodyType", "fins", "eye"].includes(answer);
  }


  useEffect(() => {
    if (resetFilter !== undefined)
    {
      setSelectedId(null);
      setSelectedLabel(null);
      setExpanded(false);
    }
  }, [resetFilter])

  const handleAnswerPress = (id: number, answer: string, label: string) => {
    if (isAnswerField(answer)) {
      setSelectedId((prevSelectedId) => (prevSelectedId === id ? null : id));
      setSelectedLabel((prevSelectedText) => (prevSelectedText === label ? null : label));
      const answerField: AnswerField = answer;
      callBack(answerField, id);
      setExpanded(false);
    }
  };

  const toggleExpand = () => setExpanded(prev => !prev);

  return (
    <View style={{ padding: 6, borderRadius: 24, backgroundColor: selectedId ? theme.searchBarBackgroundFocused : theme.subcardBackground, borderColor: '#00000008', borderWidth: 1 }}>
      <TouchableOpacity onPress={toggleExpand} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={[styles.textDark, { fontSize: 14, paddingLeft: 12 }]}>
          {question}
          {selectedLabel && (
            <Text style={{ color: theme.green, fontFamily: font.regular }}> - {selectedLabel}</Text>
          )}
        </Text>
        <Text style={[styles.textDark, { fontSize: 14 }]}>
          {expanded ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {expanded && (
        <View style={{ marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 6 }}>
          {items.map((item, index) => (
            <View
              key={`${question}-${index}`}
              style={{ 
                width: '48.5%', 
                height: 'auto', 
                borderWidth: selectedId === item.id ? 3 : 0,
                borderRadius: 28,
				        borderColor: "#00ff00"
              }}
            >
              <FishCard
                fishName={item.label}
                id={item.id.toString()}
                imgSource={item.parameter?.toString() || ''}
                onPress={() => handleAnswerPress(item.id, item.type, item.label)}
                addHistory = {false}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default QuestionExpandable;
