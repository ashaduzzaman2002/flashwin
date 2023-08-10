import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL, dbObject } from '../../helper/constant';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { signupValidation } from '../../validation';
import { AuthContext } from '../../context/AuthContext';
import Toaster, { toastOptions } from '../../components/Toster/Toaster';
import {Toast} from '../../helper'

const initialValues = {
  number: '',
  otp: '',
  password: '',
  referralCode: '',
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [otpSent, setOtpSent] = useState(false)

  const { user, loading } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) return navigate('/')
  }, [user])


  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupValidation,
      onSubmit: async () => {
        try {
          const { data } = await axios.post(`${baseURL}/auth/register`, values);
          if (!data?.error) {
            // toast.success('Sign In Successfully!', toastOptions);
            Toast('Sign In Successfully!', toastOptions)

            setTimeout(() => {
              navigate('/login')
            }, 1000)
          } else {
            // toast.error(data.message, toastOptions);
            Toast(data.message, '')
          }
        } catch (error) {
          console.log(error);
        }
      },
    });

  useEffect(() => {
    if (seconds > 0 && otpSent) {
      const interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (seconds <= 0) {
      setOtpSent(false)
    }
  }, [seconds, otpSent]);


  const sendOtp = async () => {
    if (!values.number) {
      // return toast.error('Number is required', toastOptions)
      return Toast('Number is required', '')
    }

    try {
      console.log(values.number)
      const { data } = await dbObject.post('/auth/sendotp', { number: values.number })
      console.log(data)
      // toast.success('OTP sent to ' + values.number, toastOptions)
      Toast('OTP sent to ', values.number)
      setSeconds(60)
      setOtpSent(true)
    } catch (error) {
      console.log(error)
    }

  }


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
            <i className="fa-solid fa-mobile-screen-button"></i>
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="verification">Verification Code</label>
            {
              otpSent && seconds > 0 ? <div >Resend otp in <span>{seconds}</span> s</div> : null
            }

          </div>
          <div className="verification-input">
            <input
              maxLength={6}
              value={values.otp}
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
              placeholder="Enter code here"
              name="otp"
            />
            <button disabled={otpSent} onClick={sendOtp} type="button">OTP</button>
          </div>

          {errors.otp && touched.otp ? (
            <small style={{ color: 'red' }}>{errors.otp}</small>
          ) : null}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="password">Create Password</label>

          <div className="auth-input password-input">
            <i className="fa-solid fa-lock"></i>
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
              className={showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash' + ' password'}
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
