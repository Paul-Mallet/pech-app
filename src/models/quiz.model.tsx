import QuestionModel from './questions.model.tsx';

export type ItemType = {
    label: string;
    type: string;
    id: number;
    parameter: string;
};

export type AnswerField = "bodyType" | "fins" | "eye";

export type QuestionExpandableProps = {
    question: string;
    questionType: string;
    items: ItemType[];
    callBack: (field: AnswerField, id: number) => void;
    resetFilter: number;
};

export type ExpandableSectionProps = {
    entryType: string;
    items: ItemType[];
    onFishPress?: (fishId: string) => void;
};

export type QuestionsProps = {
    questionsParams : QuestionModel,
    shouldResetFilters: boolean
};