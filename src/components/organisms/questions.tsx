import React, { useEffect, useState } from "react";
import { View , Text, ScrollView, FlatList} from "react-native";
import QuestionStyles from "../../styles/organisms/questionStyles.tsx";
import { useAnswers } from "../../@config/answerContext.tsx";
import QuestionExpandable from "./questionExpandable.tsx";
import QuestionModel from "../../models/questions.model.tsx";
import { getFishByAnswer } from "../../services/fish.service.tsx";
import { useFishList } from "../../@config/fishListContext.tsx";

type QuestionsProps = {
    navigation : any,
    questionsParams : QuestionModel,
    shouldResetFilters: boolean
}
// const questions = [
//   {
//     question: "Oui ou non ?",
//     field: "fin",
//     reponses: [
//       { label: "oui", parameter: "" },
//       { label: "non", parameter: "" },
//       { label: "peut-etre", parameter: "" }
//     ] as ItemType[]
//   },
//   {
//     question: "Et sinon",
//     field: "fin",
//     reponses: [
//       { label: "quoi", parameter: "" },
//       { label: "hein", parameter: "" },
//       { label: "euh", parameter: "" }
//     ] as ItemType[]
//   }
// ];

const Questions : React.FC<QuestionsProps> = ({navigation, questionsParams, shouldResetFilters}) => {
    const {answers, setAnswers } = useAnswers();
    const {setFishList} = useFishList();
    const styles = QuestionStyles();
    const [resetSignal, setResetSignal] = useState(0);
    // const [visibleModal, setModalVisible] = useState(false);
    // const [questionType, setQuestionType] = useState<string | null>(null);

    type AnswerField = "bodyType" | "fins" | "eye"

    useEffect(() => {
      if (shouldResetFilters)
      {
        console.log("filters resetted");
        setAnswers({});
        setFishList([]);
        setResetSignal(prev => prev + 1);
      }
    }, [shouldResetFilters]);
    
    const handleQuestionPress = (field: AnswerField, id: number) => {
      // console.log("\x1b[36mAnswer:\x1b[0m", field, ", ", id);
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

      setAnswers((prev : any) => {
        const currentFinIds = prev.fin || [];

        const isSelected = currentFinIds.includes(id);

        const filtered = currentFinIds.filter((id : number) => !finGroup.ids.includes(id));

        const updated = isSelected ? filtered : [...filtered, id];
    
        return {
          ...prev,
          fin: updated,
        };
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
        <View style={[styles.questionsList, {justifyContent: 'flex-end', alignItems : 'center',}]}>
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