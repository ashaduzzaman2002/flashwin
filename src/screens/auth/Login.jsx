import React, { useState } from 'react';
import './auth.css';
import { Link } from 'react-router-dom';
import { baseURL, dbObject } from '../../helper/constant';
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [data, setData] = useState([]);

  const login = async (e) => {
    e.preventDefault();
    const user = { password, number };
    // const {data} = await axios.post(`${baseURL}/auth/login`, user);
    const {data} = await dbObject.post("/auth/login", user);
    console.log(data);
  }
  return (
    <div className="auth-container">
      <h2>Log <span style={{ color: '#67efaf' }}>In</span> </h2>
      <form className="auth-form" action="">
        <div>
          <label htmlFor="number">Phone</label>
          <div className='auth-input phone-input'>
            <p>+91</p>
            <input id='number' autocomplete="off" type="number" placeholder="8909XXXXXX" value={number} onChange={(e) => setNumber(e.target.value)} />
          </div>
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <div className='auth-input password-input'>
            <input id='password' placeholder='Password (> 3 characters)' autocomplete="off" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />

            <i onClick={() => setShowPassword(!showPassword)} class={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
          </div>
        </div>

        <Link className='forgotPassword' to='/forgot-password'>Forgot Password?</Link>

        <button type='submit' className='auth-btn' onClick={login}>Login</button>

        <p className='auth-other-link'>Don't have an account? <Link to='/register' >Register</Link></p>

      </form>
    </div>
  );
};

export default Login;
