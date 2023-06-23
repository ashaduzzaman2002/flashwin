import React from 'react';
import './CheckIn.css';
import { coin, treasure } from '../../assets';

const CheckIn = () => {
  const dayList = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div
      style={{
        background: 'linear-gradient(#6b2e01, #071724)',
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <div className="checkin-container">
          <h1>Check In</h1>

          <div className="daily-rewards">
            {dayList.map((item) => (
              <div key={item}>
                <p>Day {item}</p>
                <img src={coin} alt="" />
              </div>
            ))}
          </div>

          <div>
            <button className="checkin-btn">Check In</button>
          </div>

          <p className='checkin-desc'>Check in for 7 consecutive days to get the key for mega tresure box and recive the mysterious prizes!</p>

            <div className='checkin-tresure'>
            <img src={treasure} alt="" />
            <div  />
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
