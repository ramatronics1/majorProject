import React from 'react'
import axios from 'axios';
import ClusterMap from '../ClientDashBoard/ClusterMap';
import { useState,useEffect } from 'react';
import AdminHotelCards from './AdminhotelCards';

const AdminHotelDisplay = () => {
    const [data,setData]=useState([]);
    const fetchHotels=async ()=>{

        try {
            const response = await axios.get('http://localhost:5000/hotelsDisplay');
            if (response.data) {
      
              setData(response.data);
             
            }
          } catch (error) {
            console.error('Error fetching dishes', error);
          }

    }
    useEffect(()=>{
        fetchHotels()
    },[]
    )

  return (
    <div>
       <ClusterMap/>
      {data.map((hotel,index)=>(
        
        <AdminHotelCards key={index} hotel={hotel}/>

      )) } 
      
    </div>
  )
}

export default AdminHotelDisplay
