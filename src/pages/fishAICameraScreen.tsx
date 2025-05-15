import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, View, Button, TouchableOpacity, Image, BackHandler } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useTheme } from "../components/organisms/ThemeContext.tsx";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FishAIScreenStyles from "../styles/molecules/fishAIScreenStyles.tsx";
import ButtonClose from "../components/atoms/buttonClose.tsx";
import { sendPhotoToBack } from "../services/fish.service.tsx";
import * as ImageManipulator from 'expo-image-manipulator';
import { useHistory } from "../components/organisms/HistoryContext.tsx";
import { Fish } from "../models/fish.model.tsx";

const FishAICamera = () => {
    const navigation = useNavigation();
    const { theme, font } = useTheme();
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView | null>(null);
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const styles = FishAIScreenStyles();
    const { fishes, setProbabilityFishes } = useHistory();
    const [state, setState] = useState(1);

    useFocusEffect(
        useCallback(() => {
        setState(0);
      }, [])
    );

    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
                // console.log("ici:", state, ",", photoUri);
                if (state === 0 && !photoUri)
                {
                    setState(2);
                    return true;
                }
                else if (state === 0)
                {
                    setPhotoUri(null);
                    return true;
                }
                else if (state === 1)
                {
                    setState(0);
                    return true;
                }
            return false;
          };
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
          return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [state, photoUri])
    );

    useEffect(() => {
        // console.log("State:", state);
        if (state === 2 && !photoUri)
            navigation.navigate('Poissons');
	}, [state, photoUri]);

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
            const photo = await cameraRef.current.takePictureAsync({skipProcessing: true, base64: true});
            if (!photo) return;
            const resized = await ImageManipulator.manipulateAsync(
                photo.uri,
                [{ resize: { width: 800 } }],
                { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
            );
            setPhotoUri(resized.uri);
            setState(0);
        }
    }

    const closePhotoView = () => 
    {
        setPhotoUri(null);
        setState(2);
    }

    const sendPhoto = async () => {
        if (!photoUri) return;
    
        const results = await sendPhotoToBack(photoUri);
    
        type Prediction = { className: string; probability: number };
    
        const matchedFishes: (Fish)[] = Object.values(results)
            .map(pred => {
                const typedPred = pred as Prediction;
                const fish = fishes.find(f => f.faoCode === typedPred.className);
                if (fish) {
                    fish.probability = Math.round(typedPred.probability * 100);
                    return { ...fish};
                }
                return null;
            })
            .filter((item): item is Fish & { probability: number } => item !== null)
            .sort((a, b) => b.probability - a.probability)
            .slice(0, 4);
    
        setProbabilityFishes(matchedFishes);
        setPhotoUri(null);
        setState(2);
    };

    const resetPhoto = () => 
    {
        setPhotoUri(null);
        setState(1);
    }

    return (
        <View style={styles.container}>
            {state === 0 && photoUri ? (
                <View style={{ flex: 1 }}>
                    <Image source={{ uri: photoUri }} style={{ flex: 1 }} />
                    <View style={{alignItems: 'center'}}>
                        <View style={{bottom: 60, backgroundColor: '#00000080', width: "100%", alignItems: 'center'}}>
                            <Text style={{fontFamily: font.regular, 
                                color : theme.textHighlightDark, 
                                fontSize: 12}}>Les images envoyées seront utilisées à des fins de réentraînement du service d’intelligence artificielle.
                            </Text>
                        </View>
                        <View style={{position: 'absolute', bottom: 110, gap: 40, flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.buttonSend} onPress={sendPhoto}>
                                <Text style={styles.buttonText}>Analyser</Text>
                            </TouchableOpacity>
                            <ButtonClose onPressFunction={resetPhoto} buttonText="Annuler"></ButtonClose>
                        </View>
                    </View>
                </View>
            ) : 
            (<CameraView style={styles.camera} ref={cameraRef}>
                <TouchableOpacity style={styles.closeSearchButton} onPress={closePhotoView}>
                    <Ionicons name='close' size={24} color={theme.body}/>
                </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.takePictureButton} onPress={takePhoto}>
                    <View style={styles.button}></View>
                </TouchableOpacity>
            </View>
        </CameraView>)}
        </View>
    );
};

export default FishAICamera;