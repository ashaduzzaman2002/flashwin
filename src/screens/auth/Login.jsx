import React, { useState } from 'react';
import './auth.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {baseURL} from '../../helper/constant'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')


  const login = async (e) => {
    e.preventDefault()

    try {
      const user = {
        password,
        number
      }
      const {data} = await axios.post(`${baseURL}/auth/login`, user)

      console.log('logged in', data);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="auth-container">
      <h2>Log <span style={{color: '#67efaf'}}>In</span> </h2>
      <form onSubmit={login} className="auth-form" action="">
        <div>
          <label htmlFor="number">Phone</label>
          <div className='auth-input phone-input'>
            <p>+91</p>
            <input value={number} onChange={(e) => setNumber(e.target.value)} id='number'autocomplete="off" type="number" placeholder="8909XXXXXX" />
          </div>
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <div className='auth-input password-input'>
            <input value={password} onChange={(e) => setPassword(e.target.value)} id='password' placeholder='Password (> 3 characters)' autocomplete="off" type={showPassword ? 'text' : 'password'} />

            <i onClick={() => setShowPassword(!showPassword)} className={showPassword?"fa-solid fa-eye":"fa-solid fa-eye-slash"}></i>
          </div>
        </div>

        <Link className='forgotPassword' to='/forgot-password'>Forgot Password?</Link>

        <button type='submit' className='auth-btn'>Login</button>

        <p className='auth-other-link'>Don't have an account? <Link to='/register' >Register</Link></p>

      </form>
    </div>
  );
};

export default Login;
