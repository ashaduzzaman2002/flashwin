import { createContext, useEffect, useState } from 'react';
import { dbObject } from '../helper/constant';


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [walletBalance, setWalletBalance] = useState('0.0');
  const [commissionHistory, setCommissionHistory] = useState([])


  const getUser = async () => {
    try {
      const { data } = await dbObject.get("/auth");
      console.log(data.data);
      if(!data.error){
        setUser(data.data);
      }
     
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

  const getCommissionHistory = async () => {
    try {
      const {data} = await dbObject.get('/commision/history')
      setCommissionHistory(data.data);
      console.log('commission', data.data);
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    getUser();
    fetchWallet();
    getCommissionHistory()
  }, []);

  return (
    <AuthContext.Provider value={{ user, walletBalance, commissionHistory }}>{children}</AuthContext.Provider>
  );
};
