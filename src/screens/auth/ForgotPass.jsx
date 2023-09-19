import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { signupValidation } from '../../validation';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Toaster, { toastOptions } from '../../components/Toster/Toaster';
import { toast } from 'react-toastify';
import { dbObject } from '../../helper/constant';
import {Toast} from '../../helper'

const initialValues = {
  number: '',
  password: '',
  otp: '',
};

const ForgotPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [otpSent, setOtpSent] = useState(false)

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return navigate('/');
  }, [user]);

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

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupValidation,

      onSubmit: async () => {
        try {
          const { data } = await dbObject.post('/auth/forget', {
            new_password: values.password,
            number: values.number,
            otp: values.otp,
          })
          if (!data.error) {
            values.number = ''
            values.otp = ''
            values.password = ''
            setOtpSent(false)
            // toast.success(data.message, toastOptions)
            Toast(data.message, '')

            setTimeout(() => {
              navigate('/login')
            }, 1000)
          } else {
            // toast.error(data.message, toastOptions)
            Toast(data.message, '')
          }

        } catch (error) {
          console.log(error)
        }
      },
    });


  const sendOtp = async () => {
    if (!values.number) {
      // return toast.error('Number is required', toastOptions)
      return Toast('Number is required', '')
    }

    if (seconds === 0) {
      try {
        const { data } = await dbObject.post('/auth/sendotp', { number: values.number })
        setSeconds(60)
        setOtpSent(true)
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (
    <div className="auth-container">
      <Toaster />
      <h2>
        Forgot <span style={{ color: '#67efaf' }}>Password</span>{' '}
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
            <i className="fa-solid fa-lock"></i>
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
                showPassword
                  ? 'fa-solid fa-eye' + ' password'
                  : 'fa-solid fa-eye-slash' + ' password'
              }
            ></i>
          </div>
          {errors.password && touched.password ? (
            <small style={{ color: 'red' }}>{errors.password}</small>
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
              name="otp"
              type="number"
              value={values.otp}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter code here"
            />
            <button disabled={otpSent} onClick={sendOtp} type="button">OTP</button>
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
