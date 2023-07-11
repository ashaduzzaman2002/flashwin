import React, { useEffect, useState } from 'react';
import { dbObject } from '../helper/constant';
import { useNavigate } from 'react-router-dom';

const HeaderSecondar = ({ title }) => {

  const [walletBalance, setWalletBalance] = useState('0.0');
  let navigate = useNavigate();

  const openPage = async ()=>{
    if(title == "Recharge"){
      navigate("/recharge-history");
    } else{
      navigate("/withdraw-history");
    }
  }


  const fetchWallet = async () => {
    try {
      const { data } = await dbObject.get("/wallet/fetch");
      setWalletBalance(data.data.total_bal.toFixed(2));
      // console.log(data.data.total_bal);
    } catch (error) {
      console.log("jsjjs");
    }
  }
  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <div className="header-secondary">
      <h1>{title}</h1>

      <div className='header-secondary-card'>
        <div>
          <p>Total Blance Available</p>
          <p>₹ {walletBalance}</p>
        </div>

        <button onClick={openPage}>
          <i className="fa-solid fa-clock-rotate-left"></i> History
        </button>
      </div>
    </div>
  );
};

export default HeaderSecondar;
