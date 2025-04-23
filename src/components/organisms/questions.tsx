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
    questionsParams : QuestionModel 
}

type ItemType = {
    label: string;
    parameter?: string;
};

const questions = [
  {
    question: "Oui ou non ?",
    field: "fin",
    reponses: [
      { label: "oui", parameter: "" },
      { label: "non", parameter: "" },
      { label: "peut-etre", parameter: "" }
    ] as ItemType[]
  },
  {
    question: "Et sinon",
    field: "fin",
    reponses: [
      { label: "quoi", parameter: "" },
      { label: "hein", parameter: "" },
      { label: "euh", parameter: "" }
    ] as ItemType[]
  }
];

const Questions : React.FC<QuestionsProps> = ({navigation, questionsParams}) => {
    const {answers, setAnswers } = useAnswers();
    const {setFishList} = useFishList();
    const styles = QuestionStyles();
    // const [visibleModal, setModalVisible] = useState(false);
    // const [questionType, setQuestionType] = useState<string | null>(null);

    type AnswerField = "bodyType" | "fin" | "eye"

    const handleQuestionPress = (type: AnswerField, id : number) => {
      switch (type) {
        case "bodyType":
            setAnswers({
              ...answers,
              bodyType : id
            });
          break;
        case "fin":
            setAnswers((prev : any) => ({
              ...prev,
              fin : prev.fin.includes(id) 
                ? prev.fin.filter((oneId : number) => oneId != id)
                : [...prev.fin, id]
            }))
          break;
        case "eye":
            setAnswers({
              ...answers,
              eye : id
            });
          break;
        default:
          break;
      }
        // setQuestionType(type);
        // setModalVisible(true);
    };

    useEffect(() => {
      const updateFish = async () => {
        const updatedFishList = await getFishByAnswer(answers);
        setFishList(updatedFishList);
      }

      updateFish();
    }, [answers])

    return (
        <View style={[styles.mainDiv, { width: '100%', flex: 1 }]}>
            <FlatList
                data={questions}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={styles.questionDiv}
                renderItem={({ item, index }) => (
                <React.Fragment>
                    <QuestionExpandable
                        entryType={item.question}
                        field={item.field}
                        items={item.reponses}
                        onFishPress={() => handleQuestionPress(item.field)}
                    />
                </React.Fragment>
                )}
            />
        </View>
    )
}

export default Questions