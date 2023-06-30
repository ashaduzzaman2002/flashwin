import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { baseURL, dbObject } from '../helper/constant';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getUser = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/auth`, {
        withCredentials: true, // Include cookies in the request
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (e, number, password) => {
    e.preventDefault();

    try {
      const user = {
        password,
        number,
      };
      const { data } = await axios.post(`${baseURL}/auth/login`, user);

      if (!data?.error) {
        toast.success('Logged In Successfully!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else {
        toast.error(data.message, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }

      console.log('logged in', data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [login]);

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};
