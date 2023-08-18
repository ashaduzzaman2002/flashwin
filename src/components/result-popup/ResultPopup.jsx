import React from "react";
import "./result-popup.css";

const ResultPopup = ({setShowResult, winAmount}) => {
  return (
    <div className="result-popup">
      <div className="result-popup-close"></div>

      <div className="container h-100 d-flex align-items-center justify-content-center">
        <div className="result-popup-content">
          <div className="result-popup-heading">
            <img className="coin" src="/images/coin.png" alt="coin" />
            <img className="crown" src="/images/crown2.png" alt="crown" />
            <h2>Win</h2>
          </div>


          <div className="result-popup-text">
            
            <p style={{textAlign: 'center', fontSize: '2rem', color: 'green'}}>You own {winAmount}</p>

            <button onClick={() => setShowResult(false)} className="w-100 mt-4 btn" style={{padding: '0.8rem'}}>CLOSE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPopup;
