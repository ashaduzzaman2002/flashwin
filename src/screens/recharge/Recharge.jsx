import React from 'react';
import './Recharge.css';
import BottomNav from '../../components/bottomNav/BottomNav';
import HeaderSecondar from '../../components/HeaderSecondar';
import { useState } from 'react';

const Recharge = () => {
  const quickAmount = [100, 300, 500, 700, 900, 1000];
  const [selected, setSelected] = useState()
  return (
    <div className="container">
      <BottomNav />
      <div className="withdraw-container">
        <HeaderSecondar title={'Recharge'} />

        <div className="withdraw-amount">
          <p>₹</p>
          <input type="number" placeholder="23~100000" />
        </div>

        <h2 className="withdraw-amount-header">Quick amount</h2>
        <div className="quick-amount">
          {quickAmount.map((item) => (
            <button key={item} className={`${selected === item && 'quick-amount-selected '}`} onClick={() => {setSelected(item); console.log(selected);}}>₹ {item}</button>
          ))}
        </div>

        <div>
          <button className="withdraw-btn">Recharge</button>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
