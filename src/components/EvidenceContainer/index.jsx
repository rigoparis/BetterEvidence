import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';

import {
  DOTS,
  EMF,
  UV,
  GHOSTORBS,
  SPIRITBOX,
  FREEZING,
  WRITINGBOOK,
} from '../../assets/evidenceImages';

const EvidenceContainer = ({evidence, selected, rejected, disabled}) => {
  const images = {DOTS, EMF, UV, GHOSTORBS, SPIRITBOX, FREEZING, WRITINGBOOK};

  return (
    <View>
      <View
        style={[
          styles.box,
          !disabled && selected ? styles.selected : '',
          !disabled && rejected ? styles.rejected : '',
          disabled ? styles.disabled : '',
        ]}>
        <Text
          style={[
            styles.evidenceName,
            !disabled && selected ? styles.selected : '',
            !disabled && rejected ? styles.rejected : '',
            disabled ? styles.disabled : '',
          ]}>
          {evidence.name}
        </Text>
        {/* <ImageBackground
          source={images[evidence.keyword]}
          resizeMode="cover"
          style={styles.image}>
          <Text style={styles.evidenceName}>{evidence.name}</Text>
        </ImageBackground> */}
      </View>
    </View>
  );
};

export default EvidenceContainer;

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#666666',
    borderWidth: 4,
    borderRadius: 10,
  },

  selected: {
    borderColor: '#299617',
    backgroundColor: '#217812',
  },

  rejected: {
    borderColor: '#a41313',
    backgroundColor: '#830f0f',
  },

  disabled: {
    borderColor: '#666',
    backgroundColor: '#999',
  },

  evidenceName: {
    color: 'white',
    fontSize: 32,
    lineHeight: 46,
    textAlign: 'center',
    backgroundColor: '#000000c0',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'ShadowsIntoLight-Regular',
    paddingVertical: 5,
  },

  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
