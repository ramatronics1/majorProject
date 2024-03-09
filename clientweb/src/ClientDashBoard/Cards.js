import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cards = ({ dish, handleClick }) => {
  const [dishes, setDishes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history=useNavigate();

  const checkLocalStorage = () => {
    const isLoggedInString = localStorage.getItem('isLoggedIn');
    let isLoggedIn = false;
    if (isLoggedInString === 'true') {
      isLoggedIn = !isLoggedIn;
    }
    setIsLoggedIn(isLoggedIn);
  };
  useEffect(() => {
    checkLocalStorage();
  }, []);
  const handleEdit = (dish) => {
    history('/EditDishScreen',{ state: { id: dish } })
   
    console.log('Edit:', dish);
  };

  const handleDelete = async (dishId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteDishes/${dishId}`);
      console.log(response.data); 
      setDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== dishId));
      
    } catch (error) {
      console.error('Error deleting dish:', error);
    
    }
  };

  return (
    <div>
      <div key={`dish-${dish._id}`} style={{ marginBottom: '20px' }}>  
        <h3>{dish.name}</h3>
        <p><strong>Description:</strong> {dish.description}</p>
        <p><strong>Price:</strong> ${dish.price}</p>
        <p><strong>Category:</strong> {dish.category}</p>
        <p><strong>Ingredients:</strong> {dish.ingredients.join(', ')}</p>
        <p><strong>Is Vegetarian:</strong> {dish.isVegetarian ? 'Yes' : 'No'}</p>
        {dish.imageUrl.map((image, imageIndex) => (
          <img
            key={`${dish._id}-image-${imageIndex}`} 
            src={image.url}
            alt={`Description of image ${imageIndex + 1}`}
            style={{ width: '100px', height: 'auto', marginBottom: '8px' }}
          />
        ))}
      </div>
      {!isLoggedIn && (
  <div>
    <button onClick={() => handleEdit(dish)}>
      Edit
    </button>
    <button onClick={() => handleDelete(dish._id)}>
      Delete
    </button>
  </div>
)}
     {isLoggedIn&& <button onClick={() => handleClick(dish)}>Add to Cart</button>}
    </div>
  );
};

export default Cards;
