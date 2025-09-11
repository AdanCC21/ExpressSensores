import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Location from 'expo-location';
import { Magnetometer, DeviceMotion } from 'expo-sensors';


const { width, height } = Dimensions.get('window');

export default function index() {
  const [ubiPerm, setUbiPer] = useState(false);
  const [openCamera, setCamera] = useState();
  const [errMsg, setMsg] = useState('');

  // Uni
  const [location, setLocation] = useState<any>();
  // Norte
  const [buData, setBuData] = useState({ x: 0, y: 0, z: 0 })
  const [buAngle, setAngle] = useState(0);
  // Angulo del celular
  const [angRotation, setRotation] = useState({ pitch: 0, roll: 0, yaw: 0 });

  // Ubicacion
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setMsg("Error, permiso no otorgad");
        return;
      }
      setUbiPer(true)

      const ubiSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 0,
          distanceInterval: 0,
        },
        (loc) => {
          setLocation(loc.coords);
        })

      // Brujula
      const bruSub = Magnetometer.addListener((magData) => {
        setBuData(magData);

        const { x, y } = magData;
        // De radianes a grados
        let angle = Math.atan2(y, x) * (180 / Math.PI);
        if (angle < 0) angle += 360;
        setAngle(angle);
      })

      Magnetometer.setUpdateInterval(1000)

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
      return () => { ubiSubscription.remove(); bruSub.remove(), angSub.remove() };
    })();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ display: errMsg ? 'flex' : 'none' }}>{errMsg}</Text>

      <View style={styles.condition}>
        <Text style={styles.title}>Ubicacion</Text>
        {location && (
          <>
            <Text>Latitud : {location.latitude}</Text>
            <Text>Longitud : {location.longitude}</Text>
          </>
        )}
      </View>
      <View style={styles.condition}>
        <Text style={styles.title}>Norte</Text>
        {buData && (
          <>
            <Text>Angulo {buAngle}</Text>
          </>
        )}
      </View>
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

const styles = StyleSheet.create({
  condition: {
    width: width * .9,
    marginHorizontal: 'auto',
    marginBottom: 10
  },
  title: {
    fontSize: 32
  }
})