import { StyleSheet, Image } from 'react-native'
import React from 'react'
import Homescreen from '../Journal'
import TimersScreen from '../TimersScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {SPIRITBOX} from '../../assets/evidenceImages';
import StopWatch from '../../assets/icons/stopwatch.svg'

const NavigationTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ 
      headerShown: false,
      tabBarStyle: { backgroundColor: '#0A0C0F' },
      tabBarActiveTintColor: '#446D92',
      tabBarInactiveTintColor: '#C6CACE' 
      }}>
      <Tab.Screen name="Journal" component={Homescreen} options={{
        tabBarIcon: ({color}) => (
          <Image style={[styles.tinyLogo, {tintColor:color}]} source={SPIRITBOX}/>
        )
      }}/>
      <Tab.Screen name="Timers" component={TimersScreen} options={{
        tabBarIcon: ({color}) => (
          <StopWatch width={25} height={25} fill={color} src={SPIRITBOX}/>
        )
      }}/>
    </Tab.Navigator>
  )
}

export default NavigationTabs

const styles = StyleSheet.create({
  tinyLogo: {
    width: 25,
    height: 25,
  },
})