import React from 'react';

const Cards = ({ dish, handleClick }) => {
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
      <button onClick={() => handleClick(dish)}>Add to Cart</button>
    </div>
  );
};

export default Cards;
