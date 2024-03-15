import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const OrderCard = ({ dishId, quantity, specialInstructions, onAccept, onReject }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: dishId.imageUrl }} style={styles.image} />
      <Text style={styles.text}>Name: {dishId.name}</Text>
      <Text style={styles.text}>Price: ${dishId.price}</Text>
      <Text style={styles.text}>Quantity: {quantity}</Text>
      <Text style={styles.text}>Special Instructions: {specialInstructions}</Text>
      <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rejectButton} onPress={onReject}>
        <Text style={styles.buttonText}>Reject</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderCard;
