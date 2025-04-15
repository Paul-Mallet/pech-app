import React, { ReactNode, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import FishCard from '../components/molecules/fishCard.tsx';

interface HomeCardProps {
    children?: ReactNode;
  }

const data = [
{
    id: '1',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '2',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '3',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '4',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '5',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '6',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '7',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '8',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '9',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '10',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '11',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '12',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '13',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '14',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '15',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '16',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '17',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '18',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '19',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
{
    id: '20',
    fishName: 'Mérou brun',
    imgSource:
    'https://doris.ffessm.fr/var/doris/storage/images/images/clef-d-identification-18554/161441-1-fre-FR/epinephelus_marginatus-01CD1.jpg',
},
// Add more items as needed
];
  
const FishScreen = ({ children }: HomeCardProps) => {
	const styles = GlobalStyles();
	const [searchText, setSearchText] = useState('');
	const handleSearch = (text: string) => {
	  setSearchText(text);
	};

	return (
		<SafeAreaView style={styles.body}>
		    <View style={[styles.homePanel, {paddingTop: 20, marginTop: 40, paddingBottom: 40}]}>
                <Text style={styles.titleDark}>Poissons</Text>
                <FlatList
                
                    contentContainerStyle={{gap: 12}}
                    data={data}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={style.cardContainer}>
                        <FishCard
                          onPress={() => console.log('Card pressed')}
                          fishName={item.fishName}
                          imgSource={item.imgSource}
                        />
                      </View>
                )}
            />
           </View>
        </SafeAreaView>
	);
};

const style = StyleSheet.create({
    list: {
      padding: 10,
    },
    cardContainer: {
      flex: 1,
    },
  });

export default FishScreen;
