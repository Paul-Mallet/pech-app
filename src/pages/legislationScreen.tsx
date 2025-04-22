import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import SearchBarLegislation from '../components/organisms/searchBarLegislation.tsx';
import LegislationPanel from '../components/molecules/legislationPanel.tsx';
import ParagraphLegislationCard from '../components/molecules/paragraphLegislation.tsx';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LegislationCard from '../components/molecules/legislationCard.tsx';
import LegislationSheet from '../components/organisms/legislationSheet.tsx';
import type BottomSheet from '@gorhom/bottom-sheet';
import regulations from '../data/mocks/regulations.json';

const LegislationScreen = ({ route }: { route: any }) => {
	const navigation = useNavigation();
	const styles = GlobalStyles();
	const [searchText, setSearchText] = useState('');
	const [pressedLegislation, setPressedLegislation] = useState<string | null>(null);
	const [bottomSheetLegislationTitle, setBottomSheetLegislationTitle] = useState<string | null>(null);
	const bottomSheetRef = useRef<BottomSheet>(null);

	const handleSearch = (text: string) => {
	  setSearchText(text);
	};

	const handleLegislationPress = (title: string) => {
		setBottomSheetLegislationTitle(title);
		bottomSheetRef.current?.expand();
	};
	
	useFocusEffect(
		React.useCallback(() => {
		  if (route.params?.searchText) {
			setSearchText(route.params.searchText);
		  }
		  navigation.setParams({ searchText: undefined });
		}, [route.params?.searchText])
	  );

	const [allParagraphs] = useState<JSX.Element[]>(
		regulations.map((reg) => (
		  <LegislationCard
			key={reg.id}
			title={reg.title}
			text={reg.content.join('\n')}
			onPress={() => handleLegislationPress(reg.title)}
		  />
		))
	);

	/*
		Function to add a new paragraph dynamically:
	  	usage:
	  	addParagraph('Title', 'Paragraph');
	*/
	const addParagraph = (title: string, text: string) => {
		const newKey = String(allParagraphs.length + 1);
		const newParagraph = (
			<ParagraphLegislationCard
				key={newKey}
				title={title}
				text={text}
			/>
		);
		setAllParagraphs(prev => [...prev, newParagraph]);
	};
  
	// Filter the children by inspecting props
	const filtered = allParagraphs
    .filter(p => 
      p.props.title.toLowerCase().includes(searchText.toLowerCase()) || 
      p.props.text.toLowerCase().includes(searchText.toLowerCase())
    )
    .map(p => React.cloneElement(p, { searchText }));

	return (
		<SafeAreaView style={styles.body}>
			<SearchBarLegislation searchText={searchText} setSearchText={setSearchText} />
			<LegislationPanel>
				{filtered}
			</LegislationPanel>
			<LegislationSheet
				ref={bottomSheetRef}
				legislationTitle={bottomSheetLegislationTitle || undefined}
				onClose={() => setBottomSheetLegislationTitle(null)}
			/>
		</SafeAreaView>
	);
};

export default LegislationScreen;
