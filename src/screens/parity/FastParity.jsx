import React from 'react';
import Parity from '../../components/parity/Parity';
import Start from '../../components/start/Start';

const FastParity = () => {
  return (
    <>
      <Start name={'Fast Party - Red'} />
      <div
        style={{
          width: '100%',
          minHeight: '95vh',
          background: 'linear-gradient(180deg, #310b5e, #0a1527)',
          marginBottom: '-2rem',
        }}
      >
        <div className="container">
          <Parity icon={true} heading="Past Parity" />
        </div>
      </div>
    </>
  );
};

export default FastParity;
