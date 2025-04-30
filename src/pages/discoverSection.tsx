import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import FishCard from '../components/molecules/fishCard.tsx';
import LegislationCard from '../components/molecules/legislationCard.tsx';
import { getHomeContent } from "../services/fish.service.tsx";
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { Fish } from './fishScreen.tsx';

const screenWidth = Dimensions.get('window').width;

type DecouvrirTabProps = {
  handleFishPress: (fish: Fish) => void;
  handleLegislationPress: (id: string) => void;
};

const DecouvrirTab: React.FC<DecouvrirTabProps> = ({ handleFishPress, handleLegislationPress }) => {
	const [fishes, setFishes] = useState<Fish[]>([]);
	const [legislations, setLegislations] = useState<any[]>([]);
	const [error, setError] = useState<string | null>(null);
	const styles = GlobalStyles();


	useEffect(() => 
	{
		const fetchData = async () => {
			try {
				const contentVar = await getHomeContent();
				setLegislations(contentVar.legislations);
				setFishes(contentVar.fishes);
			} catch (err) {
				setError('Impossible de charger les données.');
			}
		};
		fetchData();
	}, [])

	return (
		<ScrollView
		style={[styles.homePanel, { width: screenWidth, padding: 20 }]}
		showsVerticalScrollIndicator={false}
		>
			<View style={styles.fishCardsContainer}>
				{ error &&
					<Text style={{ color: 'red', padding: 20 }}>{error}</Text>
				}
				{ fishes &&
					<View style={styles.fishCardsContainer}>
						{
							fishes.map((fish, index) => (
								<FishCard
									key={fish.id || index}
									onPress={() => handleFishPress(fish)}
									fishName={fish.name}
									imgSource={fish.additionalImages[0].url}
								/>
							))
						}
					</View>
				}
			</View>

			{ error &&
				<Text style={{ color: 'red', padding: 20 }}>{error}</Text>
			}
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
