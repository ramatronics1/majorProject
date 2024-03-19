// HotelDisplay.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HotelDisplay = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const fetchHotels = async () => {
    try {
      const response = await axios.get('//url');
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching hotels', error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleHotelPress = (hotelId) => {
    navigation.navigate('EachHotel', { hotelId });
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleHotelPress(item._id)}>
            <View>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>{item.phone}</Text>
              <Text>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HotelDisplay;
