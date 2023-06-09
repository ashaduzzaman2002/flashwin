import { createContext, useEffect, useState } from 'react';
import { dbObject } from '../helper/constant';


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [walletBalance, setWalletBalance] = useState('0.0');
  const [commissionHistory, setCommissionHistory] = useState([])
  const [loading, setLoading] = useState(false)


  const getUser = async () => {
    try {
      setLoading(true)
      const { data } = await dbObject.get("/auth");
      console.log(data.data);
      if(!data.error){
        setUser(data.data);
      }
      setLoading(false)

     
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWallet = async () => {
    try {
      const { data } = await dbObject.get("/wallet/fetch");
      setWalletBalance(data?.data?.total_bal.toFixed(2));
      // console.log(data.data.total_bal);
    } catch (error) {
      console.log(error);
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
  }, [setLoading]);

  return (
    <AuthContext.Provider value={{ user, walletBalance, commissionHistory, loading, setUser }}>{children}</AuthContext.Provider>
  );
};
