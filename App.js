import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AlbumsScreen from './src/screens/Onboarding/AlbumsScreen';
import FormScreen from './src/screens/Onboarding/FormScreen';
import SignUpScreen from './src/screens/Onboarding/signup';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer screenOptions={{ headerShown: false }}>
      <Stack.Navigator initialRouteName="FormScreen"screenOptions={{ headerShown: false }} >
        <Stack.Screen
          name="FormScreen"
          component={FormScreen}
          options={{ title: 'Form Screen' }}
        />
        <Stack.Screen
        screenOptions={{ headerShown: false }}
          name="AlbumsScreen"
          component={AlbumsScreen}
          options={{ title: 'Albums Screen' }}
        />
           <Stack.Screen
        screenOptions={{ headerShown: false }}
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ title: 'Albums Screen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
