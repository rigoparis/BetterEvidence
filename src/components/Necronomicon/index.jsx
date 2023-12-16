import {StyleSheet, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import GhostInfoIcon from '../../assets/icons/ghostinfoicon.svg';
import CursedPossessionsIcon from '../../assets/icons/cursedpossessionsicon.svg';
import ItemsIcon from '../../assets/icons/itemsicon.svg';

import GhostInfo from './GhostInfo';
import CursedPossessionsInfo from './CursedPossessionsInfo';
import ItemsInfo from './ItemsInfo';

function Necronomicon() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#0A0C0F', height: '8%'},
        tabBarActiveTintColor: '#446D92',
        tabBarInactiveTintColor: '#C6CACE',
      }}>
      <Tab.Screen
        name="Ghosts"
        component={GhostInfo}
        options={{
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({color}) => (
            <GhostInfoIcon width={25} height={25} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cursed Possessions"
        component={CursedPossessionsInfo}
        options={{
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({color}) => (
            <CursedPossessionsIcon width={25} height={25} fill={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Items"
        component={ItemsInfo}
        options={{
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({color}) => (
            <ItemsIcon width={25} height={25} fill={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default Necronomicon;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 25,
    height: 25,
  },
});
