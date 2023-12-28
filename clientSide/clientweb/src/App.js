import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css';
import StudentForm from './StudenLogin';
import Home from './Home';

function App() {
  return (
  
      <div className="App">
        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    
  );
}

export default App;
