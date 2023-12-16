import {StyleSheet, Image} from 'react-native';
import React from 'react';
import Homescreen from '../Journal';
import TimersScreen from '../TimersScreen';
import MapsScreen from '../MapsScreen';
import SandBox from '../SandBox';
import Necronomicon from '../Necronomicon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Journal from '../../assets/icons/journal.svg';
import StopWatch from '../../assets/icons/stopwatch.svg';
import Map from '../../assets/icons/map.svg';
import NecronomiconIcon from '../../assets/icons/necronomicon.svg';

const NavigationTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#0A0C0F', height: '10%'},
        tabBarActiveTintColor: '#446D92',
        tabBarInactiveTintColor: '#C6CACE',
      }}>
      <Tab.Screen
        name="Journal"
        component={Homescreen}
        options={{
          tabBarLabelStyle: {fontSize: 16},
          tabBarIcon: ({color}) => (
            <Journal width={38} height={38} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Timers"
        component={TimersScreen}
        options={{
          tabBarLabelStyle: {fontSize: 16},
          tabBarIcon: ({color}) => (
            <StopWatch width={38} height={38} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Maps"
        component={MapsScreen}
        options={{
          tabBarLabelStyle: {fontSize: 16},
          tabBarIcon: ({color}) => <Map width={38} height={38} fill={color} />,
        }}
      />
      <Tab.Screen
        name="Necronomicon"
        component={Necronomicon}
        options={{
          tabBarLabelStyle: {fontSize: 16},
          tabBarIcon: ({color}) => (
            <NecronomiconIcon width={38} height={38} fill={color} />
          ),
        }}
      />
      {/* <Tab.Screen name="SandBox" component={SandBox} /> */}
    </Tab.Navigator>
  );
};

export default NavigationTabs;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 25,
    height: 25,
  },
});
