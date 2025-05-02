import React, { createContext, useContext, useState } from 'react';
import { Fish } from '../../models/fish.model.tsx';
import { HistoryContextProps, HistoryItem } from '../../models/history.model.tsx';
import { getAllFish } from '../../services/fish.service.tsx';

/* 
    TODO:

    - when I go back from the Revoir to the Decouvrir section, the first click does nothing.
*/
const HistoryContext = createContext<HistoryContextProps | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [fishes, setFishes] = useState<Fish[]>([]);

  const addToHistory = (item: HistoryItem) => {
    setHistory(prev => [item, ...prev.filter(i => (i.label !== item.label || (i.label === item.label && i.entryType !== item.entryType)))]);
  };
  
  const groupedHistory = history.reduce((acc, item) => {
    if (!acc[item.entryType]) acc[item.entryType] = [];
    acc[item.entryType].push(item);
    return acc;
  }, {} as Record<string, HistoryItem[]>);

  const clearHistory = () => setHistory([]);

  const fetchFishes = async () => {
      try {
          const fishesVar = await getAllFish();
          console.log("\x1b[36mFetched all fishes:\x1b[0m", JSON.stringify(fishesVar));
          setFishes(fishesVar);
      } catch (err) {
          console.error('Impossible de charger les données des poissons.');
      }
  };

  const getFishById = (id: string): Fish | undefined => {
    try {
      return fishes.find(f => f.id.toString() === id);
    } catch (e) {
      console.error('Failed to get fish by ID:', e);
      return undefined;
    }
  };

  return (
    <HistoryContext.Provider value={{ history, groupedHistory, addToHistory, clearHistory, fetchFishes, getFishById, fishes }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistory must be used within a HistoryProvider');
  return context;
};