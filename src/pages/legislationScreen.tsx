import React, { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import SearchBarLegislation from '../components/organisms/searchBarLegislation.tsx';
import LegislationPanel from '../components/molecules/legislationPanel.tsx';
import ParagraphLegislationCard from '../components/molecules/paragraphLegislation.tsx';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

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
		<ParagraphLegislationCard
		  key="1"
		  title="Arrêté du 22 Mars 2022 portant réglementation particulière de la pêche maritime de loisir dans les eaux au droit de l’île de Porquerolles, de ses îlots, des sèches des Sarranier, et du Langoustier :"
		  text="- Autour de ses îlots, neuf zones de pêche sont définies. Dans les zones F, H et R toute forme de pêche maritime de loisir est interdite toute l’année. Dans les zones A, B, C, D, E et G la pêche maritime de loisir est autorisée du 1er Septembre au 30 Juin de chaque année aux titulaires d’une autorisation. Pour les zones D, E et G la pratique de la chasse sous-marine est interdite toute l’année."
		/>,
		<ParagraphLegislationCard
		  key="2"
		  title="Arrêté du 9 Juillet 2024 portant réglementation particulière de la pêche maritime de loisir à l’intérieur du périmètre de la Réserve Naturelle Marine de Cerbère-Banyuls :"
		  text="- Pêche maritime de loisir à l’intérieur de la zone est soumise à la détention préalable d’une autorisation. Maximum de 1000 autorisations sur une année civile. Pêche maritime de loisir autorisée qu’entre le lever et le coucher du soleil.10 prises dans la limite des quotas et tailles minimales, par jour et par navire quel que soit le nombre de personnes embarquées, et par jour et par pêcheur à pied lorsque ce dernier œuvre depuis le rivage."
		/>,
		<ParagraphLegislationCard
		  key="3"
		  title="Arrêté du 15 Novembre 2018 portant mesures de réglementation particulière de la pêche maritime de loisir à des fins de consommation personnelle et familiale dans le coeur marin du Parc National des Calanques :"
		  text="- Toutes les espèces de poissons de plus de 15cm, détenues par une personne ayant effectué un acte de pêche de loisir à l’intérieur du Parc National des Calanques, doivent faire l’objet d’un marquage (ablation de la partie inférieure de la nageoire caudale de chaque spécimen). Les spécimens doivent être conservés entiers jusqu’à leur débarquement, l’opération de marquage ne devant pas empêcher la mesure de la taille du poisson. Pour les pêcheurs de loisir sous-marins pratiquant à partir du rivage, ce marquage doit intervenir dès qu’ils ont rejoint le rivage. Pour les pêcheurs de loisir à la ligne pratiquant depuis le rivage et les pêcheurs à pied de loisir, ce marquage doit intervenir dès la capture."
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
