import { Fish } from "./fish.model.tsx";

export type HistoryContext = {
	history: HistoryItem[];
	groupedHistory: Record<string, HistoryItem[]>;
	addToHistory: (item: HistoryItem) => void;
	clearHistory: () => void;
	fetchFishes: () => void;
	getFishById: (id: string) => Fish | undefined;
	fishes: Fish[];
};

export type HistoryItem = {
	entryType: string;
	label: string;
	id: string;
	parameter: string;
};