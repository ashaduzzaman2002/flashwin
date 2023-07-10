import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from '../../helper/constant';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import { signupValidation } from '../../validation';
import { AuthContext } from '../../context/AuthContext';
import Toaster, { toastOptions } from '../../components/Toster/Toaster';

const initialValues = {
  number: '',
  otp: '',
  password: '',
  referralCode: '',
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

    const {user, loading} = useContext(AuthContext)
    const navigate = useNavigate()
  
    useEffect(() => {
      console.log(loading);
      if(user) return navigate('/')
    }, [user])
  

  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupValidation,
      onSubmit: async () => {
        try {
          const { data } = await axios.post(`${baseURL}/auth/register`, values);
          if (!data?.error) {
            toast.success('Logged In Successfully!', toastOptions);
          } else {
            toast.error(data.message, toastOptions);
          }
        } catch (error) {
          console.log(error);
        }
      },
    });


  return (
    <div className="auth-container">
      <h2>
        Create <span style={{ color: '#67efaf' }}>Account</span>
        {''}
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
              value={values.number}
              onChange={handleChange}
              onBlur={handleBlur}
              name="number"
            />
          </div>

          {errors.number && touched.number ? (
            <small style={{ color: 'red' }}>{errors.number}</small>
          ) : null}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="verification">Verification Code</label>
          <div className="verification-input">
            <input
              value={values.otp}
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
              placeholder="Enter code here"
              name="otp"
            />
            <button type="button">Send Verification Code</button>
          </div>

          {errors.otp && touched.otp ? (
            <small style={{ color: 'red' }}>{errors.otp}</small>
          ) : null}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="password">Create Password</label>

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
              className={showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
            ></i>
          </div>

          {errors.password && touched.password ? (
            <small style={{ color: 'red' }}>{errors.password}</small>
          ) : null}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="referralCode">Referral Code {'(Optional)'}</label>

          <div className="auth-input password-input">
            <input
              value={values.referralCode}
              onChange={handleChange}
              onBlur={handleBlur}
              id="referralCode"
              placeholder="Referral code"
              autoComplete="off"
              type="text"
              name="referralCode"
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

      <Toaster />
    </div>
  );
};

export default Register;
