import { createContext, useEffect, useState } from 'react';
import { dbObject } from '../helper/constant';


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [walletBalance, setWalletBalance] = useState('0.0');


  const getUser = async () => {
    try {
      const { data } = await dbObject.get("/auth");
      setUser(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWallet = async () => {
    try {
      const { data } = await dbObject.get("/wallet/fetch");
      setWalletBalance(data.data.total_bal);
      // console.log(data.data.total_bal);
    } catch (error) {
      console.log("jsjjs");
    }
  }
  

  useEffect(() => {
    getUser();
    fetchWallet();
  }, []);

  return (
    <AuthContext.Provider value={{ user, walletBalance }}>{children}</AuthContext.Provider>
  );
};
