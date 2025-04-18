import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import SearchBarLegislation from '../components/organisms/searchBarLegislation.tsx';
import LegislationPanel from '../components/molecules/legislationPanel.tsx';
import ParagraphLegislationCard from '../components/molecules/paragraphLegislation.tsx';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LegislationCard from '../components/molecules/legislationCard.tsx';

const LegislationScreen = ({ route }: { route: any }) => {
	const navigation = useNavigation();
	const styles = GlobalStyles();
	const [searchText, setSearchText] = useState('');
	const handleSearch = (text: string) => {
	  setSearchText(text);
	};
	
	useFocusEffect(
		React.useCallback(() => {
		  if (route.params?.searchText) {
			setSearchText(route.params.searchText);
		  }
		  navigation.setParams({ searchText: undefined });
		}, [route.params?.searchText])
	  );

	// delete the paragraphs when the server gives the data.
	const [allParagraphs, setAllParagraphs] = useState<JSX.Element[]>([
		<LegislationCard
			title='Arrêté du 9 Juillet 2024'
			text='Réglementation particulière de la pêche maritime de loisir à l’intérieur du périmètre de la <h>Réserve Naturelle Marine...</h>'
			onPress={() => console.log('Text card pressed')}
		/>,
		<LegislationCard
			title='Arrêté du 9 Juillet 2024'
			text='Réglementation particulière de la pêche maritime de loisir à l’intérieur du périmètre de la <h>Réserve Naturelle Marine...</h>'
			onPress={() => console.log('Text card pressed')}
		/>,
		<LegislationCard
			title='Arrêté du 9 Juillet 2024'
			text='Réglementation particulière de la pêche maritime de loisir à l’intérieur du périmètre de la <h>Réserve Naturelle Marine...</h>'
			onPress={() => console.log('Text card pressed')}
		/>,
	  ]);

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
		</SafeAreaView>
	);
};

export default LegislationScreen;
