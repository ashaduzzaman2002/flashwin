import React, { useState } from 'react';
import './gameDetails.css';
import MyOrder from '../myorder/MyOrder';

const OtherUsers = () => {
  const [activeBtn, setActiveBtn] = useState('OtherPlayers');
  return (
    <>
      <div className="gameDetails-btn-group">
        <button
          onClick={() => setActiveBtn('OtherPlayers')}
          className={`${
            activeBtn === 'OtherPlayers' ? 'gameDetails-activeBtn' : ''
          }`}
        >
          Other Players
        </button>

        <button
          onClick={() => setActiveBtn('MyOrder')}
          className={`${
            activeBtn === 'MyOrder' ? 'gameDetails-activeBtn' : ''
          }`}
        >
          My Orders
        </button>
      </div>

      {
        activeBtn === 'OtherPlayers'? <div className="gameDetails-others">
        <div>
          <p>Period</p>
          <small>18:54</small>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p>User</p>
          <small>****18787</small>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p>Select</p>
          <small>2x2</small>
        </div>

        <div style={{ textAlign: 'right' }}>
          <p>Point</p>
          <small>₹ 90</small>
        </div>
      </div> : <MyOrder />
      }
      
    </>
  );
};

export default OtherUsers;
