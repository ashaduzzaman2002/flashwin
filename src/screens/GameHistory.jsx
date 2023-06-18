import React, { useState } from 'react';
import '../styles/GameHistory.css';

const GameHistory = () => {
    const [activeBtn, setActiveBtn] = useState('minesweeper')
  return (
    <div className="container">
      <div className="gameHistory-container">
        <h2>Game History</h2>

        <div className='gameHistory-content'>
            <div className='gameHistory-btn-group'>
                <button className={`${activeBtn === 'minesweeper'?'gameHistory-activeBtn': ''}`}>Minesweeper</button>
                <button>Circle</button>
                <button>Fast-Parity</button>
                <button>Full-Parity</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GameHistory;
