import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AddtoCart = () => {
  const location = useLocation();
  const { dishesWithDetails } = location.state || {};

  // Set up a state for the quantities of dishes
  const [quantities, setQuantities] = useState({});

  // Initialize the quantities state with the quantities of dishesWithDetails
  useEffect(() => {
    if (dishesWithDetails) {
      const initialQuantities = dishesWithDetails.reduce((acc, dish) => {
        acc[dish._id] = dish.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [dishesWithDetails]);

  const handleQuantityChange = (event, dish) => {
    const newQuantity = parseInt(event.target.value, 10) || 0;
    setQuantities(prev => ({ ...prev, [dish._id]: newQuantity }));
  };

  const hasDishes = dishesWithDetails && dishesWithDetails.length > 0;

  return (
    <div>
      <h1>Review Your Order</h1>
      {hasDishes ? (
        dishesWithDetails.map((dish) => (
          <div key={dish._id} style={{ marginBottom: "20px" }}>
            <h3>{dish.name}</h3>
            <p><strong>Description:</strong> {dish.description}</p>
            <p><strong>Price:</strong> ${dish.price}</p>
            <p><strong>Quantity:</strong> {quantities[dish._id] || dish.quantity}</p>
            {dish.imageUrl.map((image, imageIndex) => (
              <img
                key={`${dish._id}-image-${imageIndex}`} // Ensure unique key
                src={image.url}
                alt={`Description of image ${imageIndex + 1}`}
                style={{ width: '100px', height: 'auto', marginBottom: '8px' }}
              />
            ))}
            <label htmlFor={`quantity-${dish._id}`}>Update Quantity:</label>
            <input
              type="number"
              id={`quantity-${dish._id}`}
              name="quantity"
              min="0"
              value={quantities[dish._id] || dish.quantity}
              onChange={(e) => handleQuantityChange(e, dish)}
            />
            <p><strong>Total Amount:</strong> ${(quantities[dish._id] || dish.quantity) * dish.price}</p>
          </div>
        ))
      ) : (
        <p>No items added to the cart.</p>
      )}
    </div>
  );
};

export default AddtoCart;
