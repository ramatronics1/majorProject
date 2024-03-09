import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import DisplayDishes from './DisplayDishes';

const EachHotel = () => {
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { id } = useParams();

  const checkLocalStorage = () => {
    const isLoggedInString = localStorage.getItem('isLoggedIn');
    let isLoggedIn = false;
    if (isLoggedInString === 'true') {
      isLoggedIn = !isLoggedIn;
    }
    setIsLoggedIn(isLoggedIn);
  };

  const fetchHotel = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/hotel/${id}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching hotel:', error);
    }
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);

  useEffect(() => {
    fetchHotel();
  }, [id]);

  return (
    <div>
      <h1>Hotel Details</h1>
      {data ? (
        <div>
          <p>Hotel ID: {data._id}</p>
          {!isLoggedIn && (
            <div>
              <p>want to sign up?</p>
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
          )}
          <button>
            <Link to={{ pathname: `/EntryPage/${data._id}` }}>
              Display dishes?
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
