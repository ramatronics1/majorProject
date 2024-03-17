import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OrderCard = ({ totalAmount, specialInstructions, onAccept, onReject }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text>Total Amount: {totalAmount}</Text>
        <Text>Special Instructions: {specialInstructions}</Text>

        {/* Accept and Reject buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={onAccept}>
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

export default OrderCard;
