import { Fish } from "./fish.model.tsx";
import { Legislation } from "./legislation.model.tsx";

export type HistoryContextProps = {
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

export type HistoryItem = {
	entryType: string;
	label: string;
	id?: string;
	parameter?: string | null;
};