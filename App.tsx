// In App.js in a new project

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, Button, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import KeepAwake from 'react-native-keep-awake';
import NavigationTabs from './src/components/NavigationTabs';
import Spinner from './src/assets/icons/spinner11.svg';
import BannerAdContainer from './src/components/BannerAdContainer';
import './adConfiguration.js';

function HomeScreen() {
  return (
    <View style={{height: '100%'}}>
      <NavigationTabs />
      <BannerAdContainer />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  const [isAwake, setIsAwake] = useState(false);
  const [isUserWarnedStayAwake, setIsUserWarnedStayAwake] = useState(false);

  useEffect(() => {
    KeepAwake.deactivate();
    return () => {
      KeepAwake.deactivate();
    };
  }, []);

  function changeKeepAwake() {
    setIsAwake(!isAwake);
    if (isAwake) {
      KeepAwake.deactivate();
    } else {
      if (!isUserWarnedStayAwake) {
        setIsUserWarnedStayAwake(true);
        Alert.alert(
          'Stay Awake Warning',
          'Using the stay awake functionality on your device for extended periods of time can lead to pixel fatigue, screen burning, and battery drain. To minimize these risks, it is recommended that you use stay awake only when necessary and for short periods of time, adjust the brightness of your screen, and keep an eye on your battery level.',
        );
      }
      KeepAwake.activate();
    }
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0A0C0F',
            },
            headerTintColor: '#C6CACE',
            headerTitleStyle: {
              fontFamily: 'PermanentMarker-Regular',
            },
          }}>
          <Stack.Screen
            name="Better Evidence"
            component={HomeScreen}
            options={{
              headerRight: () => (
                <Button
                  onPress={changeKeepAwake}
                  title="Stay Awake"
                  color={isAwake ? '#FDCD83' : '#4d2149'}
                />
              ),
            }}
          />
          {/* <Stack.Screen name="Timers" component={TimersScreen} /> */}
        </Stack.Navigator>
        <KeepAwake />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
