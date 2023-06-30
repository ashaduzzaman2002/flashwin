import React from 'react';
import './myOrder.css';

const MyOrder = () => {
  return (
    <div className="myOrder">
      <div className="game-type">
        <div className={`minesweeper-game-2x2`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className="myorder-text">
        <div>
          <p>Points</p>
          <p>20</p>
        </div>

        <div>
          <p>Points</p>
          <p>20</p>
        </div>

        <div>
          <p>Points</p>
          <p>20</p>
        </div>

        <div>
          <p>Points</p>
          <p>20</p>
        </div>

        <div>
          <p>Points</p>
          <p>20</p>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
