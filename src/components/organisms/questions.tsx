import React, { useState } from "react";
import { View , Text, ScrollView, FlatList} from "react-native";
import QuestionStyles from "../../styles/organisms/questionStyles.tsx";
import { useAnswers } from "../../@config/answerContext.tsx";
import QuestionExpandable from "./questionExpandable.tsx";
import QuestionModel from "../../models/questions.model.tsx";

type QuestionsProps = {
    navigation : any,
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

const Questions : React.FC<QuestionsProps> = ({navigation}) => {
    const {answers, setAnswers } = useAnswers();
    const styles = QuestionStyles();
    // const [visibleModal, setModalVisible] = useState(false);
    // const [questionType, setQuestionType] = useState<string | null>(null);

    const handleQuestionPress = (type: string) => {
        // setQuestionType(type);
        // setModalVisible(true);
    };

    return (
        <View style={styles.mainDiv}>
        <View style={[styles.questionsList, {justifyContent: 'flex-end',
        alignItems : 'center',}]}>
                <FlatList
                    data={questions}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={styles.questionDiv}
                    renderItem={({ item, index }) => (
                    <React.Fragment>
                        <QuestionExpandable
                            question={item.question}
                            questionType={item.field}
                            items={item.reponses}
                            onFishPress={() => handleQuestionPress(item.field)}
                        />
                    </React.Fragment>
                    )}
                />
            </View>
        </View>
    )

}

export default Questions