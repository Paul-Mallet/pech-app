import React, { createContext, useContext, useState } from "react";
import ResearchAnswerModel from "../models/researchAnswer.model.tsx";

export type FishResearchAnswers = ResearchAnswerModel;

const defaultAnswerValues: FishResearchAnswers = {
  bodyType : -1,
  fin : [],
  eye : -1
};

type AnswerContextType = {
  answers: FishResearchAnswers;
  setAnswers: (newAnswers: Partial<FishResearchAnswers>) => void;
};

const AnswerContext = createContext<AnswerContextType | undefined>(undefined);

export const AnswerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswersState] = useState<FishResearchAnswers>(defaultAnswerValues);

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