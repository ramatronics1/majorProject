import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const UploadScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async () => {
    try {
      if (!name || !description || !price || !category || !ingredients || !imageUrl) {
        Alert.alert('Error', 'Please fill in all the fields and provide an image URL.');
        return;
      }

      const formData = {
        name,
        description,
        price,
        category,
        ingredients,
        isVegetarian,
        imageUrl,
      };

      const response = await axios.post('http://192.168.1.43:5000/addNewDish', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
      // Handle success, for example, show a success message or navigate to another screen.
    } catch (error) {
      console.error(error);
      // Handle error, for example, show an error message.
      Alert.alert('Error', 'Failed to upload dish. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload New Dish</Text>
      <TextInput style={styles.input} placeholder="Name" onChangeText={setName} value={name} />
      <TextInput style={styles.input} placeholder="Description" onChangeText={setDescription} value={description} />
      <TextInput style={styles.input} placeholder="Price" onChangeText={setPrice} value={price} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Category" onChangeText={setCategory} value={category} />
      <TextInput style={styles.input} placeholder="Image URL" onChangeText={setImageUrl} value={imageUrl} />
      <TextInput style={styles.input} placeholder="Ingredients" onChangeText={setIngredients} value={ingredients} />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Is Vegetarian:</Text>
        <Picker
          style={styles.picker}
          selectedValue={isVegetarian.toString()}
          onValueChange={(value) => setIsVegetarian(value === 'true')}
          itemStyle={{ color: 'black' }} // Set text color
        >
          <Picker.Item label="No" value="false" />
          <Picker.Item label="Yes" value="true" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>Upload Dish</Text>
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
    color: 'black',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pickerLabel: {
    color: 'white',
    marginRight: 10,
  },
  picker: {
    height: 40,
    width: 150,
    color: 'black',
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

export default UploadScreen;
