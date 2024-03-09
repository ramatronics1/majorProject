import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HotelCard = ({ hotel }) => {
  const navigation = useNavigation();
  const firstImage = hotel.imageUrl.length > 0 ? hotel.imageUrl[0].url : null;

  const handlePress = () => {
    // Navigate to the AdminLogin screen with the hotel details
    navigation.navigate('AdminLogin', { hotel });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
      <View style={styles.card}>
        {firstImage && (
          <Image source={{ uri: firstImage }} style={styles.hotelImage} />
        )}
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <Text style={styles.description}>{hotel.description}</Text>
        <Text style={styles.phone}>{hotel.phone}</Text>
        <Text style={styles.email}>{hotel.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  card: {
    padding: 20,
    backgroundColor: '#808080',
    borderRadius: 10,
    elevation: 5,
  },
  hotelImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffa31a', // Primary Color
  },
  description: {
    fontSize: 14,
    color: '#FFFFFF', // Text Color
    marginBottom: 5,
  },
  phone: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default HotelCard;
