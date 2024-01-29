import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AddtoCart = ({dish,setDish,handleChange}) => {
  const [price,setPrice]=useState(0)
 
  
  
  const handlePrice = ()=>{
    let ans = 0;
    
    dish.map((item)=>(
        ans += item.quantity * item.price
    ))
    setPrice(ans);
}

const handleSubmit=()=>{

}
useEffect(()=>{
  handlePrice();
})
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
     
    </div>
  ))}
   <p><strong>Total Amount:</strong> ${price}</p>

   <button Onclick={handleSubmit(dish)}> Confirm order?</button>
</div>
  )}

export default AddtoCart;
