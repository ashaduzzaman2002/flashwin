import React from 'react';
import Parity from '../../components/parity/Parity';

const FastParity = () => {
  return (
    <div style={{
        width: '100%',
        minHeight: '95vh',
        background: 'linear-gradient(180deg, #310b5e, #0a1527)',
      }}>
      <div className="container">
        <Parity heading='Past Parity' />
      </div>
    </div>
  );
};

export default FastParity;
