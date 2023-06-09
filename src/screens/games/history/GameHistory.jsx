import React, { useState } from 'react';
import './GameHistory.css';
import { bomb, emptyBox } from '../../../assets';

const GameHistory = () => {
  const [activeBtn, setActiveBtn] = useState('minesweeper');
  const [minesweeper, setMinesweeper] = useState(true);
  const [circle, setCircle] = useState(false);
  const [fastParity, setFastParity] = useState(true);
  const [fullParity, setFullParity] = useState(true);

  return (
    <div className="container">
      <div className="gameHistory-container">
        <h2>Game History</h2>

        <div className="gameHistory-content">
          <div className="gameHistory-btn-group">
            <button
              onClick={() => {
                setActiveBtn('minesweeper');
              }}
              className={`${
                activeBtn === 'minesweeper' ? 'gameHistory-activeBtn' : ''
              }`}
            >
              Minesweeper
            </button>
            <button
              onClick={() => {
                setActiveBtn('circle');
              }}
              className={`${
                activeBtn === 'circle' ? 'gameHistory-activeBtn' : ''
              }`}
            >
              Circle
            </button>
            <button
              onClick={() => {
                setActiveBtn('fast-parity');
              }}
              className={`${
                activeBtn === 'fast-parity' ? 'gameHistory-activeBtn' : ''
              }`}
            >
              Fast-Parity
            </button>
            <button
              onClick={() => {
                setActiveBtn('full-parity');
              }}
              className={`${
                activeBtn === 'full-parity' ? 'gameHistory-activeBtn' : ''
              }`}
            >
              Parity
            </button>
          </div>

          {activeBtn === 'minesweeper' && (
            <div className="game-history-card-group">
              {minesweeper ? (
                <div className="mine-myorder">
                  <div className="game-type">
                    <div
                      className={`minesweeper-game-2x2`}
                      style={{ marginBottom: 0 }}
                    >
                      <div>
                        <img style={{ width: '80%' }} src={bomb} alt="" />
                      </div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>

                  <div style={{ marginLeft: '1rem' }}>
                    <div style={{ margin: 0 }} className="myorder-text">
                      <div>
                        <p>Points</p>
                        <p>₹ 20</p>
                      </div>

                      <div>
                        <p>Pass</p>
                        <p>3</p>
                      </div>

                      <div>
                        <p>Bonous</p>
                        <p style={{ color: '#7eb298' }}>+₹20.50</p>
                      </div>
                    </div>

                    <p style={{ marginTop: 8, fontSize: 15, color: '#e5eae7' }}>
                      Delivery: ₹19.00 Fees: ₹1.00
                    </p>
                    <p style={{ marginTop: 8, fontSize: 15, color: '#e5eae7' }}>
                      12/07/2023 12:32
                    </p>
                  </div>
                </div>
              ) : (
                <div className="emptyImage">
                  <img src={emptyBox} alt="" />
                </div>
              )}
            </div>
          )}

          {activeBtn === 'circle' &&
            (circle ? (
              ''
            ) : (
              <div className="emptyImage">
                <img src={emptyBox} alt="" />
              </div>
            ))}

          {activeBtn === 'fast-parity' &&
            (fastParity ? (
              <div className="game-history">
                <FastParityCard />
                <FastParityCard />
              </div>
            ) : (
              <div className="emptyImage">
                <img src={emptyBox} alt="" />
              </div>
            ))}

          {activeBtn === 'full-parity' &&
            (fullParity ? (
              <div className="game-history">
                <FullParityCard />
                <FullParityCard />
                <FullParityCard />
                <FullParityCard />
              </div>
            ) : (
              <div className="emptyImage">
                <img src={emptyBox} alt="" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const FastParityCard = () => (
  <div className="history-parity">
    <div className="date">
      <p>Period 15:58</p>
      <p>11/07/2023 15:58</p>
    </div>

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

    <div className="hr80" />

    <div className="parity-delivery">
      <p>Delivery: ₹19.00</p>
      <p>Fees: ₹1.00</p>
    </div>

    <div className="history-parity-btn">
      <button style={{ backgroundColor: '#ffdcaa' }}>To Verify</button>
      <button style={{ backgroundColor: '#e99d97' }}>Complaint</button>
    </div>
  </div>
);

const FullParityCard = () => (
  <div className="history-parity">
    <div className="date">
      <p>Period 15:58</p>
      <p>11/07/2023 15:58</p>
    </div>

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
              <p>3</p>
            </td>
            <td>₹10</td>
            <td className="parity-selected parity-result">
              <p>4</p>
            </td>
            <td>₹0.00</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="hr80" />

    <div className="parity-delivery">
      <p>Delivery: ₹19.00</p>
      <p>Fees: ₹1.00</p>
    </div>

    <div className="history-parity-btn">
      <button style={{ backgroundColor: '#ffdcaa' }}>To Verify</button>
      <button style={{ backgroundColor: '#e99d97' }}>Complaint</button>
    </div>
  </div>
);

export default GameHistory;
