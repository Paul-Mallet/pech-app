import React, { useState } from "react";
import { View , Text, ScrollView, FlatList} from "react-native";
import QuestionStyles from "../../styles/organisms/questionStyles.tsx";
import { useAnswers } from "../../@config/answerContext.tsx";
import QuestionExpandable from "./questionExpandable.tsx";

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

const Questions = ({navigation} : {navigation : any}) => {
    const {answers, setAnswers } = useAnswers();
    const styles = QuestionStyles();
    // const [visibleModal, setModalVisible] = useState(false);
    // const [questionType, setQuestionType] = useState<string | null>(null);

    const handleQuestionPress = (type: string) => {
        // setQuestionType(type);
        // setModalVisible(true);
    };

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