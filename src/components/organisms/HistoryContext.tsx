import React, { createContext, useContext, useState } from 'react';

type HistoryItem = {
  entryType: string;
  label: string;
  parameter: string;
};

type HistoryContextType = {
  history: HistoryItem[];
  groupedHistory: Record<string, HistoryItem[]>;
  addToHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
};


/* 
    TODO:

    - add a style to the texts in the Revoir page.
    - check the entryType and add a fish card for the fishes and a clickable text for the research with maximum elements. Maybe a scrollview?
    - when I go back from the Revoir to the Decouvrir section, the first click does nothing.
*/
const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addToHistory = (item: HistoryItem) => {
    setHistory(prev => [item, ...prev.filter(i => (i.label !== item.label || (i.label === item.label && i.entryType !== item.entryType)))]);
  };
  
  const groupedHistory = history.reduce((acc, item) => {
    if (!acc[item.entryType]) acc[item.entryType] = [];
    acc[item.entryType].push(item);
    return acc;
  }, {} as Record<string, HistoryItem[]>);

  const clearHistory = () => setHistory([]);

  return (
    <HistoryContext.Provider value={{ history, groupedHistory, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistory must be used within a HistoryProvider');
  return context;
};