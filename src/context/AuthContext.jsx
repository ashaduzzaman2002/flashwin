import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { baseURL } from '../helper/constant';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getUser = async () => {
    try {
      const { data } = await axios(`${baseURL}/auth`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
