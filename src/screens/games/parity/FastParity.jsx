import React, { useEffect, useState } from 'react';
import { database } from '../../../firebase.config';

import '../../../components/parity/parity.css';
import Start from '../../../components/start/Start';
import { onValue, ref } from 'firebase/database';
import { dbObject } from '../../../helper/constant';

const FastParity = () => {
  const firstCardList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const probabilityBox = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [activeBtn, setActiveBtn] = useState('probability');
  const [activeBtn2, setActiveBtn2] = useState('OtherPlayers');
  const [timer, setTimer] = useState(0);
  const [startCart, setStartCart] = useState(false);
  const [color, setColor] = useState(null);
  const [number, setNumber] = useState(null);

  useEffect(() => {
    const fastParityRef = ref(database, 'fast_parity/timer');

    onValue(fastParityRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data)[0];
        const { time } = data[key];
        setTimer(time);
      }
    });
  }, []);

  const startGame = async (value) => {
    setStartCart(false);

    try {
      const { data } = await dbObject.post('/parity/play', { ...value, color });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {startCart && (
        <Start
          startGame={startGame}
          name={`Fast Parity - ${color || number}`}
          setStartCart={setStartCart}
          color={color}
        />
      )}
      <div
        style={{
          width: '100%',
          minHeight: '95vh',
          background: 'linear-gradient(180deg, #310b5e, #0a1527)',
          marginBottom: '-2rem',
        }}
      >
        <div className="container">
          <div className="parity-container">
            <h2>Fast Parity</h2>

            <div className="parity-top">
              <div className="parity-period">
                <p>Period</p>
                <p>23034151</p>
              </div>

              <div className="parity-count">
                <p>Count Down</p>
                <div className="parity-count-box">
                  <p>{timer}</p>
                  <p>secs</p>
                </div>
              </div>
            </div>

            <div className="prity-colors">
              <div
                onClick={() => {
                  setColor('Red');
                  setNumber(null);
                  setStartCart(true);
                }}
                style={{ backgroundColor: '#d72e2a' }}
              >
                <p>Join Red</p>
                <p>1:2</p>
              </div>

              <div
                onClick={() => {
                  setColor('Blue');
                  setNumber(null);
                  setStartCart(true);
                }}
                style={{ backgroundColor: '#1976d3' }}
              >
                <p>Join Blue</p>
                <p>1:4.5</p>
              </div>

              <div
                onClick={() => {
                  setColor('Green');
                  setNumber(null);
                  setStartCart(true);
                }}
                style={{ backgroundColor: '#388e3d' }}
              >
                <p>Join green</p>
                <p>1:2</p>
              </div>
            </div>

            <div className="paritynum-btns">
              {firstCardList.map((item, i) => (
                <div
                key={i}
                  onClick={() => {
                    setNumber(item);
                    setColor(null);
                    setStartCart(true);
                  }}
                >
                  <p>{item}</p>
                  <i className="fa-solid fa-bolt"></i>
                </div>
              ))}
            </div>

            <div className="parity-btn">
              <button
                onClick={() => setActiveBtn('continuos')}
                className={activeBtn === 'continuos' ? 'parity-btn-active' : ''}
              >
                Continuos
              </button>
              <button
                onClick={() => setActiveBtn('record')}
                className={activeBtn === 'record' ? 'parity-btn-active' : ''}
              >
                Record
              </button>
              <button
                onClick={() => setActiveBtn('probability')}
                className={
                  activeBtn === 'probability' ? 'parity-btn-active' : ''
                }
              >
                Probability
              </button>
            </div>

            {activeBtn === 'continuos' && <ContinuousTab />}

            {activeBtn === 'record' && <Record />}

            {activeBtn === 'probability' && (
              <Probability probabilityBox={probabilityBox} />
            )}

            <div className="gameDetails-btn-group">
              <button
                onClick={() => setActiveBtn2('OtherPlayers')}
                className={`${
                  activeBtn2 === 'OtherPlayers' ? 'gameDetails-activeBtn' : ''
                }`}
              >
                Other Players
              </button>

              <button
                onClick={() => setActiveBtn2('MyOrder')}
                className={`${
                  activeBtn2 === 'MyOrder' ? 'gameDetails-activeBtn' : ''
                }`}
              >
                My Orders
              </button>
            </div>

            {activeBtn2 === 'OtherPlayers' ? (
              <div className="gameDetails-others">
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
              </div>
            ) : (
              <div>
                <table style={{ width: '100%', marginTop: '1rem' }}>
                  <thead>
                    <tr className="parity-myorder-header parity-myorder">
                      <td>Period</td>
                      <td>Select</td>
                      <td>Point</td>
                      <td>Result</td>
                      <td>Amount</td>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="parity-myorder">
                      <td>18:01</td>
                      <td className="parity-selected">
                        <p
                          style={{
                            backgroundColor: '#1776d7',
                            width: '100%',
                            color: '#fff',
                          }}
                        >
                          blue
                        </p>
                      </td>
                      <td>₹10</td>
                      <td className="parity-selected parity-result">
                        <p style={{ backgroundColor: '#388e3d' }}>7</p>
                      </td>
                      <td>+₹0.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

function ContinuousTab() {
  const fastParityContinuousList = [
    0,
    7,
    '-',
    8,
    0,
    6,
    1,
    9,
    3,
    5,
    0,
    7,
    7,
    8,
    0,
    7,
    8,
    0,
    6,
    1,
    9,
    3,
  ];
  return (
    <div className="continuous-tab">
      <div className="scroll-container">
        {fastParityContinuousList?.map((item, i) => (
          <div key={i} className="parity__records__circle">
            <div className="parity__records__circle__no">{item}</div>
            <div
              className="parity__records__circle__inner"
              style={{
                backgroundColor:
                  item === '-'
                    ? '#fec007'
                    : item % 2 === 0
                    ? '#f44238'
                    : '#3b8d3c',
              }}
            >
              <div
                className="parity__records__circle__col"
                style={{
                  background:
                    item === 0 ? '#f24337' : item === 5 ? '#1f98ef' : '',
                }}
              ></div>
              <div
                className="parity__records__circle__col"
                style={{
                  background:
                    item === 0 ? '#0f45a2' : item === 5 ? '#388e3d' : '',
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Record = () => {
  const numberList = [
    2,
    2,
    2,
    2,
    9,
    9,
    0,
    '-',
    5,
    9,
    8,
    8,
    8,
    8,
    6,
    4,
    8,
    7,
    1,
    4,
    9,
    7,
    1,
    2,
    8,
    1,
    4,
  ];

  return (
    <div className="parity-record">
      <p>Fast Parity Record</p>
      <div className="parity-record-box">
        {numberList.map((item, i) => (
          <div key={i} className="parity__records__circle">
            <div className="parity__records__circle__no">{item}</div>
            <div
              className="parity__records__circle__inner"
              style={{
                backgroundColor:
                  item === '-'
                    ? '#fec007'
                    : item % 2 === 0
                    ? '#f44238'
                    : '#3b8d3c',
              }}
            >
              <div
                className="parity__records__circle__col"
                style={{
                  background:
                    item === 0 ? '#f24337' : item === 5 ? '#1f98ef' : '',
                }}
              ></div>
              <div
                className="parity__records__circle__col"
                style={{
                  background:
                    item === 0 ? '#0f45a2' : item === 5 ? '#388e3d' : '',
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Probability = ({ probabilityBox }) => (
  <>
    <div>
      <p
        style={{
          textAlign: 'center',
          marginTop: '1.2rem',
          fontSize: 15,
        }}
      >
        1 item today
      </p>
    </div>

    <div className="game-first-row">
      <div>
        <p>0</p>
      </div>

      <div>
        <p>0</p>
      </div>

      <div>
        <p>0</p>
      </div>

      <div className="game-first-row-box-out">
        <p style={{ backgroundColor: '#d72e2a' }}>R</p>
        <div
          className="game-first-row-box"
          style={{ backgroundColor: '#ffcdd2' }}
        ></div>
      </div>

      <div className="game-first-row-box-out">
        <p style={{ backgroundColor: '#1976d3' }}>B</p>
        <div
          className="game-first-row-box"
          style={{ backgroundColor: '#bbdefa' }}
        ></div>
      </div>

      <div className="game-first-row-box-out">
        <p style={{ backgroundColor: '#388e3d' }}>G</p>
        <div
          className="game-first-row-box"
          style={{ backgroundColor: '#c8e6ca' }}
        ></div>
      </div>
    </div>

    <div className="probabilty-game-second-row game-second-row">
      {probabilityBox.map((item, i) => (
        <div key={i} className="game-second-row-color">
          <p>{item}</p>
        </div>
      ))}

      {probabilityBox.map((item, i) => (
        <div key={i} className="numbers">
          <p>{item}</p>
          <p>0</p>
        </div>
      ))}
    </div>
  </>
);

export default FastParity;
