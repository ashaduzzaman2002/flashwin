import React, { useState, useContext } from 'react';
import './auth.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { loginValidation } from '../../validation';

const initialValues = {
  number: '',
  password: '',
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,

      validationSchema: loginValidation,

      onSubmit: (values) => {
        console.log(values);
      },
    });

  return (
    <div className="auth-container">
      <h2>
        Log <span style={{ color: '#67efaf' }}>In</span>{' '}
      </h2>
      <form onSubmit={handleSubmit} className="auth-form" action="">
        <div style={{marginBottom: '1.5rem'}}>
          <label htmlFor="number">Phone</label>
          <div className="auth-input phone-input">
            <p>+91</p>
            <input
              value={values.number}
              onChange={handleChange}
              id="number"
              autoComplete="off"
              type="number"
              placeholder="8909XXXXXX"
              name="number"
              onBlur={handleBlur}
            />
          </div>

          {errors.number && touched.number ? (
            <small style={{ color: 'red' }}>{errors.number}</small>
          ) : null}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="password">Password</label>

          <div className="auth-input password-input">
            <input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              id="password"
              placeholder="Password (> 3 characters)"
              autoComplete="off"
              type={showPassword ? 'text' : 'password'}
              name="password"
            />

            <i
              onClick={() => setShowPassword(!showPassword)}
              className={
                showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
              }
            ></i>
          </div>
          
          {errors.password && touched.password ? (
            <small style={{ color: 'red' }}>{errors.password}</small>
          ) : null}
        </div>

        <Link className="forgotPassword" to="/forgot-password">
          Forgot Password?
        </Link>

        <button type="submit" className="auth-btn">
          Login
        </button>
        


        <p className="auth-other-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </form>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Login;
