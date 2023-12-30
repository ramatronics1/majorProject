import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalAmounts, setTotalAmounts] = useState({});
  const [quantities, setQuantities] = useState({});
  const [updatedDishes, setUpdatedDishes] = useState({});

  const fetchDishes = async () => {
    try {
      const response = await axios.get('http://192.168.1.43:5000/fetchDishes');
      if (response.data) {
        console.log(response.data);
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching dishes', error);
    }
  };

  const handleQuantityChange = (event, dish) => {
    const newQuantity = parseInt(event.target.value, 10) || 0;

    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [dish._id]: newQuantity  // Use _id
    }));
    setTotalAmounts((prevAmounts) => ({
      ...prevAmounts,
      [dish._id]: newQuantity > 0 ? dish.price * newQuantity : 0  // Use _id
    }));

    if (newQuantity > 0) {
      setUpdatedDishes((prevUpdatedDishes) => ({
        ...prevUpdatedDishes,
        [dish._id]: newQuantity  // Use _id
      }));
    } else {
      setUpdatedDishes((prevUpdatedDishes) => {
        const updated = { ...prevUpdatedDishes };
        delete updated[dish._id];  // Use _id
        return updated;
      });
    }
  };

  const handleQuantityKeyDown = (event, dish) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const step = event.key === "ArrowUp" ? 1 : -1;
      const currentQuantity = quantities[dish._id] || 0;  // Use _id
      const newQuantity = Math.max(currentQuantity + step, 0);

      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [dish._id]: newQuantity  // Use _id
      }));
      setTotalAmounts((prevAmounts) => ({
        ...prevAmounts,
        [dish._id]: newQuantity > 0 ? dish.price * newQuantity : 0  // Use _id
      }));
      setUpdatedDishes((prevUpdatedDishes) => ({
        ...prevUpdatedDishes,
        [dish._id]: newQuantity  // Use _id
      }));
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const handleSubmit = () => {
    const dishesWithDetails = data.filter(dish => quantities[dish._id] && quantities[dish._id] > 0)  // Use _id
      .map(dish => ({
        ...dish,
        quantity: quantities[dish._id]  // Use _id
      }));

    navigate('/addtoCart', { state: { dishesWithDetails } });
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <div>
        {data.map((dish) => (  
          <div key={`dish-${dish._id}`} style={{ marginBottom: '20px' }}>  
            <h3>{dish.name}</h3>
            <p><strong>Description:</strong> {dish.description}</p>
            <p><strong>Price:</strong> ${dish.price}</p>
            <p><strong>Category:</strong> {dish.category}</p>
            <p><strong>Ingredients:</strong> {dish.ingredients.join(', ')}</p>
            <p><strong>Is Vegetarian:</strong> {dish.isVegetarian ? 'Yes' : 'No'}</p>
            {dish.imageUrl.map((image, imageIndex) => (
              <img
                key={`${dish._id}-image-${imageIndex}`} // Use _id for key
                src={image.url}
                alt={`Description of image ${imageIndex + 1}`}
                style={{ width: '100px', height: 'auto', marginBottom: '8px' }}
              />
            ))}
            <label htmlFor={`quantity-${dish._id}`}>Quantity:</label>  
            <input
              type='number'
              id={`quantity-${dish._id}`}  
              name='quantity'
              min="0"
              value={quantities[dish._id] !== undefined ? quantities[dish._id] : 0}  
              onChange={(e) => handleQuantityChange(e, dish)}
              onKeyDown={(e) => handleQuantityKeyDown(e, dish)}
            />
            <p><strong>Total Amount:</strong> ${totalAmounts[dish._id] || 0}</p>  
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Review Order</button>
    </div>
  );
};

export default Home;
