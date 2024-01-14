import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [registrationMessage, setRegistrationMessage] = useState(null);

  const handleRegister = async () => {
    try {
      // Send registration data to the backend
      const response = await axios.post('/api/register', registerData);

      // Handle successful registration
      console.log('Registration successful!', response.data);

      // Display success message
      setRegistrationMessage('Registration successful!');

      // Clear the registration form
      setRegisterData({
        username: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error during registration:', error);

      // Handle registration error, e.g., show an error message to the user
      setRegistrationMessage('Registration failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={registerData.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={registerData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={registerData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" onClick={handleRegister}>
          Register
        </button>

        {registrationMessage && <p>{registrationMessage}</p>}
      </form>
    </div>
  );
};

export default Register;
