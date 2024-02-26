import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios'
const UploadScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
     // console.log(result)
      if (!result.cancelled) {
        // Set the selected image to the component's state
        setImage(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleUpload = () => {
    //setImage(image.assets)
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('ingredients', ingredients);
      formData.append('isVegetarian', isVegetarian.toString());
     // console.log(image.assets.type)
     // console.log(image.assets[0].uri)
      if (image) {
        formData.append('image', {
          name: 'dishImage.jpg',
          type: image.assets[0].type,
          uri: image.assets[0].uri,
        });
      }
      formData.append('upload_preset', 'qpmcen48');
      // try {
      //   const response = axios.post(`https://api.cloudinary.com/v1_1/dsbgau1rl/image/upload`,formData).then((data)=>{
      //     console.log(data)
      //   })
      //   //console.log(response)
      //  //const data = await response.json();
      //   //console.log('Upload successful:', data);
      // } catch (error) {
      //   console.error('Error uploading to Cloudinary:', error);
      // }
      // const response = await fetch('http://192.168.29.42:5000/addNewDish', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: formData,
      // });
  
      // const responseData = await response.json();
  
      // console.log(responseData);
      // Handle success, for example, show a success message or navigate to another screen.
  };

  if (hasGalleryPermission === false) {
    return <Text>No Access</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload New Dish</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={setDescription}
        value={description}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        onChangeText={setPrice}
        value={price}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        onChangeText={setCategory}
        value={category}
      />

      {/* Button to select an image */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>

      {/* Display the selected image (if any) */}
      {image && (
        <Image source={{ uri: image.uri }} style={styles.imagePreview} />
      )}

      <TextInput
        style={styles.input}
        placeholder="Ingredients"
        onChangeText={setIngredients}
        value={ingredients}
      />
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
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default UploadScreen;
