import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const DisplayDishes = () => {
  const [dishes, setDishes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.43:5000/displayDishes');
        setDishes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (dish) => {
    // Navigate to the EditDishScreen and pass the dish data as a parameter
    navigation.navigate('EditDishScreen', { dish });
  };

  const handleDelete = async (dishId) => {
    try {
      // Send a DELETE request to the server
      const response = await axios.delete(`http://192.168.1.43:5000/deleteDish/${dishId}`);
      console.log(response.data); // Log the response from the server

      // Remove the deleted dish from the local state
      setDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== dishId));
    } catch (error) {
      console.error('Error deleting dish:', error);
      // Handle error, for example, show an error message.
    }
  };


  return (
    <View style={styles.container}>
      {dishes.length > 0 ? (
        dishes.map((dish, index) => (
          <View key={index}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>{dish.name}</Text>

            <Text style={styles.label}>Description:</Text>
            <Text style={styles.text}>{dish.description}</Text>

            <Text style={styles.label}>Price:</Text>
            <Text style={styles.text}>{dish.price}</Text>

            <Text style={styles.label}>Category:</Text>
            <Text style={styles.text}>{dish.category}</Text>

            <Text style={styles.label}>Image URL:</Text>
            <Text style={styles.text}>{dish.imageUrl}</Text>

            <Text style={styles.label}>Ingredients:</Text>
            <Text style={styles.text}>{dish.ingredients}</Text>

            <Text style={styles.label}>Is Vegetarian:</Text>
            <Text style={styles.text}>{dish.isVegetarian ? 'Yes' : 'No'}</Text>
            <TouchableOpacity onPress={() => handleEdit(dish)}>
              <Text style={styles.button}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDelete(dish._id)}>
              <Text style={styles.button}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.loadingText}>Loading dish data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1b1b1b',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: 'white',
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    fontSize: 16,
    color: 'orange',
    marginBottom: 12,
  },
});

export default DisplayDishes;
