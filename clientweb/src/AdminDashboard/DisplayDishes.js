import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayDishes = () => {
  const [dishes, setDishes] = useState([]);
  const history=useNavigate();

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
    history('/EditDishScreen',{ state: { id: dish } })
   
    console.log('Edit:', dish);
  };

  const handleDelete = async (dishId) => {
    try {
      const response = await axios.delete(`http://192.168.1.43:5000/deleteDishes/${dishId}`);
      console.log(response.data); 
      setDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== dishId));
      
    } catch (error) {
      console.error('Error deleting dish:', error);
    
    }
  };

  return (
    <div style={styles.container}>
      {dishes.length > 0 ? (
        dishes.map((dish, index) => (
          <div key={index}>
            <p style={styles.label}>Name:</p>
            <p style={styles.text}>{dish.name}</p>

            <p style={styles.label}>Description:</p>
            <p style={styles.text}>{dish.description}</p>

            <p style={styles.label}>Price:</p>
            <p style={styles.text}>{dish.price}</p>

            <p style={styles.label}>Category:</p>
            <p style={styles.text}>{dish.category}</p>

            <p style={styles.label}>Image URL:</p>
            {dish.imageUrl.map((image, imageIndex) => (
              <img
                key={imageIndex}
                src={image.url}
                alt={`Description of image ${imageIndex + 1}`}
                style={{ width: '10%', height: 'auto', marginBottom: 8 }}
              />
            ))}

            <p style={styles.label}>Ingredients:</p>
            <p style={styles.text}>{dish.ingredients}</p>

            <p style={styles.label}>Is Vegetarian:</p>
            <p style={styles.text}>{dish.isVegetarian ? 'Yes' : 'No'}</p>

            <button onClick={() => handleEdit(dish)} style={styles.button}>
              Edit
            </button>

            <button onClick={() => handleDelete(dish._id)} style={styles.button}>
              Delete
            </button>
          </div>
        ))
      ) : (
        <p style={styles.loadingText}>Loading dish data...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
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
    cursor: 'pointer',
  },
};

export default DisplayDishes;
