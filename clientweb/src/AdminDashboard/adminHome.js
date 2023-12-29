import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AdminHome = () => {
  const location = useLocation();
  const [data, setData] = useState([]);

  const fetchDishes = async () => {
    try {
      const response = await axios.get('http://192.168.1.43:5000/DisplayDishes');
      if (response.data) {
        console.log(response.data);
        setData(response.data);
      }
    } catch (error) {
      console.log('some')
      console.error('Error fetching dishes', error);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Login: {location.state.id}</p>
      <div>
        {data.map((e) => (
          <p key={e._id}>{e.price}</p>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
