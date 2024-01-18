import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as Progress from 'react-native-progress';
import {RFValue} from 'react-native-responsive-fontsize';
import Tts from 'react-native-tts';

const durations = [
  {label: '30 seconds', value: 30},
  {label: '1 minute', value: 60},
  {label: '2 minutes', value: 120},
  {label: '3 minutes', value: 180},
  {label: '4 minutes', value: 240},
  {label: '5 minutes', value: 300},
];

const SetupTimer = () => {
  const [duration, setDuration] = useState(300);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const pickerRef = useRef();

  useEffect(() => {
    let countdownInterval;

    if (timerRunning) {
      countdownInterval = setInterval(() => {
        const newTimeLeft = timeLeft - 1;
        setTimeLeft(newTimeLeft);
        setProgress((duration - timeLeft + 1) / duration);
        if (newTimeLeft === 10) Tts.speak('10 seconds until setup is done');
        if (newTimeLeft <= 5 && newTimeLeft >= 1)
          Tts.speak(newTimeLeft.toString());
        if (newTimeLeft === 0) {
          Tts.speak('Setup is done. The ghost can attack');
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

  const handleDurationChange = (value) => {
    setDuration(value);
    setTimeLeft(value);
    setProgress(0);
    pickerRef.current.blur();
  };

  function open() {
    pickerRef.current.focus();
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleTimerPress()}>
      <View style={styles.header}>
        <Text style={styles.name}>Setup</Text>
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      </View>
      <View style={styles.progressBarContainer}>
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
        </View>
      </View>
      {!timerRunning && progress === 0 && (
        <View>
          <Button title="Select Duration" onPress={() => open(true)} />
          <Picker
            ref={pickerRef}
            selectedValue={duration}
            onValueChange={handleDurationChange}
            style={styles.picker}>
            {durations.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0C0F',
    paddingHorizontal: 10,
    paddingVertical: 10,
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
  durationSelectLabel: {
    color: '#C6CACE',
  },
  timer: {
    fontSize: RFValue(26),
    color: '#C6CACE',
    fontFamily: 'ShadowsIntoLight-Regular',
  },
  picker: {
    height: 0,
    width: 0,
  },
  progressBarContainer: {
    marginBottom: 10,
  },
  labelContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    marginBottom: 12,
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
    marginRight: 10,
  },
});

export default SetupTimer;
