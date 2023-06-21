import React, { useState } from 'react';
import './start.css';

const Start = ({ name }) => {
  const [contactPoint, setContactPoint] = useState(10)

  return (
    <div className="start-container">
      <div className="start-box">
        <h2 className="game-name">{name}</h2>
        <p>Points</p>

        <div className="points-div">
          <h3>INR 0.0</h3>
          <button>
            <i className="fa-solid fa-clock-rotate-left"></i> Recharge
          </button>
        </div>

        <div className="contract-point">
          <p>Contract Points</p>
          <div>
            <button onClick={() => setContactPoint(10)} className={contactPoint === 10? 'contract-point-selected': ''}>10</button>
            <button onClick={() => setContactPoint(100)} className={contactPoint === 100? 'contract-point-selected': ''}>100</button>
            <button onClick={() => setContactPoint(1000)} className={contactPoint === 1000? 'contract-point-selected': ''}>1000</button>
            <button onClick={() => setContactPoint(10000)} className={contactPoint === 10000? 'contract-point-selected': ''}>10000</button>
          </div>
        </div>

        <div className="start-number-outer">
          <p>Number</p>

          <div className="start-number">
            <div>
              <button>-5</button>
              <button>-1</button>
            </div>
            <p>5</p>
            <div>
              <button>1</button>
              <button>5</button>
            </div>
          </div>
        </div>

        <div className="delivery">
          <div>
            <p>Delivery</p>
            <p>50.00</p>
          </div>

          <div>
            <p>Fee</p>
            <p>0.00</p>
          </div>

          <div>
            <p>Amount</p>
            <p>+176.00</p>
          </div>
        </div>
        <div style={{ width: '100%', marginTop: '-3rem' }}>
          <button className="btn">Start</button>
        </div>
      </div>
    </div>
  );
};

export default Start;
