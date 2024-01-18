import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Loading from '../Loading';

const SandBox = () => {
  return (
    <View style={{backgroundColor: '#000'}}>
      <Loading />
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
