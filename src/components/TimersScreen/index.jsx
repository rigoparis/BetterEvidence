import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import SmudgeTimer from '../SmudgeTimer';
import HuntTimer from '../HuntTimer';
import SetupTimer from '../SetupTimer';

const TimersScreen = () => {
  return (
    <ScrollView style={styles.background}>
      <View style={styles.timerContainer}>
        <SmudgeTimer />
      </View>
      <View style={styles.timerContainer}>
        <HuntTimer />
      </View>
      <View style={styles.timerContainer}>
        <SetupTimer />
      </View>
    </ScrollView>
  );
};

export default TimersScreen;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#2e2f31',
    paddingTop: 20,
    paddingBottom: 20,
  },
  timerContainer: {
    marginBottom: 20,
  },
});
