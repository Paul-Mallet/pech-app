import React, { useEffect, useState } from "react";
import { View , FlatList} from "react-native";
import QuestionStyles from "../../styles/organisms/questionStyles.tsx";
import { useAnswers } from "../../@config/answerContext.tsx";
import QuestionExpandable from "./questionExpandable.tsx";
import { getFishByAnswer } from "../../services/fish.service.tsx";
import { useFishList } from "../../@config/fishListContext.tsx";
import { QuestionsProps, AnswerField } from "../../models/quiz.model.tsx";

const Questions : React.FC<QuestionsProps> = ({questionsParams, shouldResetFilters}) => {
    const {answers, setAnswers } = useAnswers();
    const {setFishList} = useFishList();
    const styles = QuestionStyles();
    const [resetSignal, setResetSignal] = useState(0);

    useEffect(() => {
      if (shouldResetFilters)
      {
        setAnswers({});
        setFishList([]);
        setResetSignal(prev => prev + 1);
      }
    }, [shouldResetFilters]);
    
    const handleQuestionPress = (field: AnswerField, id: number) => {
      if (field !== "fins") {
        setAnswers({
          ...answers,
          [field]: id,
        });
        return;
      }
  
      const finGroup = questionsParams.finsIds.find(group =>
        group.ids.includes(id)
      );
  
      if (!finGroup) return;
  
      const currentFinIds = (answers.fin || []) as number[];
      const isSelected = currentFinIds.includes(id);
      const filtered = currentFinIds.filter((fid: number) => !finGroup.ids.includes(fid));
      const updated = isSelected ? filtered : [...filtered, id];
  
      setAnswers({
        ...answers,
        fin: updated,
      });
    };
    
    useEffect(() => {
      const updateFish = async () => {
        const updatedFishList = await getFishByAnswer(answers);
        setFishList(updatedFishList);
      }
      updateFish();
    }, [answers])

    return (
        <View style={styles.mainDiv}>
          <View style={styles.questionsList}>
            <FlatList
                data={questionsParams.toFlatListData()}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={styles.questionDiv}
                renderItem={({ item, index }) => (
                  <React.Fragment>
                      <QuestionExpandable
                          question={item.type}
                          questionType={item.field}
                          items={item.reponses}
                          callBack={handleQuestionPress}
                          resetFilter={resetSignal}
                      />
                  </React.Fragment>
                )}
            />
          </View>
        </View>
    )
}

export default Questions