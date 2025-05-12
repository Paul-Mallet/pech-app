import React, { useRef, useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useTheme } from "../components/organisms/ThemeContext.tsx";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FishAICamera = () => {
    const navigation = useNavigation();
    const { theme, font } = useTheme();
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const cameraRef = useRef<Camera>(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [facing, setFacing] = useState<'back' | 'front'>('back');
    const device = useCameraDevice(facing);

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
    }, []);

    async function takePhoto() {
        if (cameraRef.current) {
            console.log("Taking photo");
            const photo = await cameraRef.current.takePhoto({
                flash: 'off', 
                qualityPrioritization: 'balanced',
            });
            setPhotoUri('file://' + photo.path);
            console.log('Photo Path:', photo.path);
        }
    }

    function toggleCameraFacing() {
        setFacing(facing === 'back' ? 'front' : 'back');
    }

    const closePhotoView = () => {
        setPhotoUri("");
        navigation.navigate('Poissons');
    };

    const sendPhoto = () => {
        // send the photo
    };

    const resetPhoto = () => {
        setPhotoUri("");
    };

    if (!hasPermission || !device) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Pech'App a besoin de votre permission pour accéder à la Caméra</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {!photoUri && (
                <Camera
                    ref={cameraRef}
                    style={styles.camera}
                    device={device}
                    isActive={true}
                    photo={true}
                >
                    <TouchableOpacity style={[styles.closeSearchButton, { borderColor: theme.textHighlightDark, backgroundColor: theme.body }]} onPress={closePhotoView}>
                        <Ionicons name='close' size={24} color={theme.textHighlightDark}/>
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'flex-end',
                                borderRadius: 40,
                                backgroundColor: 'transparent',
                                borderWidth: 3,
                                borderColor: theme.textHighlightDark,
                                width: 80,
                                height: 80
                            }}
                            onPress={takePhoto}>
                            <View style={[styles.button, { backgroundColor: theme.textHighlightDark }]} />
                        </TouchableOpacity>
                    </View>
                </Camera>
            )}
            {photoUri && (
                <View style={{ flex: 1 }}>
                    <Image source={{ uri: photoUri }} style={{ flex: 1 }} />
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ position: 'absolute', bottom: 80, gap: 6 }}>
                            <TouchableOpacity style={{ borderRadius: 8, backgroundColor: theme.body, padding: 6, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: theme.textHighlightDark }} onPress={sendPhoto}>
                                <Text style={{ fontFamily: font.bold, fontSize: 16, fontWeight: 'bold', color: theme.textHighlightDark }}>Envoyer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ borderRadius: 8, backgroundColor: theme.body, padding: 6, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: theme.textHighlightDark }} onPress={resetPhoto}>
                                <Text style={{ fontFamily: font.bold, fontSize: 16, fontWeight: 'bold', color: theme.textHighlightDark }}>Annuler</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        bottom: 80,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 32,
        width: 64,
        height: 64
    },
    closeSearchButton: {
        alignSelf: 'flex-end',
        top: 50,
        right: 10,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 20,
        padding: 4,
    }
});

export default FishAICamera;
