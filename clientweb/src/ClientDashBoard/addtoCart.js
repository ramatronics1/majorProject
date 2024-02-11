import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddtoCart = ({ dish, setDish, handleChange }) => {
  const [price, setPrice] = useState(0);
  const [specialInstructions, setSpecialInstructions] = useState({});

  const handlePrice = () => {
    let ans = 0;
    dish.forEach((item) => {
      ans += item.quantity * item.price;
    });
    setPrice(ans);
  };

  const handleSpecialInstructionsChange = (id, instructions) => {
    setSpecialInstructions(prev => ({ ...prev, [id]: instructions }));
  };

  const handleSubmit = async (dish, price) => {
    try {
      const newAttributes = dish.map((item) => ({
        dishId: item._id,
        quantity: item.quantity,
        specialInstructions: specialInstructions[item._id] || '',
      }));
      newAttributes.totalAmount = price;
      console.log(newAttributes);
    
      const IP=process.env.IP
      const response = await axios.post(`http://localhost:5000/createOrder`, { items: newAttributes, price: price },
      { withCredentials: true });
      console.log(response.data); 
    } catch (error) {
      console.error('Error creating order:', error.message);
    }
  };

  useEffect(() => {
    handlePrice();
  }, [dish]);

  return (
    <div>
      {dish.map((item) => (
        <div key={`cart-${item._id}`} style={{ marginBottom: '20px' }}>
          <h3>{item.name}</h3>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Price:</strong> ${item.price}</p>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Ingredients:</strong> {item.ingredients.join(', ')}</p>
          <p><strong>Is Vegetarian:</strong> {item.isVegetarian ? 'Yes' : 'No'}</p>
          {item.imageUrl.map((image, imageIndex) => (
            <img
              key={`${item._id}-image-${imageIndex}`} // Use _id for key
              src={image.url}
              alt={`Description of image ${imageIndex + 1}`}
              style={{ width: '100px', height: 'auto', marginBottom: '8px' }}
            />
          ))}
          <div>
            <button onClick={() => handleChange(item, +1)}> + </button>
            <button>{item.quantity}</button>
            <button onClick={() => handleChange(item, -1)}> - </button>
          </div>
          <label htmlFor={`specialInstructions-${item._id}`}>Special Instructions:</label>
          <input
            type="text"
            name="specialInstructions"
            id={`specialInstructions-${item._id}`}
            placeholder="Enter special instructions"
            onChange={(e) => handleSpecialInstructionsChange(item._id, e.target.value)}
            value={specialInstructions[item._id] || ''}
          />
        </div>
      ))}
      <p><strong>Total Amount:</strong> ${price}</p>
      <button onClick={() => handleSubmit(dish, price)}>Confirm order?</button>
    </div>
  );
};

export default AddtoCart;
