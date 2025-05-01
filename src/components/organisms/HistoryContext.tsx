import React, { createContext, useContext, useState } from 'react';
import { Fish } from '../../pages/fishScreen.tsx';
import { getAllFish, getAllLegislations } from '../../services/fish.service.tsx';
import { Legislation } from '../../pages/legislationScreen.tsx';

type HistoryItem = {
  entryType: string;
  label: string;
  id: string;
  parameter: string;
};

type HistoryContextType = {
  history: HistoryItem[];
  groupedHistory: Record<string, HistoryItem[]>;
  addToHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
  fetchFishes: () => void;
  fetchLegislations: () => void;
  getFishById: (id: string) => Fish | undefined;
  fishes: Fish[];
  legislations: Legislation[];
  getHomeRandomContent: () => { fishes: Fish[]; legislations: Legislation[] };
};

/* 
    TODO:

    - when I go back from the Revoir to the Decouvrir section, the first click does nothing.
*/
const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [fishes, setFishes] = useState<Fish[]>([]);
	const [legislations, setLegislations] = useState<Legislation[]>([]);

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
          // console.log("\x1b[36mFetched all fishes:\x1b[0m", JSON.stringify(fishesVar));
          setFishes(fishesVar);
      } catch (err) {
          console.error('Impossible de charger les données des poissons.');
      }
  };

	const fetchLegislations = async () => {
		try {
			const legislationsVar = await getAllLegislations();
			// console.log("\x1b[36mFetched all legislations:\x1b[0m ", JSON.stringify(legislationsVar));
			setLegislations(legislationsVar);
		} catch (err) {
			console.error("Impossible de charger les infos des legislations.");
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

  function getRandomElements<T>(array: T[], count: number): T[] {
    // If the count exceeds the array length, use the length of the array
    const effectiveCount = Math.min(count, array.length);
  
    const result: T[] = [];
    const usedIndices = new Set<number>();
  
    while (result.length < effectiveCount) {
      const i = Math.floor(Math.random() * array.length);
      if (!usedIndices.has(i)) {
        usedIndices.add(i);
        result.push(array[i]);
      }
    }
  
    return result;
  }

  const getHomeRandomContent = () => {
    const fishVar = getRandomElements(fishes, 2);
    const legislationVar = getRandomElements(legislations, 5);
    return { fishes: fishVar, legislations: legislationVar };
  };

  return (
    <HistoryContext.Provider value={{ history, groupedHistory, addToHistory, clearHistory, fetchFishes, getFishById, fishes, fetchLegislations, legislations, getHomeRandomContent }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistory must be used within a HistoryProvider');
  return context;
};