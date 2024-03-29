import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddtoCart = ({ dish, setDish, handleChange }) => {
  const [price, setPrice] = useState(0);
  const [specialInstructions, setSpecialInstructions] = useState({});
 const navigate=useNavigate();
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
        Hotel_id:item.Hotel_id,
        quantity: item.quantity,
        specialInstructions: specialInstructions[item._id] || '',
      }));
      newAttributes.totalAmount = price;
     
   
      const response = await axios.post(`http://localhost:5000/createOrder`, { items: newAttributes, price: price },
      { withCredentials: true });
      if(response){
        navigate(`/orderSuccess/${response.data._id}` )
        setDish([])
      }
     
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
              key={`${item._id}-image-${imageIndex}`} 
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
