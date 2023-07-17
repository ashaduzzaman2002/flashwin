import React from 'react';
import './Recharge.css';
import BottomNav from '../../components/bottomNav/BottomNav';
import HeaderSecondar from '../../components/HeaderSecondar';
import { useState } from 'react';
import { dbObject } from '../../helper/constant';

const Recharge = () => {
  const quickAmount = [100, 300, 500, 700, 900, 1000];
  const [selected, setSelected] = useState();
  const [amount, setAmount] = useState('1000');

  const rechargeRequest = async () => {
    try {
      const amountMap = {
        amount
      };
      const { data } = await dbObject.post("/payment/deposit", amountMap);
      if(!data.error){
        window.open(data.data.payurl);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <BottomNav />
      <div className="withdraw-container">
        <HeaderSecondar title={'Recharge'} />

        <div className="withdraw-amount">
          <p>₹</p>
          <input type="number" placeholder="23~100000" value={amount} onChange={(e)=> setAmount(e.target.value)} />
        </div>

        <h2 className="withdraw-amount-header">Quick amount</h2>
        <div className="quick-amount">
          {quickAmount.map((item) => (
            <button key={item} className={`${selected === item && 'quick-amount-selected '}`} onClick={() => { setSelected(item); setAmount(item); }}>₹ {item}</button>
          ))}
        </div>

        <div>
          <button className="withdraw-btn" onClick={rechargeRequest}>Recharge</button>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
