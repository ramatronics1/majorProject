import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cards from './Cards';

const Home = ({ handleClick,name,id }) => {
  const [data, setData] = useState([]);

  const fetchDishes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fetchDishes');
      if (response.data) {

        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching dishes', error);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <div>
      <h1>hello {name}</h1>
      <h1>Welcome to the Home Page</h1>
      
      <div>
        {data.map((dish) => (
          <Cards key={dish._id} dish={dish} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default Home;
