import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import DisplayDishes from "./DisplayDishes";
import styles from './EachHotel.module.css'

const EachHotel = () => {
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { id } = useParams();

  const checkLocalStorage = () => {
    const isLoggedInString = localStorage.getItem("isLoggedIn");
    let isLoggedIn = false;
    if (isLoggedInString === "true") {
      isLoggedIn = !isLoggedIn;
    }
    setIsLoggedIn(isLoggedIn);
  };

  const fetchHotel = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/hotel/${id}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching hotel:", error);
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
        <div style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5px'}}>
          <p>Hotel ID: {data._id}</p>
          {!isLoggedIn && (
            <div>
              <p>want to sign up?</p>{" "}
              <Link className={styles.btnAdmin} to={{ pathname: `/adminSignup/${data._id}` }}>Sign Up</Link>{" "}
              <Link className={styles.btnAdmin} to={{ pathname: `/adminLogin/${data._id}` }}>Login</Link>
            </div>
          )}{" "}
          <Link className={styles.btnAdmin} to={{ pathname: `/EntryPage/${data._id}` }}>
            Display dishes?
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EachHotel;