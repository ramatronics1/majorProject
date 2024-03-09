import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import axios from 'axios';


const AdminLogin = ({ route, navigation }) => {
  const { hotel } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Replace 'YOUR_SERVER_URL' with the actual URL of your server
      const response = await axios.post('http://192.168.107.30:5000/adminLogin', {
        email,
        password,
        id: hotel._id,
      });

      if (response.data.success) {
        console.log('Login successful');
        // Navigate to the next screen or perform further actions upon successful login
        // For example, you can navigate to a Dashboard screen:
        // navigation.navigate('Dashboard');
      } else {
        console.log('Login failed:', response.data.message);
        // Handle login failure, show an error message, etc.
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Handle the error, show an error message, etc.
    }
  };

  return (
    <View style={styles.container}>
     <Image source={require('../symbol.png')} style={styles.logoImage} />
      <Text style={styles.logoText}>Admin Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {/* {message !== '' && <Text style={styles.messageText}>{message}</Text>} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b', // Primary Color
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white', // Secondary Color
    marginBottom: 30,
  },
  inputContainer: {
    width: '80%',
    backgroundColor: '#808080',
    borderRadius: 10,
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#BDBDBD', // Input Border Color
    backgroundColor: '#FFFFFF', // Input Background Color
    color: '#000000', // Input Text Color
  },
  button: {
    backgroundColor: '#ffa31a', // Accent Color
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageText: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  logoImage: {
    width: 200, // Adjust the width as per your preference
    height: 200, // Adjust the height as per your preference
    marginBottom: 10,
    borderRadius:1200,
  },
});

export default AdminLogin;