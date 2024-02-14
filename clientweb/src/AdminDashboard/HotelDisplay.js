import React, { useEffect, useState } from 'react'
import axios from 'axios'
import HotelCards from './hotelCards';

const HotelDisplay = () => {
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
        <h1>hi</h1>
      {data.map((hotel,index)=>(
        
        <HotelCards key={index} hotel={hotel}/>

      )) } 
      
    </div>
  )
}

export default HotelDisplay
