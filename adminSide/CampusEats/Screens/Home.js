import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleUpdateMenu = () => {
    // Add logic for handling "Update Menu" button press
    console.log('Update Menu button pressed');
    navigation.navigate('UploadScreen');
  };

  const handleOrderList = () => {
    // Add logic for handling "Order List" button press
    console.log('Order List button pressed');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../symbol.png')} style={styles.logoImage} />
      <Text style={styles.logoText}></Text>
      <Text style={styles.signUpText}>CampusEats</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdateMenu}>
          <Text style={styles.buttonText}>Update Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.orderButton]} onPress={handleOrderList}>
          <Text style={styles.buttonText}>Order List</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>© 2023 CampusEats. All rights reserved.</Text>
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
  logoImage: {
    width: 150, // Adjust the width as per your preference
    height: 150, // Adjust the height as per your preference
    marginBottom: 10,
    borderRadius: 1200,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Secondary Color
    marginBottom: 30,
  },
  signUpText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    color: 'white', // Secondary Color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    flex: 1,
    backgroundColor: '#ffa31a', // Accent Color
    padding: 15,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: '#ffa31a', // Customize as needed
  },
  orderButton: {
    backgroundColor: '#ffa31a', // Customize as needed
  },
  footerText: {
    marginTop: 20,
    fontSize: 12,
    color: '#808080',
  },
});

export default HomeScreen;
