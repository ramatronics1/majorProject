import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './Screens/Welcome.js';
import LoginPage from './Screens/Loginscreen.js';
import SignupPage from './Screens/SignUp.js';
import HomeScreen from './Screens/Home.js';
import UploadScreen from './Screens/UploadScreen.js';
import DisplayDishes from './Screens/DisplayDishes.js';
import EditDishScreen from './Screens/EditDishScreen.js';
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
        <Stack.Screen name="DisplayDishes" component={DisplayDishes} />
        <Stack.Screen name="EditDishScreen" component={EditDishScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
