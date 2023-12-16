import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Map from '../../../assets/maps/10-ridgeview-court.svg';
import Pin from '../../../assets/icons/pin.svg';

const initialWindowDimensions = Dimensions.get('window');

const PINS = {
  LIVING_ROOM: 'LIVING ROOM',
  GARAGE1: 'GARAGE 1',
  GARAGE2: 'GARAGE 2',
  MBCLOSET: 'MASTER BEDROOM CLOSET',
  FRIDGE: 'FRIDGE',
  HALLWAYCLOSET1: 'HALLWAY CLOSET 1',
  HALLWAYCLOSET2: 'HALLWAY CLOSET 2',
  BBCLOSET: 'BOYS BEDROOM CLOSET',
  BASEMENTCLOSET: 'BASEMENT CLOSET',
  HALLWAYCLOSET3: 'HALLWAY CLOSET 3',
};

const RidgeviewCourtMap = () => {
  const offset = useSharedValue({x: 0, y: 0});
  const start = useSharedValue({x: 0, y: 0});
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const [selectedPins, setSelectedPins] = useState([]);
  const [isPinSelected, setIsPinSelected] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(
    initialWindowDimensions,
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setWindowDimensions(window);
    });
    return () => subscription?.remove();
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: offset.value.x},
        {translateY: offset.value.y},
        {scale: scale.value},
      ],
    };
  });

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate((e) => {
      const newX = e.translationX + start.value.x;
      const newY = e.translationY + start.value.y;
      const maxX = ((scale.value - 1) * windowDimensions.width) / 2; // maximum x offset based on scale
      const minX = -maxX; // minimum x offset
      const maxY = ((scale.value - 1) * windowDimensions.height) / 7; // maximum y offset based on scale
      const minY = -maxY; // minimum y offset
      const finalX = 0.0;
      const finalY = 0.0;

      // restrict movement within the screen dimensions
      if (newX > maxX) {
        finalX = maxX;
      } else if (newX < minX) {
        finalX = minX;
      } else {
        finalX = newX;
      }

      if (newY > maxY) {
        finalY = maxY;
      } else if (newY < minY) {
        finalY = minY;
      } else {
        finalY = newY;
      }

      offset.value = {
        x: finalX,
        y: finalY,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const zoomGesture = Gesture.Pinch()
    .onUpdate((event) => {
      const newScale = savedScale.value * event.scale;
      if (newScale >= 1 && newScale <= 4) {
        scale.value = newScale;
      }
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const composed = Gesture.Simultaneous(dragGesture, zoomGesture);

  const handlePinPress = (location) => {
    const clone = [...selectedPins];
    if (selectedPins.includes(location)) {
      clone.splice(clone.indexOf(location), 1);
    } else {
      clone.push(location);
    }
    setSelectedPins(clone);
  };

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={animatedStyles}>
        <View style={[styles.container]}>
          <Map style={styles.map} width="100%" height="100%"></Map>
          <TouchableOpacity
            style={[styles.pin, {top: '75%', left: '50%'}]}
            onPress={() => handlePinPress(PINS.LIVING_ROOM)}>
            <Pin
              width={15}
              height={15}
              fill={
                selectedPins.includes(PINS.LIVING_ROOM) ? '#ff3333' : '#4BB543'
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '54.4%', left: '32.5%'}]}
            onPress={() => handlePinPress(PINS.GARAGE1)}>
            <Pin
              width={15}
              height={15}
              fill={selectedPins.includes(PINS.GARAGE1) ? '#ff3333' : '#4BB543'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '33%', left: '38.8%'}]}
            onPress={() => handlePinPress(PINS.GARAGE2)}>
            <Pin
              width={15}
              height={15}
              fill={selectedPins.includes(PINS.GARAGE2) ? '#ff3333' : '#4BB543'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '71%', left: '95%'}]}
            onPress={() => handlePinPress(PINS.MBCLOSET)}>
            <Pin
              width={15}
              height={15}
              fill={
                selectedPins.includes(PINS.MBCLOSET) ? '#ff3333' : '#4BB543'
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '57%', left: '70.5%'}]}
            onPress={() => handlePinPress(PINS.FRIDGE)}>
            <Pin
              width={15}
              height={15}
              fill={selectedPins.includes(PINS.FRIDGE) ? '#ff3333' : '#4BB543'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '41%', left: '71.2%'}]}
            onPress={() => handlePinPress(PINS.HALLWAYCLOSET1)}>
            <Pin
              width={15}
              height={15}
              fill={
                selectedPins.includes(PINS.HALLWAYCLOSET1)
                  ? '#ff3333'
                  : '#4BB543'
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '32%', left: '62.7%'}]}
            onPress={() => handlePinPress(PINS.HALLWAYCLOSET2)}>
            <Pin
              width={15}
              height={15}
              fill={
                selectedPins.includes(PINS.HALLWAYCLOSET2)
                  ? '#ff3333'
                  : '#4BB543'
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '28.5%', left: '67.1%'}]}
            onPress={() => handlePinPress(PINS.BBCLOSET)}>
            <Pin
              width={15}
              height={15}
              fill={
                selectedPins.includes(PINS.BBCLOSET) ? '#ff3333' : '#4BB543'
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '47.2%', left: '23.5%'}]}
            onPress={() => handlePinPress(PINS.BASEMENTCLOSET)}>
            <Pin
              width={15}
              height={15}
              fill={
                selectedPins.includes(PINS.BASEMENTCLOSET)
                  ? '#ff3333'
                  : '#4BB543'
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '17%', left: '58.5%'}]}
            onPress={() => handlePinPress(PINS.HALLWAYCLOSET3)}>
            <Pin
              width={15}
              height={15}
              fill={
                selectedPins.includes(PINS.HALLWAYCLOSET3)
                  ? '#ff3333'
                  : '#4BB543'
              }
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // backgroundColor: '#000',
    width: '100%',
    height: '100%',
  },
  svgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pin: {
    position: 'absolute',
    width: 30,
    height: 30,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default RidgeviewCourtMap;
