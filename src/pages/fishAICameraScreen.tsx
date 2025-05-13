import React, { useRef, useState } from "react";
import { Text, View, Button, TouchableOpacity, Image } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useTheme } from "../components/organisms/ThemeContext.tsx";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FishAIScreenStyles from "../styles/molecules/fishAIScreenStyles.tsx";
import ButtonClose from "../components/atoms/buttonClose.tsx";
import { useCustomFishList } from "./fishScreen.tsx";
import { getCustomFishList } from "../services/fish.service.tsx";

const FishAICamera = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const styles = FishAIScreenStyles();
    const {setProbaFishes} = useCustomFishList();

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
            setPhotoUri(photo.uri);
            console.log('Photo URI:', photo.uri);
        }
    }

    const closePhotoView = () => 
    {
        setPhotoUri("");
        navigation.navigate('Poissons');
    }

    const sendPhoto = () => 
    {
        // send the photo and gets the server answer
        // display the fishes by probability order
    }

    // function that will show the custom fishes list from the answer 
    const showResults = async () =>
    {
        const customList = await getCustomFishList();
        setProbaFishes(customList);
        closePhotoView();
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