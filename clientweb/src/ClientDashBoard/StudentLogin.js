import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [usn, setUsn] = useState('');
  const [dob, setDob] = useState('');
  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'usn') {
      setUsn(value);
    } else if (name === 'dob') {
      setDob(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://192.168.1.43:5000/clientLogin', { usn, dob });
      // Handle success, you can navigate to another page or update state as needed
      if (response.data) {
        // Use `history` instead of `history()`
        history('/home', { state: { id: usn } });
      }
      console.log('Login successful', response.data);
    } catch (error) {
      // Handle error, you can display an error message or perform other actions
      console.error('Login error', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>USN:</label>
        <input type="text" name="usn" onChange={handleChange} value={usn} />

        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          onChange={handleChange}
          required
        />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default StudentLogin;
