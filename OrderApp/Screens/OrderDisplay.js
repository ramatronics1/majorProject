import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import OrderCard from './OrderCard';

const OrderDisplay = ({ route }) => {
  const [orders, setOrders] = useState([]);
  const { hotelId } = route.params;
  const [nonAcceptedOrder, setNonAcceptedOrder] = useState([]);
  const [pops, setPops] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://192.168.29.42:5000/fetchOrders/${hotelId}`);
      if (response.data) {
        const { pops, nonAcceptedOrder } = response.data;
        setOrders(pops);
        setPops(pops);
        setNonAcceptedOrder(nonAcceptedOrder);
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  };

  const handleAccept = async (orderId, hotelId) => {
    try {
      await axios.post('http://192.168.29.42:5000/acceptedOrders', { orderId, hotelId });
      fetchOrders();
      Alert.alert('Order Accepted', 'The order has been accepted successfully.');
    } catch (error) {
      console.error('Error accepting order', error);
      Alert.alert('Error', 'Failed to accept the order. Please try again.');
    }
  };

  const handleReject = async (orderId, hotelId) => {
    try {
      await axios.post(`http://192.168.0.100/url/${orderId, hotelId}`);
      fetchOrders();
      Alert.alert('Order Rejected', 'The order has been rejected successfully.');
    } catch (error) {
      console.error('Error rejecting order', error);
      Alert.alert('Error', 'Failed to reject the order. Please try again.');
    }
  };

  const renderOrderItem = ({ item }) => (
    <OrderCard
      key={item._id}
      totalAmount={item.totalAmount}
      quantity={item.quantity}
      specialInstructions={item.specialInstructions}
      onAccept={() => handleAccept(item._id, hotelId)}
      onReject={() => handleReject(item._id, hotelId)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders for Hotel {hotelId}</Text>
      <FlatList
        data={[...nonAcceptedOrder, ...pops]}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderOrderItem}
      />
      <TouchableOpacity style={styles.button} onPress={fetchOrders}>
        <Text style={styles.buttonText}>Refresh Orders</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ffa31a',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default OrderDisplay;
