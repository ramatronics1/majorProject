import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentLogin.css';
import { FaUser } from 'react-icons/fa';
import { BsCalendar2DateFill } from 'react-icons/bs';

const StudentLogin = ({ login, setLogin, setId }) => {
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
      const response = await axios.post(`http://localhost:5000/clientLogin`, { usn, dob }, {
        withCredentials: true
      });

      if (response.data) {
        localStorage.setItem('isLoggedIn', true.toString());
        const name = response.data.name;
        const id = response.data._id;
        setId(id);

        history('/EntryPage', { state: { usn: usn, name: name, id: id } });
      }

      console.log('Login successful', response.data);
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <div className='wrapper'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-box'>
          <label>USN:</label>
          <input type="text" name="usn" onChange={handleChange} value={usn} />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <label>Date of Birth:</label>
          <input type="date" name="dob" onChange={handleChange} value={dob} />
          <BsCalendar2DateFill className='icon' />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default StudentLogin;
