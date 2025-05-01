export interface ResultGroupProps {
    elementType: string;
    elements: string[];
};

export interface SearchBarLegislationProps {
    searchText: string;
    setSearchText: (text: string) => void;
};

export type HomeSwitchProps = {
	activeTab: string;
	switchTab: (target: string) => void;
	tabs: { key: string; label: string }[];
};