import React from 'react';
import SpinWheel from '../components/SpinWheel'
import '../styles/LuckyWheel.css';
import { Elephant } from '../assets';

const LuckyWheel = () => {
  return (
    <div className="container" style={{width: '100%', minHeight: '100vh', background: 'linear-gradient(180deg, #47072a, #071724)'}}>
      <div className="lucky-wheel-container">
        <h2>Cirlce</h2>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: 'center',
            marginTop: '1rem',
          }}
        >
          <Card1 num={'11'} />
          <Card1 num={'11'} />
          <Card1 num={'11'} />
          <Card1 num={'11'} />
          <Card1 num={'11'} />
        </div>
        <SpinWheel />
      </div>
    </div>
  );
};

const Card1 = ({ num }) => (
  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'}}>
    <div style={{background: '#644a68', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', borderRadius: '1rem'}}>
      <p>{num}</p>
    </div>

    <img style={{ width: 30 }} src={Elephant} alt="" />
  </div>
);

export default LuckyWheel;
