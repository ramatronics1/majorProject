import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HotelCard = ({ hotel, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <Text style={styles.description}>{hotel.description}</Text>
        {/* Add any other hotel details you want to display */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#808080',
  },
});

export default HotelCard;
