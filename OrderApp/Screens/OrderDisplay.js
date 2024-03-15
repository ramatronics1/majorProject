import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const OrderDisplay = ({route}) => {
  const [orders, setOrders] = useState([]);
  const { hotelId } = route.params
  const fetchOrders = async () => {
    try {
        console.log(hotelId)
      const response = await axios.get(`http://192.168.0.100:5000/fetchOrders/${hotelId}`);
      if (response.data) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text>Order ID: {item.id}</Text>
      <Text>Customer: {item.customer}</Text>
      <Text>Total: ${item.total}</Text>
      {/* Add more order details as needed */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders for Hotel {hotelId}</Text>
      <Button title="Fetch Orders" onPress={fetchOrders} />
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
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
  orderItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default OrderDisplay;
