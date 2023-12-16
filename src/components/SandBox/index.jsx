import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import EdgefieldRoadMap from '../maps/EdgefieldRoadMap';
// import GestureExample from '../GestureExample'
import Pin from '../../assets/icons/pin.svg';

const SandBox = () => {
  return (
    <View style={{backgroundColor: '#000'}}>
      <EdgefieldRoadMap />
    </View>
  );
};

export default SandBox;

const styles = StyleSheet.create({
  pin: {
    position: 'absolute',
    top: 0,
    width: 40,
    height: 40,
    zIndex: 1,
  },
});
