import React from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import FishCard from '../components/molecules/fishCard.tsx';
import LegislationCard from '../components/molecules/legislationCard.tsx';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { Fish } from '../models/fish.model.tsx';
import { Legislation } from '../models/legislation.model.tsx';

const screenWidth = Dimensions.get('window').width;

type DecouvrirTabProps = {
  handleFishPress: (fishId: string) => void;
  handleLegislationPress: (id: string) => void;
  fishes: Fish[];
  legislations: Legislation[];
};

const DecouvrirTab: React.FC<DecouvrirTabProps> = ({ handleFishPress, handleLegislationPress, fishes, legislations }) => {
	const styles = GlobalStyles();


	return (
		<ScrollView
		style={[styles.homePanel, { width: screenWidth, padding: 20 }]}
		showsVerticalScrollIndicator={false}
		>
			<View style={[styles.fishCardsContainer, {marginBottom: 30}]}>
				{ fishes &&
					<View style={styles.fishCardsContainer}>
						{
							fishes.map((fish, index) => (
								<FishCard
									key={fish.id || index}
									id={fish.id.toString()}
									onPress={() => handleFishPress(fish.id.toString())}
									fishName={fish.name}
									imgSource={fish.additionalImages[0].url}
								/>
							))
						}
					</View>
				}
			</View>
			{ legislations &&
				legislations.map((legislation, index) => (
					<LegislationCard
						key={legislation.id || index}
						title={legislation.title}
						text={legislation.article}
						onPress={() => handleLegislationPress(legislation.id.toString())}
					/>
				))
			}

		</ScrollView>
	);
};

export default DecouvrirTab;
