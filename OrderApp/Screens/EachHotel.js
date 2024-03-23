import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const EachHotel = () => {
  const [data, setData] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const fetchHotel = async () => {
    try {
      const response = await axios.post(`http://192.168.1.44:5000/hotel/${id}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching hotel:', error);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, [id]);

  const handleSignUp = () => {
    // Navigate to the sign-up form for the specific hotel
    navigation.navigate('AdminSignup', { hotelId: id });
  };

  const handleLogin = () => {
    // Navigate to the login form for the specific hotel
    navigation.navigate('AdminLogin', { hotelId: id });
  };

  return (
    <View>
      <Text>Hotel Details</Text>
      {data ? (
        <View>
          {/* Hotel details */}
          <Text>Hotel ID: {data._id}</Text>
          <Text>{data.name}</Text>
          <Text>{data.description}</Text>
          <Text>{data.phone}</Text>
          <Text>{data.email}</Text>
          {data.imageUrl.map((image, imageIndex) => (
            <Image
              key={`${data._id}-image-${imageIndex}`}
              source={{ uri: image.url }}
              style={{ width: '100px', height: 'auto', marginBottom: '8px' }}
            />
          ))}
          
          {/* Admin login and signup buttons */}
          <Button title="Sign Up" onPress={handleSignUp} />
          <Button title="Login" onPress={handleLogin} />
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default EachHotel;
