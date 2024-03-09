import React from 'react';
import { View, Text } from 'react-native';

const AdminLogin = ({ route }) => {
  const { hotelId } = route.params;

  // Add your admin login form here

  return (
    <View>
      <Text>Admin Login Form for Hotel ID: {hotelId}</Text>
      {/* Add your form components and logic here */}
    </View>
  );
};

export default AdminLogin;
