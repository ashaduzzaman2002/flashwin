import React, {  useContext, useState } from 'react';
import './start.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';

const Start = ({ name, startGame, game, setStartCart }) => {
  const [contactPoint, setContactPoint] = useState(10);
  const [amount, setAmount] = useState(contactPoint);
  const {fetchWallet} = useContext(AuthContext)
  useEffect(() => {
    setAmount(contactPoint);
  }, [contactPoint]);

  const closeCard = () => {
    setStartCart(false)
  };

  const navigate = useNavigate()

  const handleStart = () => {
    startGame(amount)
  };

  const { walletBalance } = useContext(AuthContext);

// handle increment of amount
const handleInc = (value) => {
  return setAmount(amount + (value * contactPoint) / 10);
};

// handle decreament of amount
const handleDec = (value) => {
  if (amount > (contactPoint * value) / 10)
    return setAmount(amount - (value * contactPoint) / 10);
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
              <button onClick={() => handleDec(5)}>-5</button>
              <button onClick={() => handleDec(1)}>-1</button>
            </div>
            <p>{amount}</p>
            <div>
              <button onClick={() => handleInc(1)}>+1</button>
              <button onClick={() => handleInc(5)}>+5</button>
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
