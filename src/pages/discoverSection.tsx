import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Dimensions, ActivityIndicator } from 'react-native';
import FishCard from '../components/molecules/fishCard.tsx';
import LegislationCard from '../components/molecules/legislationCard.tsx';
import { getFishById, getLegislationById } from "../services/fish.service.tsx";
import GlobalStyles from '../styles/base/globalStyles.tsx';

const screenWidth = Dimensions.get('window').width;

type DecouvrirTabProps = {
  handleFishPress: (fishName: string) => void;
};

// handleLegisPress too?
const DecouvrirTab: React.FC<DecouvrirTabProps> = ({ handleFishPress }) => {
  const [fishes, setFishes] = useState<any[]>([]);
  const [legislations, setLegislations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const styles = GlobalStyles();

//   useEffect(() => {
// 	const fetchRandomFishes = async () => {
// 	  try {
// 		const randomFishesIds = getRandomIds(2);
// 		const randomFishes = await Promise.all(
// 			randomFishesIds.map(id => getFishById(id))
// 		);
// 		setFishes(randomFishes);
// 	  } catch (err) {
// 		setError("Impossible de charger les infos des poissons.");
// 	  } finally {
// 		setLoading(false);
// 	  }
// 	};
// 	fetchRandomFishes();
//   }, []);

//   useEffect(() => {
// 	const fetchRandomLegislations = async () => {
// 	  try {
// 		const randomLegislationIds = getRandomIds(5);
// 		const randomLegislations = await Promise.all(
// 			randomLegislationIds.map(id => getLegislationById(id))
// 		);
// 		setLegislations(randomLegislations);
// 	  } catch (err) {
// 		setError("Impossible de charger les infos des legislations.");
// 	  } finally {
// 		setLoading(false);
// 	  }
// 	};
// 	fetchRandomLegislations();
//   });

  const getRandomIds = (count: number) => {
	const ids: any[] = [];

	for (let i = 1; i <= 20; i++)
		ids.push(i);

	const shuffled = [...ids].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
  };

  return (
	<ScrollView
	  style={[styles.homePanel, { width: screenWidth, padding: 20 }]}
	  showsVerticalScrollIndicator={false}
	>
	  	{/*
		<View style={styles.fishCardsContainer}>
			{ loading &&
				<ActivityIndicator size="large" style={{ flex: 1 }} />
			}
			{ error &&
				<Text style={{ color: 'red', padding: 20 }}>{error}</Text>
			}
			{ fishes &&
				<View style={styles.fishCardsContainer}>
					{
						fishes.map((fish, index) => (
							<FishCard
								key={fish.id || index}
								onPress={() => handleFishPress(fish.commonName)}
								fishName={fish.commonName}
								imgSource={fish.images[0]} //img_card
							/>
						))
					}
				</View>
			}
	  	</View>
		*/}
		{/*
		{ loading &&
			<ActivityIndicator size="large" style={{ flex: 1 }} />
		}
		{ error &&
			<Text style={{ color: 'red', padding: 20 }}>{error}</Text>
		}
		{ legislations &&
			<View style={styles.fishCardsContainer}>
				{
					legislations.map((legislation, index) => (
						<LegislationCard
							key={legislation.id || index}
							title={legislation.title}
							text={legislation.article}
							onPress={() => console.log('Text card pressed')}
						/>
					))
				}
			</View>
		}
		*/}
	</ScrollView>
  );
};

export default DecouvrirTab;
