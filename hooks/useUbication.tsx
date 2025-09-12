import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { styles } from '../app/index'
import * as Location from 'expo-location';

type Props = {
    conditions: any
    setCondition: (confirm: boolean, type:string) => void
}


export default function Ubication({ conditions, setCondition }: Props) {
    const [location, setLocation] = useState<any>(null);

    useEffect(() => {
        let subscription: Location.LocationSubscription | null = null;

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 1,
                },
                (loc) => {
                    setLocation(loc.coords);

                    const insideRang = useUbication(loc.coords);
                    setCondition(insideRang,"ubi");
                }
            );
        })();

        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, []);

    return (
        <View style={styles.condition}>
            <Text style={styles.title}>Ubicacion</Text>
            {location && (
                <>
                    <Text>Latitud : {location.latitude}</Text>
                    <Text>Longitud : {location.longitude}</Text>
                </>
            )}
            <View style={{ marginVertical: 10 }}>
                <Text style={styles.subTitle}>Condicion</Text>
                <Text>Latitud : 31.8650923</Text>
                <Text>Longitud : -116.6657887</Text>
            </View>

            <Text>{conditions.ubi ? 'Listo' : 'Fuera de rango'}</Text>
        </View>
    )
}

export function useUbication(location: any) {
    console.log(location);
    let distance = getDistanceFromLatLonInM(location.latitude, location.longitude, 31.8650923, -116.6657887);
    return distance <= 50 ? true : false
}

function getDistanceFromLatLonInM(lat1: any, lon1: any, lat2: any, lon2: any) {
    const R = 6371e3; // Radio de la tierra en metros
    const toRad = (deg: any) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distancia en metros
}
