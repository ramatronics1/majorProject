import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
          <div>{data.name}</div>
        <div>{data.description}</div>
        <div>{data.phone}</div>
        <div>{data.email}</div>
        {data.imageUrl.map((image, imageIndex) => (
          <img
            key={`${data._id}-image-${imageIndex}`} 
            src={image.url}
            alt={`Description of image ${imageIndex + 1}`}
            style={{ width: '100px', height: 'auto', marginBottom: '8px' }}
          />
        ))}
          <p>want to sign up?</p>
          {/* Pass the hotel ID as state */}

          <button>
            <Link to={{ pathname: `/adminSignup/${data._id}` }}>
              Sign Up
            </Link>
           
          </button>
          <button>
          <Link to={{ pathname: `/adminLogin/${data._id}` }}>
              Login 
            </Link>
            </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EachHotel;
