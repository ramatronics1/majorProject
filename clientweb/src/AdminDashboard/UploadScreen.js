import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UploadScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [image, setImage] = useState(null);
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const handleUpload = async () => {
    try {
      if (!name || !description || !price || !category || !ingredients || !image) {
        alert('Error: Please fill in all the fields and provide an image.');
        return;
      }
  
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('ingredients', ingredients);
      formData.append('isVegetarian', isVegetarian.toString());
      formData.append('image', image);
  
      const response = await axios.post(`http://localhost:5000/addNewdish/65f400c705cde929983e06b2`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.data.success) {
        navigate(`/DisplayDishes/${hotelId}`);
      }
    } catch (error) {
      console.error(error);
      // Handle error, for example, show an error message.
      alert('Error: Failed to upload dish. Please try again.');
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log(image)
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Upload New Dish</h1>
      <input style={styles.input} placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
      <input style={styles.input} placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} />
      <input style={styles.input} placeholder="Price" onChange={(e) => setPrice(e.target.value)} value={price} type="number" />
      <input style={styles.input} placeholder="Category" onChange={(e) => setCategory(e.target.value)} value={category} />
      <input style={styles.input} type="file" accept="image/*" multiple onChange={handleImageChange} />
      <input style={styles.input} placeholder="Ingredients" onChange={(e) => setIngredients(e.target.value)} value={ingredients} />
      <div style={styles.pickerContainer}>
        <span style={styles.pickerLabel}>Is Vegetarian:</span>
        <select style={styles.picker} value={isVegetarian.toString()} onChange={(e) => setIsVegetarian(e.target.value === 'true')}>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>
      <button style={styles.button} onClick={handleUpload}>
        Upload Dish
      </button>
    </div>
  );
};

const styles = {
  // Your styles remain unchanged
};

export default UploadScreen;
