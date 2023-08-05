import React, {  useContext, useState } from 'react';
import './start.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Start = ({ name, startGame, game, setStartCart }) => {
  const [contactPoint, setContactPoint] = useState(10);
  

  const closeCard = () => {
    setStartCart(false)
  };

  const navigate = useNavigate()

  const handleStart = () => {
    startGame(contactPoint)
  };

  const { walletBalance } = useContext(AuthContext);

  const handleIncDec = (value) => {
    // setContactPoint(contactPoint + value);
  };

  return (
    <div  className="start-container">
      <div onClick={closeCard} className='card-out-side'></div>
      <div className="start-box">
        <h2 className="game-name">{name}</h2>
        <p>Points</p>

        <div className="points-div">
          <h3>INR {walletBalance}</h3>
          <button onClick={() => navigate('/recharge')}>
            <i className="fa-solid fa-clock-rotate-left"></i> Recharge
          </button>
        </div>

        <div className="contract-point">
          {!game === "minesweeper" && <p>Contract Points</p>}

          <div>
            <button
              onClick={() => setContactPoint(10)}
              className={contactPoint === 10 ? "contract-point-selected" : ""}
            >
              10
            </button>
            <button
              onClick={() => setContactPoint(100)}
              className={contactPoint === 100 ? "contract-point-selected" : ""}
            >
              100
            </button>
            <button
              onClick={() => setContactPoint(1000)}
              className={contactPoint === 1000 ? "contract-point-selected" : ""}
            >
              1000
            </button>
            <button
              onClick={() => setContactPoint(10000)}
              className={
                contactPoint === 10000 ? "contract-point-selected" : ""
              }
            >
              10000
            </button>
          </div>
        </div>

        <div className="start-number-outer">
          {game !== "minesweeper" && <p>Number</p>}

          <div className="start-number">
            <div>
              <button onClick={() => handleIncDec(-5)}>-5</button>
              <button onClick={() => handleIncDec(-1)}>-1</button>
            </div>
            <p>{contactPoint}</p>
            <div>
              <button onClick={() => handleIncDec(1)}>+1</button>
              <button onClick={() => handleIncDec(5)}>+5</button>
            </div>
          </div>
        </div>

        {game !== "minesweeper" && (
          <div className="delivery">
            <div>
              <p>Delivery</p>
              <p>50.00</p>
            </div>

            <div>
              <p>Fee</p>
              <p>0.00</p>
            </div>

            <div>
              <p>Amount</p>
              <p>+176.00</p>
            </div>
          </div>
        )}

        <div style={{ width: '100%', marginTop: '1rem' }}>
          <button className="btn" onClick={handleStart}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
