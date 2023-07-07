import React, { useEffect, useState } from 'react';
import Parity from '../../../components/parity/Parity';
import Start from '../../../components/start/Start';
import { dbObject } from '../../../helper/constant';

const FullParity = () => {
  const [startCart, setStartCart] = useState(false);
  const [color, setColor] = useState(null);

  const handleStart = () => {};

  const timerStart = async () => {
    try {
      const { data } = await dbObject.post('/parity/timer/start');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const startGame = async (value) => {
    setStartCart(false);

    try {
      const { data } = await dbObject.post('/parity/play', { ...value, color });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    timerStart();
  }, []);

  return (
    <>
      {startCart && (
        <Start startGame={startGame} name={`Parity - ${color}`} color={color} />
      )}

      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #1b5d21, #0a1d24)',
          marginBottom: '-2rem',
        }}
      >
        <div className="container">
          <Parity
            setStartCart={setStartCart}
            setColor={setColor}
            game="Parity"
            heading="Parity"
          />
        </div>
      </div>
    </>
  );
};

export default FullParity;
