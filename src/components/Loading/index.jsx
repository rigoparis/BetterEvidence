import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import MovingGhostIcon from '../../assets/icons/movingGhost.svg';

function Loading() {
  const [position, setPosition] = useState(0);
  const [isMovingRight, setIsMovingRight] = useState(false);

  useEffect(() => {
    const i = setInterval(() => {
      const newPosition = isMovingRight ? position - 6 : position + 6;
      if (position <= 0) {
        setIsMovingRight(false);
      } else if (position >= 100) {
        setIsMovingRight(true);
      }
      setPosition(newPosition);
    }, 1);

    return () => clearInterval(i);
  }, [position, isMovingRight]);

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        gap: 0,
      }}>
      <Text
        style={{
          color: '#446D92',
          textAlign: 'center',
          position: 'relative',
          bottom: 10,
          fontSize: RFValue(30),
          fontFamily: 'ShadowsIntoLight-Regular',
        }}>
        Loading...
      </Text>
      <View
        style={{
          height: 50,
          width: 25,
          marginLeft: 55,
        }}>
        <MovingGhostIcon
          style={{
            color: '#446D92',
            position: 'absolute',
            right: `${position}%`,
            transform: [{scaleX: isMovingRight ? 1 : -1}],
          }}
          width={RFValue(50)}
          height={RFValue(50)}
        />
      </View>
    </View>
  );
}

export default Loading;
