import React, { useState } from 'react';

const ForgotPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="auth-container">
      <h2>
        Forgot <span style={{ color: '#67efaf' }}>Password</span>{' '}
      </h2>
      <form className="auth-form" action="">
        <div>
          <label htmlFor="number">Phone</label>
          <div className="auth-input phone-input">
            <p>+91</p>
            <input
              id="number"
              autocomplete="off"
              type="number"
              placeholder="8909XXXXXX"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password">New Password</label>

          <div className="auth-input password-input">
            <input
              id="password"
              placeholder="Enter new password"
              autocomplete="off"
              type={showPassword ? 'text' : 'password'}
            />

            <i
              onClick={() => setShowPassword(!showPassword)}
              className={showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
            ></i>
          </div>
        </div>

        <div>
          <label htmlFor="verification">Verification Code</label>
          <div className="verification-input">
            <input type="number" placeholder="Enter code here" />
            <button type="button">Send Verification Code</button>
          </div>
        </div>

        <button type="submit" className="auth-btn">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPass;
