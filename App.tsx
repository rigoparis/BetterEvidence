// In App.js in a new project

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {View, Button, Alert, Linking} from 'react-native';
import {BannerAdSize} from 'react-native-google-mobile-ads';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {RFValue} from 'react-native-responsive-fontsize';

import KeepAwake from 'react-native-keep-awake';
import NavigationTabs from './src/components/NavigationTabs';
import HelpPage from './src/components/HelpPage';
import BannerAdContainer from './src/components/BannerAdContainer';
import InterstitialAdContainer from './src/components/InterstitialAdContainer';
import GhostInfo from './src/components/Necronomicon/GhostInfo';
import CursedPossessionsInfo from './src/components/Necronomicon/CursedPossessionsInfo';
import GearInfo from './src/components/Necronomicon/GearInfo';

import './adConfiguration.js';

const Drawer = createDrawerNavigator();

function HomeScreen() {
  const [isAwake, setIsAwake] = useState(false);
  const [isUserWarnedStayAwake, setIsUserWarnedStayAwake] = useState(false);

  useEffect(() => {
    KeepAwake.deactivate();
    return () => {
      KeepAwake.deactivate();
    };
  }, []);

  const changeKeepAwake = () => {
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
  };

  const takeToPayPal = useCallback(async () => {
    const url = 'https://www.buymeacoffee.com/rodriparisl';
    Linking.openURL(url);
  }, []);

  InterstitialAdContainer();

  return (
    <View style={{height: '100%'}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: '#000',
          paddingVertical: 10,
        }}>
        <Button
          onPress={takeToPayPal}
          fontSize={{fontSize: RFValue(22)}}
          title="Support the developer ❤️"
        />
        <Button
          onPress={changeKeepAwake}
          fontSize={{fontSize: RFValue(22)}}
          color={isAwake ? '#feebce' : '#4d2149'}
          title={`STAY AWAKE ${isAwake ? '☀️' : '🌕'}`}
        />
        {/* <TouchableOpacity
          onPress={changeKeepAwake}
          style={{
            height: 35,
            backgroundColor: isAwake ? '#feebce' : '#4d2149',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            borderRadius: 2,
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              color: isAwake ? '#333' : '#FFF',
              fontWeight: 'bold',
              fontSize: RFValue(12),
            }}>{`STAY AWAKE ${isAwake ? '☀️' : '🌕'}`}</Text>
        </TouchableOpacity> */}
      </View>
      <NavigationTabs />
      <BannerAdContainer bannerSize={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
    </View>
  );
}

function App() {
  const scenes = useMemo(() => {
    return {
      home: HomeScreen,
      ghostInfo: GhostInfo,
      gearInfo: GearInfo,
      cursedPossessionsInfo: CursedPossessionsInfo,
      help: HelpPage,
    };
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Drawer.Navigator
          detachInactiveScreens={false}
          screenOptions={{
            lazy: false,
            swipeEdgeWidth: 0,
            headerStyle: {
              backgroundColor: '#0A0C0F',
            },
            headerTintColor: '#C6CACE',
            headerTitleStyle: {
              fontFamily: 'PermanentMarker-Regular',
              fontSize: 26,
            },
            drawerContentStyle: {
              backgroundColor: '#0A0C0F',
            },
            drawerLabelStyle: {
              color: '#C6CACE',
            },
          }}>
          <Drawer.Screen
            name="Better Evidence"
            options={{
              drawerLabel: 'Journal',
            }}
            component={scenes.home}
          />
          <Drawer.Screen name="Ghosts" component={scenes.ghostInfo} />
          <Drawer.Screen
            name="Cursed Possessions"
            component={scenes.cursedPossessionsInfo}
          />
          <Drawer.Screen name="Gear" component={scenes.gearInfo} />
          <Drawer.Screen name="Help" component={scenes.help} />
        </Drawer.Navigator>
        <KeepAwake />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
