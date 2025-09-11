import React from 'react'
import { View, Text } from 'react-native'
import { styles } from '../app/index'

type Props = {
    conditions: any,
    setCondition: () => void,
    compassTarget: { x: any, y: any, z: any }
    setCompass: () => void
}

export default function Compass({ conditions, setCondition, compassTarget }) {
    return (
        <View style={styles.condition}>
            <Text style={styles.title}>Norte</Text>
            {compassTarget && (
                <>
                    <Text>Angulo {compassTarget}</Text>
                </>
            )}
            <View>
                <Text style={styles.subTitle}>Condicion</Text>
                <Text>Ver al norte</Text>
                <Text>{conditions.nort ? 'Viendo al Norte' : 'No estas viendo al Norte'}</Text>
            </View>
        </View>
    )
}