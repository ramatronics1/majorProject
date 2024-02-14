import React, { useState } from 'react';
import axios from 'axios';

const HotelRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    phone: '',
    email: '',
    latitude: 0,
    longitude: 0,
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] || null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('latitude', formData.latitude);
      formDataToSend.append('longitude', formData.longitude);
      formDataToSend.append('image', formData.image);
     
     
      await axios.post('http://localhost:5000/hotelRegister', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const { name, description, phone, email, latitude, longitude } = formData;

  return (
    <div>
      <input type="text" name="name" value={name} onChange={handleChange} placeholder="Name" />
      <input type="text" name="description" value={description} onChange={handleChange} placeholder="Description" />
      <input type="text" name="phone" value={phone} onChange={handleChange} placeholder="Phone" />
      <input type="text" name="email" value={email} onChange={handleChange} placeholder="Email" />
      <input type="text" name="latitude" value={latitude} onChange={handleChange} placeholder="Latitude" />
      <input type="text" name="longitude" value={longitude} onChange={handleChange} placeholder="Longitude" />
      <input type="file" accept="image/*" onChange={handleChange} name="image" />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default HotelRegister;
