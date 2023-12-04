import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './Screens/Welcome.js';
import LoginPage from './Screens/Loginscreen.js';
import SignupPage from './Screens/SignUp.js';
import HomeScreen from './Screens/Home.js';
import UploadScreen from './Screens/UploadScreen.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
         <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} /> 
        <Stack.Screen name="UploadScreen" component={UploadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
