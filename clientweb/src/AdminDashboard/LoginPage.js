import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  const id = useParams().hotelId;
  console.log(id)

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
      const response = await axios.post('http://localhost:5000/adminLogin', { email, password,id});
   
      if (response.data) {
       
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
