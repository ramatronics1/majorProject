import React from 'react';
import styles from './Cards.module.css'

const Cards = ({ dish, handleClick }) => {
  return (
    <div className={styles.card}>
      <div key={`dish-${dish._id}`} style={{ marginBottom: '20px' }}>  
        <h3>{dish.name}</h3>
        <table>
          <tbody>
            <tr>
              <td><strong>Description:</strong></td>
              <td>{dish.description}</td>
            </tr>
            <tr>
              <td><strong>Price:</strong></td>
              <td>${dish.price}</td>
            </tr>
            <tr>
              <td><strong>Category:</strong></td>
              <td>{dish.category}</td>
            </tr>
            <tr>
              <td><strong>Ingredients:</strong></td>
              <td>{dish.ingredients.join(', ')}</td>
            </tr>
            <tr>
              <td><strong>Is Vegetarian:</strong></td>
              <td>{dish.isVegetarian ? 'Yes' : 'No'}</td>
            </tr>
          </tbody>
        </table>
        {dish.imageUrl.map((image, imageIndex) => (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
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
