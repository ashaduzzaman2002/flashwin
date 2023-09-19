import React, { useState, useContext, useEffect } from "react";
import "./auth.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { loginValidation } from "../../validation";
import { dbObject } from "../../helper/constant";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/loading/Loading";
import Toaster, { toastOptions } from "../../components/Toster/Toaster";
import { Toast } from "../../helper";

const initialValues = {
  number: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user, loading, setUser, setIsLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      if (location.state) {
        navigate(location.state?.from, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user]);

  useEffect(() => {
    const handleDOMContentLoaded = () => {
      const inputFields = document.querySelectorAll('input');
      if (inputFields.length > 0) {
        inputFields.forEach(function (inputField) {
          inputField.value = '';
        });
      }
    };

    window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, []);


  // useEffect(() => {
  //   // Add a 500ms (0.5 second) delay before clearing input fields
  //   const delay = 1000; // 500 milliseconds

  //   const timeoutId = setTimeout(() => {
  //     var inputFields = document.querySelectorAll('input');
  //     if (inputFields.length > 0) {
  //       inputFields.forEach(function(inputField) {
  //         inputField.value = '';
  //       });
  //     }
  //   }, delay);

  //   // Clear the timeout when the component unmounts
  //   return () => clearTimeout(timeoutId);
  // }, []);

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginValidation,
      onSubmit: async () => {
        try {
          const { data } = await dbObject.post("/auth/login", values);
          console.log(data);
          if (!data?.error) {
            // toast.success('Logged In Successfully!', toastOptions);
            Toast("Logged In Successfully!", "");

            setTimeout(() => {
              navigate("/");
              setUser(data.data[0]);
              setIsLogin(true);
            }, 1000);
          } else {
            // toast.error(data.message, toastOptions);
            Toast(data.message, "");
          }
        } catch (error) {
          console.log(error);
        }
      },
    });

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="auth-container">
        <h2>
          Log <span style={{ color: "#67efaf" }}>In</span>{" "}
        </h2>
        <form onSubmit={handleSubmit} className="auth-form " action="">
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="number">Phone</label>
            <div className="auth-input phone-input">
              <i className="fa-solid fa-mobile-screen-button"></i>
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
              <small style={{ color: "red" }}>{errors.number}</small>
            ) : null}
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="password">Password</label>

            <div className="auth-input password-input">
              <i className="fa-solid fa-lock"></i>
              <input
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id="password"
                placeholder="Password (> 3 characters)"
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                name="password"
              />

              <i
                onClick={() => setShowPassword(!showPassword)}
                className={
                  showPassword
                    ? "fa-solid fa-eye" + " password"
                    : "fa-solid fa-eye-slash" + " password"
                }
              ></i>
            </div>

            {errors.password && touched.password ? (
              <small style={{ color: "red" }}>{errors.password}</small>
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

        <Toaster />
      </div>
    );
  }
};

export default Login;
