import React, { useEffect } from 'react';
import './result.css';
import { Cow, ElephantIcon, hangLoose, magicBag, tiger } from '../../assets';
import Lottie from 'lottie-react';

const Result = ({ result, setShowResult }) => {
  useEffect(() => {
    setTimeout(() => {
      setShowResult(false);
    }, [4000]);
  }, []);
  return (
    <div className="result-container">
      <div onClick={() => setShowResult(false)} className="result-outer"></div>

      <div className="result-box">
        <p className="id">#{result?.winner?.id}</p>

        <h2 className="result-heading" style={{ marginTop: '0.5rem' }}>
          🎉 Results are here 🎉
        </h2>
        <h3 className="result-heading">The winner is</h3>

        <div className="result-info">
          <div
            style={{
              backgroundColor:
                result?.winner?.winner_color === 'blue'
                  ? '#1976d3'
                  : result?.winner?.winner_color === 'orange'
                  ? '#ff9700'
                  : '#d22f2d',
            }}
          >
            <p>{result?.winner?.winner_number}</p>
          </div>

          <img
            src={
              result?.winner?.winner_animal === 'cow'
                ? Cow
                : result?.winner?.winner_animal === 'elephant'
                ? ElephantIcon
                : tiger
            }
            alt=""
          />
        </div>

        <div
          className="result-bottom"
          style={{
            background: result?.result?.amount > 0 ? '#2f7d32' : '#c62827',
          }}
        >
          <div className="img">
            <Lottie
              animationData={result?.result?.amount > 0 ? magicBag : hangLoose}
              loop={true}
            />
          </div>

          <p>
            {result?.result?.amount > 0
              ? `Hurray! Credited with Rs. ${result?.result?.amount}`
              : 'Ooops! You Lost'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;
