import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EachHotel = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  const fetchHotel = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/hotel/${id}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching hotel:', error);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, [id]); // Make sure to include id in the dependency array to re-fetch when id changes

  return (
    <div>
      <h1>Hotel Details</h1>
      {data ? (
        <div>
          <p>Hotel ID: {data._id}</p>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EachHotel;