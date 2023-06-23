import React from 'react';
import './withdraw.css';
import BottomNav from '../../components/bottomNav/BottomNav';
import HeaderSecondar from '../../components/HeaderSecondar';

const Withdraw = () => {
  return (
    <div className="container">
      <BottomNav />
      <div className="withdraw-container">
        <HeaderSecondar title={'Withdraw'} />

        <h2 className='withdraw-amount-header'>Withdrawal amount</h2>

        <div className='withdraw-amount'>
          <p>₹</p>
          <input type="number" placeholder='23~100000' />
        </div>

        <div className='withdraw-note'>
          <h3>Note: </h3>
          <p>Amount {'<'} <span>Rs. 1500,</span> Fee: <span>Rs. 30,</span> Maximum: <span>Rs. 167</span> </p>
          <p>Amount {'>='} <span>Rs. 1500,</span> Fee: <span>2%,</span> Maximum: <span>Rs. 35</span> </p>
        </div>

        <div>
          <button className='withdraw-btn'>Withdraw</button>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
