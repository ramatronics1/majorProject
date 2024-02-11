import axios from 'axios';
import React, { useEffect, useState } from 'react';
import prevCards from './prevCards';
const PreviousOrders = ({ id }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPrevOrders = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/prevOrders/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching previous orders:', error);
      }
    };

    fetchPrevOrders();
  }, [id]);

  return (
    <div>
      <h2>Previous Orders</h2>
      <ul>
        {data.map((order) => (
          <prevCards order={order}/>
        ))}
      </ul>
    </div>
  );
};

export default PreviousOrders;
