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
import Map from '../../../assets/maps/camp-woodwind.svg';
import Pin from '../../../assets/icons/pin.svg';

const initialWindowDimensions = Dimensions.get('window');

const PINS = {
  BARRELS: 'BARRELS',
  FOODTENT: 'FOOD TENT',
  TOILET1: 'TOILET 1',
  TOILET2: 'TOILET 2',
  TENT1: 'TENT 1',
  TENT2: 'TENT 2',
  COOLERS1: 'COOLERS BLUE TENT',
  COOLERS2: 'COOLERS WHITE TENT',
  YELLOWTENT: 'YELLOW TENT',
};

const CampWoodwindMap = () => {
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
            style={[styles.pin, {top: '71%', left: '73%'}]}
            onPress={() => handlePinPress(PINS.BARRELS)}>
            <Pin
              width={15}
              height={15}
              fill={selectedPins.includes(PINS.BARRELS) ? '#ff3333' : '#4BB543'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '53%', left: '85%'}]}
            onPress={() => handlePinPress(PINS.FOODTENT)}>
            <Pin
              width={15}
              height={15}
              fill={
                selectedPins.includes(PINS.FOODTENT) ? '#ff3333' : '#4BB543'
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '33%', left: '71%'}]}
            onPress={() => handlePinPress(PINS.TOILET1)}>
            <Pin
              width={15}
              height={15}
              fill={selectedPins.includes(PINS.TOILET1) ? '#ff3333' : '#4BB543'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '30%', left: '75%'}]}
            onPress={() => handlePinPress(PINS.TOILET2)}>
            <Pin
              width={15}
              height={15}
              fill={selectedPins.includes(PINS.TOILET2) ? '#ff3333' : '#4BB543'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '27.5%', left: '48.5%'}]}
            onPress={() => handlePinPress(PINS.TENT1)}>
            <Pin
              width={15}
              height={15}
              fill={selectedPins.includes(PINS.TENT1) ? '#ff3333' : '#4BB543'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '39%', left: '41.5%'}]}
            onPress={() => handlePinPress(PINS.TENT2)}>
            <Pin
              width={15}
              height={15}
              fill={selectedPins.includes(PINS.TENT2) ? '#ff3333' : '#4BB543'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '50%', left: '40%'}]}
            onPress={() => handlePinPress(PINS.COOLERS1)}>
            <Pin
              width={15}
              height={15}
              fill={
                selectedPins.includes(PINS.COOLERS1) ? '#ff3333' : '#4BB543'
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '75%', left: '26%'}]}
            onPress={() => handlePinPress(PINS.COOLERS2)}>
            <Pin
              width={15}
              height={15}
              fill={
                selectedPins.includes(PINS.COOLERS2) ? '#ff3333' : '#4BB543'
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pin, {top: '53%', left: '3%'}]}
            onPress={() => handlePinPress(PINS.YELLOWTENT)}>
            <Pin
              width={15}
              height={15}
              fill={
                selectedPins.includes(PINS.YELLOWTENT) ? '#ff3333' : '#4BB543'
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

export default CampWoodwindMap;
