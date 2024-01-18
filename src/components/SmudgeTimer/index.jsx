import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {RFValue} from 'react-native-responsive-fontsize';
import Tts from 'react-native-tts';

const SmudgeTimer = () => {
  const [duration, setDuration] = useState(180);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );

  const updateScreenWidth = () => {
    setScreenWidth(Dimensions.get('window').width);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', updateScreenWidth);

    return () => {
      // Remove the event listener when the component unmounts
      if (Dimensions.removeEventListener)
        Dimensions.removeEventListener('change', updateScreenWidth);
    };
  }, [Dimensions]);

  useEffect(() => {
    let countdownInterval;

    if (timerRunning) {
      countdownInterval = setInterval(() => {
        const newTimeLeft = timeLeft - 1;
        setTimeLeft(newTimeLeft);
        setProgress((duration - timeLeft + 1) / duration);
        if (newTimeLeft === 130)
          Tts.speak('10 seconds until smudge fades for demons.');
        if (newTimeLeft === 120)
          Tts.speak('Smudge fades for demons. 30 seconds until next update.');
        if (newTimeLeft === 100)
          Tts.speak(
            '10 seconds until smudge fades for all ghosts, except Spirit.',
          );
        if (newTimeLeft === 90)
          Tts.speak(
            'Smudge fades for all ghosts, except Spirit. 90 seconds until next update.',
          );
        if (newTimeLeft === 10)
          Tts.speak('10 seconds until smudge fades for Spirit.');
        if (newTimeLeft === 0) {
          Tts.speak('Smudge fades for Spirit.');
          stop();
        }
      }, 1000);
    } else {
      clearInterval(countdownInterval);
    }

    // cleanup function to clear interval when component unmounts or timer stops
    return () => clearInterval(countdownInterval);
  }, [timerRunning, timeLeft]);

  const start = () => {
    setTimerRunning(true);
  };

  const stop = () => {
    setTimerRunning(false);
  };

  const reset = () => {
    setTimeLeft(duration);
    setProgress(0);
    setTimerRunning(false);
  };

  const getDemonColor = () => {
    if (progress >= 0.33) {
      return '#ff0e0e';
    }
    return '#C6CACE';
  };

  const getRestColor = () => {
    if (progress >= 0.5) {
      return '#ff0e0e';
    }
    return '#C6CACE';
  };

  const getSpiritColor = () => {
    if (progress >= 1) {
      return '#ff0e0e';
    }
    return '#C6CACE';
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleTimerPress = () => {
    if (progress === 0) return start();
    if (progress > 0 && timerRunning) return stop();
    if (progress > 0 && !timerRunning) return reset();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleTimerPress()}>
      <View style={styles.header}>
        <Text style={styles.name}>Smudge</Text>
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.labelContainer}>
          <Text style={[styles.label, {color: getDemonColor(), right: '66%'}]}>
            Demon
          </Text>
          <Text style={[styles.label, {color: getRestColor(), right: '50%'}]}>
            Others
          </Text>
          <Text style={[styles.label, {color: getSpiritColor(), right: 0}]}>
            Spirit
          </Text>
        </View>
        <View>
          <Progress.Bar
            unfilledColor={'#446D92'}
            color={'#0A0C0F'}
            borderColor={'#446D92'}
            borderWidth={1}
            progress={progress}
            width={null}
            height={30}
          />
          <View
            style={[
              styles.mark,
              {backgroundColor: getDemonColor(), right: '66%'},
            ]}></View>
          <View
            style={[
              styles.mark,
              {backgroundColor: getRestColor(), right: '50%'},
            ]}></View>
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
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    marginHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    color: '#C6CACE',
  },
  name: {
    fontSize: RFValue(22),
    color: '#C6CACE',
    fontFamily: 'PermanentMarker-Regular',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    backgroundColor: '#90EE90',
    borderRadius: 5,
  },
  timer: {
    fontSize: RFValue(26),
    color: '#C6CACE',
    fontFamily: 'ShadowsIntoLight-Regular',
  },
  progressBarContainer: {
    marginBottom: 10,
  },
  labelContainer: {
    marginBottom: 15,
    height: 15,
  },
  label: {
    fontSize: RFValue(16),
    fontFamily: 'ShadowsIntoLight-Regular',
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
    width: 2,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: -2,
  },
  controlButtonsContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
});

export default SmudgeTimer;
