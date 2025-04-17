import React, { createContext, useContext, useState } from "react";

export type FishResearchAnswers = {
  fin: string;
};

type AnswerContextType = {
  answers: FishResearchAnswers;
  setAnswers: (newAnswers: Partial<FishResearchAnswers>) => void;
};

const defaultValues: FishResearchAnswers = {
  fin: '',
};

const AnswerContext = createContext<AnswerContextType | undefined>(undefined);

export const AnswerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswersState] = useState<FishResearchAnswers>(defaultValues);

  const setAnswers = (newAnswers: Partial<FishResearchAnswers>) => {
    setAnswersState(prev => ({ ...prev, ...newAnswers }));
  };

  return (
    <AnswerContext.Provider value={{ answers, setAnswers }}>
      {children}
    </AnswerContext.Provider>
  );
};

export const useAnswers = (): AnswerContextType => {
  const context = useContext(AnswerContext);
  if (!context) {
    throw new Error("useAnswers must be used within an AnswerProvider");
  }
  return context;
};
