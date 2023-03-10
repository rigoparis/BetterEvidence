// In App.js in a new project

import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationTabs from './src/components/NavigationTabs';
import Spinner from './src/assets/icons/spinner11.svg';

// function HomeScreen1() {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0A0C0F',
          },
          headerTintColor: '#C6CACE',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Better Evidence"
          component={NavigationTabs}
          options={{
            headerRight: () => (
              <Spinner width={20} height={20} fill="#C6CACE" />
            ),
          }}
        />
        {/* <Stack.Screen name="Timers" component={TimersScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
