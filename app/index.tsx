import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Ubication from "@/hooks/useUbication";
import Compass from "@/hooks/useNort";
import Degree from "@/hooks/useDegree";

import { CameraView, Camera } from "expo-camera";
import { styles } from '../constants/styles'

const { width, height } = Dimensions.get("window");

export default function Index() {
  const [conditions, setCondition] = useState({ ubi: false, nort: false, degree: false });

  // Cámara
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [capturedPhoto, setPhoto] = useState<string | null>(null);
  const [photoWithDate, setPhotoWithDate] = useState<string | null>(null);
  const [openCamera, setOpenCamera] = useState(false);
  const cameraRef = useRef<any>(null);

  const updateCondition = (confirmUbication: boolean, type: string) => {
    setCondition((prev) => ({ ...prev, [type]: confirmUbication }));
  };

  const confirmCondition = () => {
    return conditions.degree && conditions.ubi && conditions.nort;
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
      setOpenCamera(false);
      setPhotoWithDate(photo.uri)
    }
  };

  if (hasPermission === null) return <Text>Solicitando permisos...</Text>;
  if (hasPermission === false) return <Text>No tienes acceso a la cámara</Text>;

  return (
    <SafeAreaView style={styles.container}>
      {openCamera ? (
        <View style={{ flex: 1 }}>
          <CameraView style={{ flex: 1 }} ref={cameraRef} />
          <Pressable style={styles.shutter} onPress={takePicture}>
            <Text style={styles.buttonText}>Tomar foto</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Componentes principales */}
          <Ubication conditions={conditions} setCondition={updateCondition} />
          <Compass conditions={conditions} setCondition={updateCondition} />
          <Degree condition={conditions} setCondition={updateCondition} />

          {/* Sección de abrir cámara */}
          <View style={styles.card}>
            <Text style={styles.title}>Abrir Cámara</Text>
            <Text style={styles.text}>
              Tienes que cumplir los 3 requisitos para poder abrir la cámara
            </Text>
            <Pressable
              style={[
                styles.button,
                confirmCondition() ? styles.buttonActive : styles.buttonInactive,
              ]}
              onPress={() => {
                if (confirmCondition()) setOpenCamera(true);
                else alert("Condiciones no cumplidas");
              }}
            >
              <Text style={styles.buttonText}>Abrir cámara</Text>
            </Pressable>
          </View>

          {/* Foto final con fecha */}
          {photoWithDate && (
            <View style={styles.card}>
              <Text style={styles.title}>Foto final</Text>
              <Image source={{ uri: photoWithDate }} style={styles.previewImage} />
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );

}
