import React, { useState } from 'react';
import { Text, View, Modal, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import PropertyCard from './propertyCard.tsx';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../organisms/ThemeContext.tsx';
import QuizzStyles from '../../styles/pages/QuizzStyles.tsx';

interface QuizzItemSelectionPanelProps {
    elementsData: Record<string, string>;
    questionType: string | null;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

/*
  Put this to be able to change the visible state of the modal:

	    const [isModalVisible, setModalVisible] = useState(true);

  Put the functions to control the visible state:

	  const showModal = () => setModalVisible(true);
	  const hideModal = () => setModalVisible(false);

  Then call the `showModal()` function to display it.

  Put this component to be able to call the function:

			<QuizzItemSelectionPanel elementsData={elementsData} questionType={"Quel type de nageoire caudale ?"} visible={isModalVisible}
      		setVisible={setModalVisible}></QuizzItemSelectionPanel>
*/
const QuizzItemSelectionPanel: React.FC<QuizzItemSelectionPanelProps> = ({ elementsData, questionType, visible, setVisible }) => {
  const { theme } = useTheme();
	const globalStyles = GlobalStyles();
	const quizzStyles = QuizzStyles();

  // if dataType === "", it returns without passing data
  const handleClose = (dataType: string) => {
    setVisible(false);
    if (dataType === "")
        return;
    // pass the data to the other component
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={() => handleClose("")}>
      <View style={[globalStyles.body, {padding: 10}]}>
        <TouchableOpacity style={globalStyles.buttonBackModal} onPress={() => handleClose("")}>
          <Ionicons name="close" size={36} color={theme.searchBarBackground} />
        </TouchableOpacity>
        <Text style={[globalStyles.titleDark, globalStyles.titleModal]}>{questionType}</Text>
        <FlatList
          data={Object.entries(elementsData)}
          keyExtractor={([propertyName], index) => propertyName + index}
          numColumns={2} // for 2 elements per row
          columnWrapperStyle={{ justifyContent: 'space-between', }}
          renderItem={({ item }) => {
            const [propertyName, imageSource] = item;
            return (
                <PropertyCard
                  onPress={() => handleClose(propertyName)}
                  propertyName={propertyName}
                  imgSource={imageSource}
                />
            );
          }}
          contentContainerStyle={quizzStyles.grid}
        />
      </View>
    </Modal>
  );
};

export default QuizzItemSelectionPanel;