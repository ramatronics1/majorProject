import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://192.168.1.43:5000/adminLogin', { email, password });
      // Handle success, you can navigate to another page or update state as needed
      if (response.data) {
        // Use `history` instead of `history()`
        history('/adminHome', { state: { id: email } });
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
        <label>Email:</label>
        <input type="text" name="email" onChange={handleChange} value={email} />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          required
        />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default AdminLogin;
