import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Location from 'expo-location';
import { Magnetometer, DeviceMotion } from 'expo-sensors';
import Ubication, { useUbication } from '@/hooks/useUbication';


const { width, height } = Dimensions.get('window');

export default function index() {
  const [ubiPerm, setUbiPer] = useState(false);
  const [openCamera, setCamera] = useState();
  const [errMsg, setMsg] = useState('');
  const [conditions, setCondition] = useState({ ubi: false, nort: false, degree: false });

  // Uni
  const [location, setLocation] = useState<any>();
  // Norte
  const [buData, setBuData] = useState({ x: 0, y: 0, z: 0 })
  const [buAngle, setAngle] = useState(0);
  // Angulo del celular
  const [angRotation, setRotation] = useState({ pitch: 0, roll: 0, yaw: 0 });

  const setUbiCondition = (confirmUbication: boolean) => {
    setCondition(prev => ({ ...prev, ubi: confirmUbication }));
  }
  // Ubicacion
  useEffect(() => {
    (async () => {
      // Brujula
      const bruSub = Magnetometer.addListener((magData) => {
        setBuData(magData);

        const { x, y } = magData;
        // De radianes a grados
        let angle = Math.atan2(y, x) * (180 / Math.PI);
        if (angle < 0) angle += 360;
        angle = parseFloat(angle.toFixed(2));
        setAngle(angle);

        if (angle <= 1.9) {
          setCondition(prev => ({ ...prev, nort: true }))
        } else {
          setCondition(prev => ({ ...prev, nort: false }))
        }
      })

      Magnetometer.setUpdateInterval(500)

      // Angulo
      const angSub = DeviceMotion.addListener((motion) => {
        if (motion.rotation) {
          // Rotacion : {alpha, beta, gammes} en radianes
          const { beta, gamma, alpha } = motion.rotation;
          // Beta : inclinacion hacia adelante (pitch), gamma lateral (roll), alpha giro alrededor del eje vertical (yall)

          // Convertir a grados
          setRotation({
            pitch: beta * (180 / Math.PI),
            roll: gamma * (180 / Math.PI),
            yaw: alpha * (180 / Math.PI)
          })
        }
      })

      DeviceMotion.setUpdateInterval(500);
      return () => { bruSub.remove(), angSub.remove() };
    })();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ display: errMsg ? 'flex' : 'none' }}>{errMsg}</Text>

      <Ubication conditions={conditions} setCondition={setUbiCondition}/>

      


      <View style={styles.condition}>
        <Text style={styles.title}>Angulo</Text>
        {angRotation && (
          <>
            <Text>y : {angRotation.pitch}</Text>
            <Text>x : {angRotation.roll}</Text>
            <Text>rotacion : {angRotation.yaw}</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  condition: {
    width: width * .9,
    marginHorizontal: 'auto',
    marginBottom: 10
  },
  title: {
    fontSize: 32
  },
  subTitle: {
    fontSize: 20
  }
})