import { DeviceMotion } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { styles } from '../app/index'

type Prompts = {
    condition: any,
    setCondition: (confirm: boolean, type: string) => void
}

export default function Degree({ condition, setCondition }: Prompts) {
    const [currentDegree, setDegree] = useState({ pitch: 0, roll: 0, yaw: 0 });

    useEffect(() => {
        const angSub = DeviceMotion.addListener((motion) => {
            if (motion.rotation) {
                // Rotacion : {alpha, beta, gammes} en radianes
                // Beta : inclinacion hacia adelante (pitch), gamma lateral (roll), alpha giro alrededor del eje vertical (yall)
                const { beta, gamma, alpha } = motion.rotation;

                // Convertir a grados
                let grados = beta * (180 / Math.PI);
                setDegree({
                    pitch: grados,
                    roll: gamma * (180 / Math.PI),
                    yaw: alpha * (180 / Math.PI)
                })
                if (grados > 0 && grados <= 3) {
                    setCondition(true, "degree");
                } else {
                    setCondition(false, "degree");
                }
            }
        })

        DeviceMotion.setUpdateInterval(500);
        return () => { if (angSub) { angSub.remove() } };
    })

    return (
        <View style={styles.condition}>
            <Text style={styles.title}>Angulo</Text>
            {currentDegree && (
                <>
                    <Text>y : {currentDegree.pitch}</Text>
                    <Text>x : {currentDegree.roll}</Text>
                    <Text>rotacion : {currentDegree.yaw}</Text>
                </>
            )}
            <Text style={styles.subTitle}>Condicion</Text>
            <Text>entre 0 y 3 grados Y</Text>
            <Text>
                {condition.degree ? 'Se cumple' : 'No se cumple'}
            </Text>
        </View>
    )
}