import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const EditDishScreen = () => {
  const route = useRoute();
  const { dish } = route.params;
  const navigation = useNavigation();
  
  const [name, setName] = useState(dish.name);
  const [description, setDescription] = useState(dish.description);
  const [price, setPrice] = useState(dish.price.toString());
  const [category, setCategory] = useState(dish.category);
  const [ingredients, setIngredients] = useState(dish.ingredients.join(', '));
  const [isVegetarian, setIsVegetarian] = useState(dish.isVegetarian.toString());
  const [imageUrl, setimageUrl] = useState(dish.imageUrl);

  const handleUpdate = async () => {
    try {
      const formData = {
        name,
        description,
        price,
        category,
        ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
        isVegetarian: isVegetarian.toLowerCase() === 'true',
        imageUrl,
      };

      const response = await axios.put(`http://192.168.1.42:5000/updateDishes/${dish._id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigation.goBack()
      console.log(response.data);
      // Handle success, for example, show a success message or navigate to another screen.
    } catch (error) {
      console.error('Error updating dish:', error);
      // Handle error, for example, show an error message.
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Dish</Text>
      <TextInput style={styles.input} placeholder="Name" onChangeText={setName} value={name} />
      <TextInput style={styles.input} placeholder="Description" onChangeText={setDescription} value={description} />
      <TextInput style={styles.input} placeholder="Price" onChangeText={setPrice} value={price} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Category" onChangeText={setCategory} value={category} />
      <TextInput style={styles.input} placeholder="Image URL" onChangeText={setimageUrl} value={imageUrl} />
      <TextInput style={styles.input} placeholder="Ingredients" onChangeText={setIngredients} value={ingredients} />
      <TextInput
        style={styles.input}
        placeholder="Is Vegetarian"
        onChangeText={(text) => setIsVegetarian(text)}
        value={isVegetarian}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Dish</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#1b1b1b',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: 'black', // Text color
  },
  button: {
    backgroundColor: '#ffa31a',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditDishScreen;
