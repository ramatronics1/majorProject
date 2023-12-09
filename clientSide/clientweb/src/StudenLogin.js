import React, { Component } from 'react';
import axios from 'axios';

class StudentForm extends Component {
  state = {
    usn: '',
    dob: '',
    responseData: null,
    error: null,
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
  
    // Prepare data to be sent
    const formData = {
      usn: this.state.usn,
      dob: this.state.dob,
    };
  
    try {
      const response = await axios.post('http://192.168.1.43:5000/clientLogin', formData);
  
      if (response.data && response.data.error) {
        // Display error message
        this.setState({ responseData: null, error: response.data.error });
      } else {
        // Successful login, update state with response data
        this.setState({ responseData: response.data, error: null });
        console.log(response.data); // Log the response from the server
      }
    } catch (error) {
      console.error('Axios error:', error);
  
      // Handle other errors, e.g., network issues
      this.setState({ responseData: null, error: 'Error fetching data. Please try again.' });
    }
  };
  
  

  render() {
    return (
      <div className="container">
        <h1>Authentication</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="usn">USN (University Serial Number):</label>
          <input
            type="text"
            id="usn"
            name="usn"
            value={this.state.usn}
            onChange={this.handleChange}
            required
          />

          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={this.state.dob}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Authenticate</button>
        </form>

        {this.state.responseData && !this.state.error && (
        <div>
          <h2>Response from Server:</h2>
          <pre>{JSON.stringify(this.state.responseData, null, 2)}</pre>
        </div>
      )}

      {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
    </div>
    );
  }
}

export default StudentForm;
