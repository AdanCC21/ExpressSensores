import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Ubication, { useUbication } from '@/hooks/useUbication';
import Compass from '@/hooks/useNort';
import Degree from '@/hooks/useDegree';


const { width, height } = Dimensions.get('window');

export default function index() {
  const [openCamera, setCamera] = useState();
  const [errMsg, setMsg] = useState('');
  const [conditions, setCondition] = useState({ ubi: false, nort: false, degree: false });

  const updateCondition = (confirmUbication: boolean, type: string) => {
    setCondition(prev => ({ ...prev, [type]: confirmUbication }));
  }

  const confirmCondition = () => {
    return conditions.degree && conditions.ubi && conditions.degree
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ display: errMsg ? 'flex' : 'none' }}>{errMsg}</Text>

      <Ubication conditions={conditions} setCondition={updateCondition} />

      <Compass conditions={conditions} setCondition={updateCondition} />

      <Degree condition={conditions} setCondition={updateCondition} />

      <View>
        <Text>Tienes que cumplor los 3 para poder abrir la camara</Text>
        <Pressable
          style={{
            backgroundColor: confirmCondition() ? '#ffffff' : "#000000"
          }}
          onPress={() => { console.log("Abrir camara") }}>
          <Text>Abrir camara</Text>
        </Pressable>
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