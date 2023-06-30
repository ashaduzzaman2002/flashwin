import React, { useState } from 'react';
import './auth.css';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
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
=======
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
>>>>>>> 88754c049f809d24b86b3696a8bf0ec9ee800706
        <div>
          <label htmlFor="number">Phone</label>
          <div className='auth-input phone-input'>
            <p>+91</p>
<<<<<<< HEAD
            <input value={number} onChange={(e) => setNumber(e.target.value)} id='number'autocomplete="off" type="number" placeholder="8909XXXXXX" />
=======
            <input id='number' autocomplete="off" type="number" placeholder="8909XXXXXX" value={number} onChange={(e) => setNumber(e.target.value)} />
>>>>>>> 88754c049f809d24b86b3696a8bf0ec9ee800706
          </div>
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <div className='auth-input password-input'>
<<<<<<< HEAD
            <input value={password} onChange={(e) => setPassword(e.target.value)} id='password' placeholder='Password (> 3 characters)' autocomplete="off" type={showPassword ? 'text' : 'password'} />

            <i onClick={() => setShowPassword(!showPassword)} className={showPassword?"fa-solid fa-eye":"fa-solid fa-eye-slash"}></i>
=======
            <input id='password' placeholder='Password (> 3 characters)' autocomplete="off" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />

            <i onClick={() => setShowPassword(!showPassword)} class={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
>>>>>>> 88754c049f809d24b86b3696a8bf0ec9ee800706
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
