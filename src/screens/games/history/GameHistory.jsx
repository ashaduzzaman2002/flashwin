import React, { useState } from 'react';
import './GameHistory.css';
import { emptyBox } from '../../../assets';

const GameHistory = () => {
    const [activeBtn, setActiveBtn] = useState('minesweeper')
  return (
    <div className="container">
      <div className="gameHistory-container">
        <h2>Game History</h2>

        <div className='gameHistory-content'>
            <div className='gameHistory-btn-group'>
                <button onClick={() => {setActiveBtn('minesweeper')}} className={`${activeBtn === 'minesweeper'?'gameHistory-activeBtn': ''}`}>Minesweeper</button>
                <button onClick={() => {setActiveBtn('circle')}} className={`${activeBtn === 'circle'?'gameHistory-activeBtn': ''}`}>Circle</button>
                <button onClick={() => {setActiveBtn('fast-parity')}} className={`${activeBtn === 'fast-parity'?'gameHistory-activeBtn': ''}`}>Fast-Parity</button>
                <button onClick={() => {setActiveBtn('full-parity')}} className={`${activeBtn === 'full-parity'?'gameHistory-activeBtn': ''}`}>Parity</button>
            </div>

            <div className='gameHistoryBox'>
              <div className='emptyImage'>
              <img src={emptyBox} alt="" />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GameHistory;
