import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants'; // Import Constants

import HotelCard from './HotelCard';

const HotelDisplay = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {
      // Use Constants.manifest to get the local server's IP dynamically
      const serverIP = Constants.manifest2.extra.REACT_NATIVE_LOCAL_IP ;

      const response = await axios.get(`http://192.168.107.30:5000/hotelsDisplay`);
      if (response.data) {
        setHotels(response.data);
      }
    } catch (error) {
      console.error('Error fetching hotels', error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const renderHotelCard = ({ item }) => <HotelCard hotel={item} />;

  return (
    <View>
      <FlatList
        data={hotels}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderHotelCard}
      />
    </View>
  );
};

export default HotelDisplay;
