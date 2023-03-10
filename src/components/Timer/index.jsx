import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Timer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [displaySeconds, setDisplaySeconds] = useState(seconds % 60);
  const [displayMinutes, setDisplayMinutes] = useState(Math.floor(seconds / 60));

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => {
        if (seconds <= 0) {
          clearInterval(interval);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplaySeconds(seconds % 60);
    setDisplayMinutes(Math.floor(seconds / 60));
  }, [seconds]);

  const padNumber = number => (number < 10 ? `0${number}` : number);

  return (
    <View>
      <Text style={styles.timer}>
        {padNumber(displayMinutes)}:{padNumber(displaySeconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    fontFamily: 'VT323-Regular',
    fontSize: 20,
    color: 'black',
    borderRadius: 10,
  },
});

export default Timer;
