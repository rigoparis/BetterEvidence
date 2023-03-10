import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import React, {useState} from 'react';

import {DOTS,EMF,FINGERPRINTS,GHOSTORB,SPIRITBOX,THERMOMETER,WRITINGBOOK} from '../../assets/evidenceImages';

const EvidenceContainer = ({evidence, selected, rejected}) => {
  const images = {DOTS,EMF,FINGERPRINTS,GHOSTORB,SPIRITBOX,THERMOMETER,WRITINGBOOK}

  return (
    <View>
      <View style={[
        styles.box, 
        selected ? styles.selected:'',
        rejected ? styles.rejected:''
        ]}>
        <ImageBackground source={images[evidence.keyword]} resizeMode="cover" style={styles.image}>
          <Text style={styles.evidenceName}>{evidence.name}</Text>
        </ImageBackground>
      </View>
    </View>
  )
}

export default EvidenceContainer

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'gray',
    borderWidth: 4,
    borderRadius: 10,
  },

  selected: {
    borderColor: "#299617",
    backgroundColor: '#217812',
  },

  rejected: {
    borderColor: "#a41313",
    backgroundColor: '#830f0f',
  },

  evidenceName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
    width: '100%',
    height: 50,
    textAlign: 'center', 
    textAlignVertical: 'center'
  },

  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})