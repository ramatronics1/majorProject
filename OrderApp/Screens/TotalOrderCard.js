import React from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import OrderCard from './OrderCard';

const TotalOrderCard = ({pops, order, onAccept, onReject,hotelId }) => {
 const handleAccept = async (orderId) => {
    try {
      await axios.post(`http://192.168.29.42:5000/acceptedOrders/${orderId}/${hotelId}`);
      fetchOrders();
      Alert.alert('Order Accepted', 'The order has been accepted successfully.');
    } catch (error) {
      console.error('Error accepting order:', error);
      Alert.alert('Error', 'Failed to accept the order. Please try again.');
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text>Total Amount: {order.totalAmount}</Text>
        <Text>Number of Dishes: {order.eachOrder.length}</Text>

        {/* List of dishes */}
        {pops.map((dish, index) => (
          <OrderCard key={index} dish={dish} />
        ))}

        {/* Accept and Reject buttons */}
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => handleAccept(order._id)}>
            <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={onReject}>
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
  },
  card: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    marginRight: 5,
  },
  rejectButton: {
    backgroundColor: '#F44336',
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TotalOrderCard;
