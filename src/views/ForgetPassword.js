import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './ForgetPassword.css'

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/resetPassword', { email, newPassword });

      if (response.data.success) {
        setMessage('Password reset successful');
      } else {
        setMessage('User not found. Please check your email and try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while resetting your password.');
    }
  };

  return (
    <div>
      <nav className="forget-password-nav">
        <img id="icon" src={require("../images/Blogger-App.png")} alt="Icon" />
        <Link>
        </Link>
      </nav>
  <div className="container-forget">
        <div className="form-container-forget">

      <form>

      <h2>Forget Password</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"  // Add id attribute
          name="email"  // Add name attribute
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"  // Add autocomplete attribute
        />
      </div>
      
      <div>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"  // Add id attribute
          name="newPassword"  // Add name attribute
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          />
      </div>

      <button className='button-forget'onClick={handlePasswordReset}>Reset Password</button>
      <p>{message}</p>
      </form>
          </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
