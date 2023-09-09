import React from "react";
import "./result-popup.css";
import { bomb } from "../../assets";

const ResultPopup = ({ setShowResult, ratio, result }) => {
  const ratio2x2 = [1, 2, 3, 4];
  const ratio4x4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
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
            <p
              style={{ textAlign: "center", fontSize: "2rem", color: "green" }}
            >
              +₹{result.total_transaction}
            </p>

            <div>
              {ratio === "2x2" ? (
                <div className="mineswiper-result-box">
                  {ratio2x2.map((item, i) => (
                    <div key={i}>
                      {result.bomb.bomb_cell === String(i + 1) ? (
                        <img width={"70%"} src={bomb} alt="money" />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mineswiper-result-box-4x4">
                  {ratio4x4.map((item, i) => (
                    <div key={i}>
                      {result.bomb.bomb_cell === String(i + 1) ? (
                        <img width={"70%"} src={bomb} alt="money" />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowResult(false)}
              className="w-100 mt-4 btn"
              style={{ padding: "0.8rem" }}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPopup;
