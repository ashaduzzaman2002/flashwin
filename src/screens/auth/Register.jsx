import React, { useState } from 'react';
import '../../styles/auth/auth.css';
import { Show, Hide } from '../../assets';
import { Link } from 'react-router-dom';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="auth-container">
      <h2>
        Create <span style={{ color: '#67efaf' }}>Account</span>{' '}
      </h2>
      <form className="auth-form" action="">
        <div>
          <label htmlFor="number">Phone</label>
          <div className="auth-input phone-input">
            <p>+91</p>
            <input id="number" autocomplete="off" type="number" placeholder="8909XXXXXX" />
          </div>
        </div>

        <div>
          <label htmlFor="verification">Verification Code</label>
          <div className="verification-input">
            <input type="number" placeholder='Enter code here' />
            <button type='button'>Send Verification Code</button>
          </div>
        </div>
        <div>
          <label htmlFor="password">Create Password</label>

          <div className="auth-input password-input">
            <input id="password" placeholder='Password (> 3 characters)' autocomplete="off" type={showPassword ? 'text' : 'password'} />

            <img
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
              src={showPassword ? Show : Hide}
              alt=""
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
