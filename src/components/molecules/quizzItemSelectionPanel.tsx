import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Modal, TouchableOpacity, ScrollView } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import PropertyCard from './propertyCard.tsx';
import Colors from '../../styles/base/colors.tsx';
import { Ionicons } from '@expo/vector-icons';

interface QuizzItemSelectionPanelProps {
    elementsData: Record<string, string>;
    questionType: string;
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

  // if dataType === "", it returns without passing data
  const handleClose = (dataType: string) => {
    setVisible(false);
    if (dataType === "")
        return;
    // pass the data to the other component
  };

  return (
    <Modal style={styles.container} visible={visible} animationType="slide" onRequestClose={() => handleClose("")}>
      <TouchableOpacity style={GlobalStyles.buttonBackModal} onPress={() => handleClose("")}>
        <Ionicons name="close" size={36} color={Colors.searchBarBackground} />
      </TouchableOpacity>
      <Text style={[GlobalStyles.titleDark, GlobalStyles.titleModal]}>{questionType}</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {Object.entries(elementsData).map(([propertyName, imageSource], index) => (
          <View key={index} style={styles.element}>
            <PropertyCard onPress={() => handleClose(propertyName)} propertyName={propertyName} imgSource={imageSource}/>
          </View>
        ))}
      </ScrollView>
  </Modal>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.body,
      },
      grid: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      element: {
        width: '48%',
        marginBottom: 10,
      },
  });

export default QuizzItemSelectionPanel;