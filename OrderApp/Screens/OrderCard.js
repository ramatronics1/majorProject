import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderCard = ({ dish }) => {
  console.log(dish)
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.dishName}>Dish Name: {dish.dishId.name}</Text>
      <Text style={styles.dishName}>Dish Name: {dish.dishId.category}</Text>
      
      <Text>Quantity: {dish.quantity}</Text>
      <Text>Special Instructions: {dish.specialInstructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  dishName: {
    fontWeight: 'bold',
  },
});

export default OrderCard;

