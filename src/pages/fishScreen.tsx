import React, { ReactNode, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
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
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '2',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '3',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '4',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '5',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '6',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '7',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '8',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '9',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '10',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '11',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '12',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '13',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '14',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '15',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '16',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '17',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '18',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '19',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
{
    id: '20',
    fishName: 'Mérou brun',
    imgSource:
    'https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg',
},
// Add more items as needed
];
  
const FishScreen = ({ children }: HomeCardProps) => {
	const styles = GlobalStyles();

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
                        <View style={{flex: 1}}>
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

export default FishScreen;