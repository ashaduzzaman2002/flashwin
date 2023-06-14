import React from 'react';
// import SpinWheel from '../components/SpinWheel'
import '../styles/LuckyWheel.css';
import { Cow, ElephantIcon, Wheel, roulette, tiger } from '../assets';

const LuckyWheel = () => {
  const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div
      className="container"
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #47072a, #071724)',
      }}
    >
      <div className="lucky-wheel-container">
        <h2>Cirlce</h2>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '1rem',
          }}
        >
          <p>Game ends in</p>
          <div
            style={{
              height: 40,
              width: 40,
              background: 'rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              borderRadius: 10,
            }}
          >
            <p>0</p>
          </div>
        </div>

        <div className="wheel-container">
          <img src={Wheel} alt="" />

          <button className="spin-btn" type="button">
            <img src={roulette} alt="" />
          </button>
        </div>

        <div className="luckyWehel-btn-group">
          <Button bgColor="#d32f2e" colorName="Red" ratio="1:2" />
          <Button bgColor="#1976d3" colorName="Blue" ratio="1:18" />
          <Button bgColor="#ff9f00" colorName="Orange" ratio="1:2" />
        </div>

        <div className="sticker-group">
          <Sticker icon={Cow} ratio={'1:2'} />
          <Sticker icon={tiger} ratio={'1:18'} />
          <Sticker icon={ElephantIcon} ratio={'1:2'} />
          <Sticker icon={Cow} ratio={'1:2'} />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
            fontSize: '1.1rem',
            color: '#9d9fac',
          }}
        >
          <p
            style={{
              background: '#465a65',
              color: '#fff',
              padding: '0.4rem 1.5rem',
              borderRadius: 20,
            }}
          >
            1-10
          </p>
          <p>11-20</p>
          <p>21-30</p>
          <p>31-36,000</p>
        </div>

        <div className='num-group'>
          {numList.map((num) => (
            <div key={num}>
              <p>{num}</p>
            </div>
          ))}
        </div>

        <div>
          <p style={{textAlign: 'center', marginTop: 5, color: '#ebe7f5', fontSize: 15}}>1:36</p>
        </div>

        <div className='lucky-wheel-btn-group'>
            <button style={{background: '#69efb0', color: 'black'}}>Other Players</button>
            <button>My Orders</button>
        </div>

        <div className='luckyWheel-others'>
          <div>
            <p>Period</p>
            <small>18:54</small>
          </div>

          <div style={{textAlign: 'center'}}>
            <p>User</p>
            <small>****18787</small>
          </div>

          <div style={{textAlign: 'center'}}>
            <p>Select</p>
            <small>2x2</small>
          </div>

          <div style={{textAlign: 'right'}}>
            <p>Point</p>
            <small>₹ 90</small>
          </div>
        </div>
      </div>
    </div>
  );
};

const Button = ({ bgColor, colorName, ratio }) => (
  <div className="luckyWehel-btn">
    <button style={{ background: bgColor }}>{colorName}</button>
    <p>{ratio}</p>
  </div>
);

const Sticker = ({ icon, ratio }) => (
  <div className="sticker">
    <div>
      <img src={icon} alt="" />
    </div>

    <p>{ratio}</p>
  </div>
);

export default LuckyWheel;
