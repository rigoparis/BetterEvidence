import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';

const HuntTimer = () => {
  const [cooldownDuration, setCooldownDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [upTimerRunning, setUpTimerRunning] = useState(false);
  const [huntStatus, setHuntStatus] = useState(0); //0 - Not hunting, 1- Hunting, 2- Hunting Cooldown

  useEffect(() => {
    let countdownInterval;

    if (timerRunning) {
      countdownInterval = setInterval(() => {
        const newTimeLeft = timeLeft - 1
        setTimeLeft(newTimeLeft);
        setProgress((cooldownDuration - timeLeft + 1) / cooldownDuration);
        if (newTimeLeft === 0) setTimerRunning(false);
      }, 1000);
    } else {
      clearInterval(countdownInterval);
    }

    // cleanup function to clear interval when component unmounts or timer stops
    return () => clearInterval(countdownInterval);
  }, [timerRunning, timeLeft]);

  useEffect(() => {
    let countdownInterval;

    if (upTimerRunning) {
      countdownInterval = setInterval(() => {
        const newTimeLeft = timeLeft + 1
        setTimeLeft(newTimeLeft);
        setProgress(0);
      }, 1000);
    } else {
      clearInterval(countdownInterval);
    }

    // cleanup function to clear interval when component unmounts or timer stops
    return () => clearInterval(countdownInterval);
  }, [upTimerRunning, timeLeft]);

  useEffect(() => {
    switch (huntStatus) {
      case 0:
        setTimeLeft(0);
        setProgress(0);
        setTimerRunning(false);
        setUpTimerRunning(false);
        break;
      case 1:
        setTimeLeft(0);
        setTimerRunning(false);
        setUpTimerRunning(true);
        break;
      case 2:
        setTimeLeft(cooldownDuration);
        setTimerRunning(true);
        setUpTimerRunning(false);
        break;
      default:
        setTimeLeft(0);
        setProgress(0);
        setTimerRunning(false);
        setUpTimerRunning(false);
        break;
    }
  }, [huntStatus])
  

  const start = () => {
    setTimerRunning(true);
  }

  const reset = () => {
    setTimeLeft(duration);
    setProgress(0);
    setTimerRunning(false);
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimerPress = () => {
    if (huntStatus === 0) return setHuntStatus(1);
    if (huntStatus === 1) return setHuntStatus(2);
    if (huntStatus === 2) return setHuntStatus(0);
  }

  const getHuntStatusLabel = () => {
    if (huntStatus === 0) {
      return "Not hunting";
    } else if (huntStatus === 1) {
      return "Hunting...";
    } else {
      return "Hunt Cooldown";
    }
  }

  const getDemonColor = () => {
    if (progress >= 0.8) {
      return '#ff0e0e'
    }
    return '#C6CACE'
  }

  const getRestColor = () => {
    if (progress >= 1) {
      return '#ff0e0e'
    }
    return '#C6CACE'
  }

  const getLabels = () => {
    switch (huntStatus) {
      case 0:
        return <Text style={[styles.label]}>Make sure to know your nearest hiding spot</Text>;
        break;
      case 1:
        return <Text style={[styles.label]}>DANGER!</Text>
        break;
      case 2:
        return (
          <>
            <Text style={[styles.label, { color: getDemonColor(), left: '80%' }]}>Demon</Text>
            <Text style={[styles.label, { color: getRestColor(), right: 0 }]}>Others</Text>
          </>
        )
      default:
        break;
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => handleTimerPress()}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>Hunt</Text>
          <Text style={styles.huntStatus}>{getHuntStatusLabel()}</Text>
        </View>
        {huntStatus === 0 ? <View style={{flex:0, alignItems: 'flex-end'}}>
          <Text style={styles.touchToHunt}>Tap when hunt starts</Text>
          <Text style={styles.touchToHunt}>Double tap when crucifix is burned</Text>
        </View> : <Text style={styles.timer}>{formatTime(timeLeft)}</Text>}
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.labelContainer}>
          {getLabels()}
        </View>
        <View>
          <Progress.Bar 
          indeterminate={huntStatus === 1} 
          unfilledColor={huntStatus === 1 ? '#0A0C0F' : '#446D92'} 
          color={huntStatus === 1 ? '#ff0505' : '#0A0C0F'} 
          borderColor={huntStatus === 1 ? '#ff0505' : '#446D92'} 
          borderWidth={1} 
          progress={progress} 
          width={null} 
          height={30}
          />
          {huntStatus === 2 && <View style={[styles.mark, { backgroundColor: getDemonColor(), left: '80%' }]}></View>}
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
  huntStatus: {
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
  touchToHunt: {
    color: '#C6CACE',
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

export default HuntTimer;
