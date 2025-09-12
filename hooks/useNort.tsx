import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { styles } from '../constants/styles'
import { Magnetometer } from 'expo-sensors'

type Prompts = {
    conditions: any,
    setCondition: (confirm: boolean, type: string) => void,
}

export default function Compass({ conditions, setCondition }: Prompts) {
    const [currentAngle, setAngle] = useState(0);

    useEffect(() => {
        const compSub = Magnetometer.addListener((magData) => {
            const { x, y } = magData;
            let angle = Math.atan2(y, x) * (180 / Math.PI);

            if (angle < 0) angle += 360;
            angle = parseFloat(angle.toFixed(2));
            setAngle(angle);
            if (angle >= 0 && angle <= 3) {
                setCondition(true, 'nort')
            } else {
                setCondition(false, 'nort')
            }
        })

        Magnetometer.setUpdateInterval(500);
        return () => {
            if (compSub) {
                compSub.remove();
            }
        }
    }, [])

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Brújula</Text>
            <Text style={styles.text}>Ángulo: {currentAngle}</Text>
            <View style={{ marginTop: 8 }}>
                <Text style={styles.subTitle}>Condición</Text>
                <Text style={styles.text}>Ver al norte</Text>
                <Text style={[styles.statusBadge, conditions.nort ? styles.statusOk : styles.statusFail]}>
                    {conditions.nort ? "Viendo al Norte" : "No estás viendo al Norte"}
                </Text>
            </View>
        </View>

    )
}