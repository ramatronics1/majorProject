import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClusterMap from '../ClientDashBoard/ClusterMap';
import AdminHotelCards from './AdminHotelCards';
import styles from './AdminHoteldisplay.module.css';

const AdminHotelDisplay = () => {
  const [data, setData] = useState([]);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/hotelsDisplay');
      if (response.data) {
        setData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error fetching dishes', error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className={styles.outerDiv}>
      <h1>Admin Hotel Display</h1>
      <ClusterMap />
      <div className={styles.cardDiv}>
        {data.map((hotel, index) => (
          <AdminHotelCards key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default AdminHotelDisplay;
