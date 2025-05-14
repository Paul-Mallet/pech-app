import React, { useRef, useState } from "react";
import { Text, View, Button, TouchableOpacity, Image } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useTheme } from "../components/organisms/ThemeContext.tsx";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FishAIScreenStyles from "../styles/molecules/fishAIScreenStyles.tsx";
import ButtonClose from "../components/atoms/buttonClose.tsx";
import { useCustomFishList } from "./fishScreen.tsx";
import { getCustomFishList, sendPhotoToBack } from "../services/fish.service.tsx";
import * as ImageManipulator from 'expo-image-manipulator';
import { useHistory } from "../components/organisms/HistoryContext.tsx";

const FishAICamera = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const styles = FishAIScreenStyles();
    const {setProbaFishes} = useCustomFishList();
    const { fishes } = useHistory();

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Pech'App a besoin de votre permission pour accéder à la Caméra</Text>
                <Button onPress={requestPermission} title="Donner la permission" />
            </View>
        );
    }

    async function takePhoto() {
        if (cameraRef.current) {
            console.log("Taking photo");
            const photo = await cameraRef.current.takePictureAsync({skipProcessing: true, base64: true});
            const resized = await ImageManipulator.manipulateAsync(
                photo.uri,
                [{ resize: { width: 800 } }],
                { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
            );
            setPhotoUri(resized.uri);
        }
    }

    const closePhotoView = () => 
    {
        setPhotoUri("");
        navigation.navigate('Poissons');
    }

    const sendPhoto = async () => 
    {
        if (photoUri)
        {
            const results = await sendPhotoToBack(photoUri);
            type Prediction = { className: string; probability: number };
            const matchedFishes = Object.values(results)
                .map(pred => {
                    const typedPred = pred as Prediction;
                    const fish = fishes.find(f => f.faoCode === typedPred.className);
                    if (fish) {
                        return { id: fish.id, probability: typedPred.probability };
                    }
                    return null;
                })
                .filter(Boolean)
                .sort((a, b) => {
                    if (a && b) {
                        return b.probability - a.probability;
                    }
                    return 0;
                });

            console.log(matchedFishes);
        }
        // send the photo and gets the server answer
        // display the fishes by probability order
    }

    const resetPhoto = () => 
    {
        setPhotoUri("");
    }

    return (
        <View style={styles.container}>
            {!photoUri && <CameraView style={styles.camera} ref={cameraRef}>
                    <TouchableOpacity style={styles.closeSearchButton} onPress={closePhotoView}>
                        <Ionicons name='close' size={24} color={theme.body}/>
                    </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.takePictureButton} onPress={takePhoto}>
                        <View style={styles.button}></View>
                    </TouchableOpacity>
                </View>
            </CameraView>}
            {photoUri && (
                <View style={{ flex: 1 }}> 
                    <Image source={{ uri: photoUri }} style={{ flex: 1 }} />
                    <View style={{alignItems: 'center'}}>
                        <View style={{position: 'absolute', bottom: 80, gap: 40, flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.buttonSend} onPress={sendPhoto}>
                                <Text style={styles.buttonText}>Envoyer</Text>
                            </TouchableOpacity>
                            <ButtonClose onPressFunction={resetPhoto} buttonText="Annuler"></ButtonClose>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

export default FishAICamera;