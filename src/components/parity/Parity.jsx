import React, { useState } from 'react';
import './parity.css';
import GameDetails from '../gameDetails/GameDetails';

const Parity = ({ heading, icon }) => {
  const firstCardList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [activeBtn, setActiveBtn] = useState('probability');
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
          <div className="parity-count-box">
            <p>0</p>
            <p>secs</p>
          </div>
        </div>
      </div>

      <div className="prity-colors">
        <div style={{ backgroundColor: '#d72e2a' }}>
          <p>Join Red</p>
          <p>1:2</p>
        </div>

        <div style={{ backgroundColor: '#1976d3' }}>
          <p>Join Blue</p>
          <p>1:4.5</p>
        </div>

        <div style={{ backgroundColor: '#388e3d' }}>
          <p>Join green</p>
          <p>1:2</p>
        </div>
      </div>

      <div className="paritynum-btns">
        {firstCardList.map((item) => (
          <div>
            <p>{item}</p>
            {icon ? <i className="fa-solid fa-bolt"></i> : ''}
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
          className={activeBtn === 'probability' ? 'parity-btn-active' : ''}
        >
          Probability
        </button>
      </div>

      <div>
        <p style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: 15 }}>
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

      <div className="game-second-row">
        {firstCardList.map((item) => (
          <div className="game-second-row-color">
            <p>{item}</p>
          </div>
        ))}

        {firstCardList.map((item) => (
          <div>
            <p>0</p>
          </div>
        ))}
      </div>

      <GameDetails />
    </div>
  );
};

export default Parity;
