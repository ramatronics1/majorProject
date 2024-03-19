import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import TotalOrderCard from './TotalOrderCard';

const OrderDisplay = ({ route }) => {
  const [orders, setOrders] = useState([]);
  const { hotelId } = route.params;
  const [pops,setPops]=useState([])

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
  try {
    const response = await axios.get(`http://192.168.29.42:5000/fetchOrders/${hotelId}`);
    if (response.data) {
      const { nonAcceptedOrder, pops } = response.data; // Corrected variable name
      setOrders(nonAcceptedOrder); // Set nonAcceptedOrder instead of nonAcceptedOrders
      setPops(pops); // Set pops
      
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};


  const handleAccept = async (orderId) => {
    try {
      
      await axios.post(`http://192.168.29.42:5000/acceptOrder/${orderId}`);
      fetchOrders();
      Alert.alert('Order Accepted', 'The order has been accepted successfully.');
    } catch (error) {
      console.error('Error accepting order:', error);
      Alert.alert('Error', 'Failed to accept the order. Please try again.');
    }
  };

  const handleReject = async (orderId) => {
    try {
      await axios.post(`http://your-backend-url/rejectOrder/${orderId}`);
      fetchOrders();
      Alert.alert('Order Rejected', 'The order has been rejected successfully.');
    } catch (error) {
      console.error('Error rejecting order:', error);
      Alert.alert('Error', 'Failed to reject the order. Please try again.');
    }
  };

  const renderOrderItem = ({ item }) => (
    <TotalOrderCard
      key={item._id}
      order={item}
      pops={pops}
      hotelId={hotelId}
      onAccept={() => handleAccept(item._id)}
      onReject={() => handleReject(item._id)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders for Hotel {hotelId}</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderOrderItem}
      />
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
});

export default OrderDisplay;
