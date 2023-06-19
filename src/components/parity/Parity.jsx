import React from 'react';
import './parity.css';
import OtherUser from '../OtherUsers'

const Parity = ({ heading }) => {
  return (
    <div className="parity-container">
      <h2>{heading}</h2>

      <div className="parity-top">
        <div className="parity-period">
          <p>Period</p>
          <p>23034151</p>
        </div>

        <div className="parity-count">
          <p>Count Down</p>
          <div className='parity-count-box'>
            <p>0</p>
            <p>secs</p>
          </div>
        </div>
      </div>

      <OtherUser />
    </div>
  );
};

export default Parity;
