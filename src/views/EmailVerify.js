// EmailVerify.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmailVerify.css';

function EmailVerify() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const generateRandomSixDigitNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const sendOtpByEmail = async (otp) => {
    try {
      await fetch('http://localhost:5000/api/sendOtpByEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
    } catch (error) {
      console.error('Error sending OTP via email:', error.message);
    }
  };

  const handleForgetPasswordClick = async () => {
    try {
      if (!email.trim()) {
        console.log('Email is empty');
        return;
      }

      const response = await fetch('http://localhost:5000/api/checkEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.exists) {
        const otp = generateRandomSixDigitNumber();
        await sendOtpByEmail(otp);
        navigate('/OtpVerify', { state: { email, otp } });
      } else {
        console.log('Email does not exist');
      }
    } catch (error) {
      console.error('Error checking email:', error.message);
    }
  };

  return (
    <div className="email-verify-container">
      <video autoPlay muted loop id="background-video-email-verify">
        <source src={require("../images/background.mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="form-container-email-verify">
        <div className="form-content-email-verify">
          <label htmlFor="email" className="email-verify-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            autoComplete="email"
            className="email-verify-input"
            placeholder="Enter your Email Id"
          />
          <button onClick={handleForgetPasswordClick} className="email-verify-button">
            Forget Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerify;
