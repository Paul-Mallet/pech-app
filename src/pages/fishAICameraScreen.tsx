import React, { useEffect, useRef, useState } from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet, Image } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useTheme } from "../components/organisms/ThemeContext.tsx";

const FishAICamera = ({ navigation }: any) => {
    const { theme } = useTheme();
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [photoUri, setPhotoUri] = useState<string | null>(null);

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
        const photo = await cameraRef.current.takePictureAsync();
        setPhotoUri(photo.uri);
        console.log('Photo URI:', photo.uri);
        }
    }

    return (
        <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', borderRadius: '50%', backgroundColor: 'transparent', borderWidth: 3, borderColor: theme.textHighlightDark, width: 80, height: 80}} onPress={takePhoto}>
                <View style={[styles.button, {backgroundColor: theme.textHighlightDark}]}></View>
            </TouchableOpacity>
            </View>
        </CameraView>
        {photoUri && (
            <Image source={{ uri: photoUri }} style={{ position: 'absolute', bottom: 80, right: 0, width: 100, height: 100, marginTop: 10 }} />
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
    borderRadius: '50%',
    width: 64,
    height: 64
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FishAICamera;
