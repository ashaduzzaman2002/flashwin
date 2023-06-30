import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { baseURL } from '../../helper/constant';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [number, setNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [referrel_id, setReferrel_id] = useState('');

  const registration = async (e) => {
    e.preventDefault();
  // Validate input
    try {
      const user = {
        number,
        otp,
        password,
        referrel_id,
      };
      
      const { data } = await axios.post(`${baseURL}/auth/register`, user);
      alert(data.message);
      // If error == false show success popup and redirect to login
      // If error == true show denger popup
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>
        Create <span style={{ color: '#67efaf' }}>Account</span>
        {''}
      </h2>
      <form onSubmit={registration} className="auth-form" action="">
        <div>
          <label htmlFor="number">Phone</label>
          <div className="auth-input phone-input">
            <p>+91</p>
            <input
              id="number"
              autocomplete="off"
              type="number"
              placeholder="8909XXXXXX"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="verification">Verification Code</label>
          <div className="verification-input">
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="number"
              placeholder="Enter code here"
            />
            <button type="button">Send Verification Code</button>
          </div>
        </div>

        <div>
          <label htmlFor="password">Create Password</label>

          <div className="auth-input password-input">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password (> 3 characters)"
              autocomplete="off"
              type={showPassword ? 'text' : 'password'}
            />

            <i
              onClick={() => setShowPassword(!showPassword)}
              class={showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
            ></i>
          </div>
        </div>

        <div>
          <label htmlFor="referralCode">Referral Code {'(Optional)'}</label>

          <div className="auth-input password-input">
            <input
              value={referrel_id}
              onChange={(e) => setReferrel_id(e.target.value)}
              id="referralCode"
              placeholder="Referral code"
              autocomplete="off"
              type="text"
            />
          </div>
        </div>

        <button type="submit" className="auth-btn">
          Register
        </button>

        <p className="auth-other-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
