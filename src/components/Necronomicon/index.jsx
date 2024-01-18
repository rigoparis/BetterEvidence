import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RFValue} from 'react-native-responsive-fontsize';
import {BannerAdSize} from 'react-native-google-mobile-ads';

import GhostInfoIcon from '../../assets/icons/ghostinfoicon.svg';
import CursedPossessionsIcon from '../../assets/icons/cursedpossessionsicon.svg';
import ItemsIcon from '../../assets/icons/itemsicon.svg';

import GhostInfo from './GhostInfo';
import CursedPossessionsInfo from './CursedPossessionsInfo';
import GearInfo from './GearInfo';
import BannerAdContainer from '../BannerAdContainer';

function Necronomicon() {
  const Tab = createBottomTabNavigator();
  return (
    <View style={{height: '100%'}}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0A0C0F',
            paddingVertical: 5,
          },
          tabBarActiveTintColor: '#446D92',
          tabBarInactiveTintColor: '#C6CACE',
        }}>
        <Tab.Screen
          name="Ghosts"
          component={GhostInfo}
          options={{
            tabBarLabelStyle: {fontSize: RFValue(12)},
            tabBarIcon: ({color}) => (
              <GhostInfoIcon width={'100%'} height={'100%'} fill={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Cursed Possessions"
          component={CursedPossessionsInfo}
          options={{
            tabBarLabelStyle: {fontSize: RFValue(12)},
            tabBarIcon: ({color}) => (
              <CursedPossessionsIcon
                width={'100%'}
                height={'100%'}
                fill={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Equipment"
          component={GearInfo}
          options={{
            tabBarLabelStyle: {fontSize: RFValue(12)},
            tabBarIcon: ({color}) => (
              <ItemsIcon width={'100%'} height={'100%'} fill={color} />
            ),
          }}
        />
      </Tab.Navigator>
      <BannerAdContainer bannerSize={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
    </View>
  );
}

export default Necronomicon;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 25,
    height: 25,
  },
});
