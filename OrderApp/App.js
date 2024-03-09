import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './Screens/Welcome.js';
import HotelDisplay from './Screens/HotelDisplay.js';
import AdminLogin from './Screens/AdminLogin.js';
import Constants from 'expo-constants';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    console.log('Constants.manifest:', Constants.manifest2);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="HotelDisplay" component={HotelDisplay} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
