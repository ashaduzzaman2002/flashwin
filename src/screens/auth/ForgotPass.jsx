import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { signupValidation } from '../../validation';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const initialValues = {
  number: '',
  password: '',
  otp: '',
};

const ForgotPass = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {user, loading} = useContext(AuthContext)
    const navigate = useNavigate()
  
    useEffect(() => {
      console.log(loading);
      if(user) return navigate('/')
    }, [user])
  


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupValidation,

      onSubmit: () => {
        console.log(values);
      },
    });
  return (
    <div className="auth-container">
      <h2>
        Forgot <span style={{ color: '#67efaf' }}>Password</span>{' '}
      </h2>
      <form onSubmit={handleSubmit} className="auth-form" action="">
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="number">Phone</label>
          <div className="auth-input phone-input">
            <p>+91</p>
            <input
              id="number"
              autoComplete="off"
              type="number"
              placeholder="8909XXXXXX"
              name="number"
              value={values.number}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          {errors.number && touched.number ? (
            <small style={{ color: 'red' }}>{errors.number}</small>
          ) : null}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="password">New Password</label>

          <div className="auth-input password-input">
            <input
              id="password"
              placeholder="Enter new password"
              autoComplete="off"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
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

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="verification">Verification Code</label>
          <div className="verification-input">
            <input
              name="otp"
              type="number"
              value={values.otp}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter code here"
            />
            <button type="button">Send Verification Code</button>
          </div>

          {errors.otp && touched.otp ? (
            <small style={{ color: 'red' }}>{errors.otp}</small>
          ) : null}
        </div>

        <button type="submit" className="auth-btn">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPass;
