import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { styles } from '../app/index'
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
            if (angle >= 0 && angle <= 3){
                setCondition(true,'nort')
            }else{
                setCondition(false,'nort')
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
        <View style={styles.condition}>
            <Text style={styles.title}>Brujula</Text>
            <Text>Angulo {currentAngle}</Text>

            <View>
                <Text style={styles.subTitle}>Condicion</Text>
                <Text>Ver al norte</Text>
                <Text>{conditions.nort ? 'Viendo al Norte' : 'No estas viendo al Norte'}</Text>
            </View>
        </View>
    )
}