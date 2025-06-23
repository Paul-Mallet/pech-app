import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, Image, BackHandler, Linking } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useTheme } from "../components/organisms/ThemeContext.tsx";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
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
    const [state, setState] = useState(0); // 0 = photo taking, 1 = photo taken, 2 = back to fish screen
    const isFocused = useIsFocused();

    useFocusEffect(
        useCallback(() => {
            setState(0);
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (state === 0 && !photoUri) {
                    setState(2);
                    return true;
                } else if (state === 1) {
                    setState(0);
                    setPhotoUri(null);
                    return true;
                }
                return false;
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [state, photoUri])
    );

    useEffect(() => {
        if (state === 2 && !photoUri) {
            setState(0);
            navigation.navigate('Poissons');
        }
    }, [state, photoUri]);

    // === Custom Permission UI ===
    if (!permission || !permission.granted) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }]}>
                <Ionicons name="camera-outline" size={80} color={theme.textHighlightDark} />
                <Text style={styles.message}>
                    Pêch'App a besoin d'accéder à la caméra pour identifier vos poissons.
                </Text>

                <TouchableOpacity style={[styles.buttonSend, { marginBottom: 20 }]} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Donner la permission</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonClose, { marginBottom: 20 }]} onPress={() => navigation.navigate('Poissons')}>
                    <Text style={styles.buttonText}>Refuser</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openSettings()}>
                    <Text style={{ color: theme.textHighlightDark, textDecorationLine: 'underline' }}>
                        Ouvrir les réglages
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    async function takePhoto() {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({ skipProcessing: true, base64: true });
            if (!photo) return;
            const resized = await ImageManipulator.manipulateAsync(
                photo.uri,
                [{ resize: { width: 800 } }],
                { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
            );
            setPhotoUri(resized.uri);
            setState(1);
        }
    }

    const closePhotoView = () => {
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
                    return { ...fish };
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

    const resetPhoto = () => {
        setPhotoUri(null);
        setState(0);
    }

    return (
        <View style={styles.container}>
            {state === 1 && photoUri &&
                <View style={{ flex: 1 }}>
                    <Image source={{ uri: photoUri }} style={{ flex: 1 }} />
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ bottom: 60, backgroundColor: '#00000080', width: "100%", alignItems: 'center' }}>
                            <Text style={{
                                fontFamily: font.regular,
                                color: theme.textHighlightDark,
                                fontSize: 12
                            }}>
                                Les images envoyées seront utilisées à des fins de réentraînement du service d’intelligence artificielle.
                            </Text>
                        </View>
                        <View style={{ position: 'absolute', bottom: 110, gap: 40, flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.buttonSend} onPress={sendPhoto}>
                                <Text style={styles.buttonText}>Analyser</Text>
                            </TouchableOpacity>
                            <ButtonClose onPressFunction={resetPhoto} buttonText="Annuler" />
                        </View>
                    </View>
                </View>
            }

            {isFocused && state === 0 && !photoUri &&
                <CameraView style={styles.camera} ref={cameraRef}>
                    <TouchableOpacity style={styles.closeSearchButton} onPress={closePhotoView}>
                        <Ionicons name='close' size={24} color={theme.textBoldLight} />
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.takePictureButton} onPress={takePhoto}>
                            <View style={styles.button}></View>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            }
        </View>
    );
};

export default FishAICamera;
