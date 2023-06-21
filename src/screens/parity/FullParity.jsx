import React from 'react';
import Parity from '../../components/parity/Parity';
import Start from '../../components/start/Start';

const FullParity = () => {
  return (
    <>
      <Start name={'Parity - Blue'} />
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #1b5d21, #0a1d24)',
          marginBottom: '-2rem',
        }}
      >
        <div className="container">
          <Parity heading="Parity" />
        </div>
      </div>
    </>
  );
};

export default FullParity;
