import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';

const SmudgeTimer = () => {
  const [duration, setDuration] = useState(180)
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let countdownInterval;

    if (timerRunning) {
      countdownInterval = setInterval(() => {
        const newTimeLeft = timeLeft - 1
        setTimeLeft(newTimeLeft);
        setProgress((duration - timeLeft + 1) / duration);
        if (newTimeLeft === 0) stop();
      }, 1000);
    } else {
      clearInterval(countdownInterval);
    }

    // cleanup function to clear interval when component unmounts or timer stops
    return () => clearInterval(countdownInterval);
  }, [timerRunning, timeLeft]);

  const start = () => {
    setTimerRunning(true);
  }

  const stop = () => {
    setTimerRunning(false);
  }

  const reset = () => {
    setTimeLeft(duration);
    setProgress(0);
    setTimerRunning(false);
  }

  const getDemonColor = () => {
    if (progress >= 0.33) {
      return '#ff0e0e'
    }
    return '#C6CACE'
  }

  const getRestColor = () => {
    if (progress >= 0.50) {
      return '#ff0e0e'
    }
    return '#C6CACE'
  }

  const getSpiritColor = () => {
    if (progress >= 1) {
      return '#ff0e0e'
    }
    return '#C6CACE'
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimerPress = () => {
    if (progress === 0) return start();
    if (progress > 0 && timerRunning) return stop();
    if (progress > 0 && !timerRunning) return reset();
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => handleTimerPress()}>
      <View style={styles.header}>
        <Text style={styles.name}>Smudge</Text>
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: getDemonColor(), left: '28%' }]}>Demon</Text>
          <Text style={[styles.label, { color: getRestColor(), left: '45%' }]}>Others</Text>
          <Text style={[styles.label, { color: getSpiritColor(), left: '92%' }]}>Spirit</Text>
        </View>
        <View>
          <Progress.Bar unfilledColor={'#446D92'} color={'#0A0C0F'} borderColor={'#446D92'} borderWidth={1} progress={progress} width={null} height={30}/>
          {/* {renderLines()} */}
          {/* <View style={[styles.mark, { left: '25%' }]}></View>
          <View style={[styles.mark, { left: '50%' }]}></View>
          <View style={[styles.mark, { left: '75%' }]}></View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0C0F',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    marginHorizontal: 5
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    color: '#C6CACE',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#C6CACE'
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    backgroundColor: '#90EE90',
    borderRadius: 5,
  },
  timer: {
    fontSize: 30,
    color: '#C6CACE',
    fontFamily: 'VT323-Regular'
  },
  progressBarContainer: {
    marginBottom: 10,
  },
  labelContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    marginBottom: 5,
    height: 15,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#C6CACE',
    position: 'absolute',
    top: 0,
  },
  progress: {
    height: '100%',
  },
  mark: {
    position: 'absolute',
    top: 0,
    width: 4,
    height: '100%',
    backgroundColor: '#0A0C0F',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: -2,
  },
  controlButtonsContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10
  }
});

export default SmudgeTimer;
