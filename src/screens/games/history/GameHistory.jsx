import React, { useEffect, useState } from "react";
import "./GameHistory.css";
import { bomb, emptyBox } from "../../../assets";
import { dbObject } from "../../../helper/constant";
import { useLocation } from "react-router-dom";
import Header from "../../../components/Header";

const GameHistory = () => {
  const [activeBtn, setActiveBtn] = useState("minesweeper");
  const [circle, setCircle] = useState(false);
  const [fastParity, setFastParity] = useState(true);
  const [fullParity, setFullParity] = useState(true);

  const [minesweeperHistory, setMinesweeperHistory] = useState([]);
  const [fastParityHistory, setFastParityHistory] = useState([]);

  const getMinesweeperHistory = async () => {
    try {
      const { data } = await dbObject.get("/mine/history");

      if (!data?.error) {
        setMinesweeperHistory(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFastParityHistory = async () => {
    try {
      const { data } = await dbObject.get("/fastparity/history");

      console.log(data);

      if (!data?.error) {
        setFastParityHistory(data?.result);
        console.log(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMinesweeperHistory();
    getFastParityHistory();
  }, []);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="container">
      <div className="gameHistory-container" style={{ marginBottom: "-65px" }}>
        {/* <h2>Game History</h2> */}
        <Header title={'Game History'} path={'/profile'} />

        <div className="gameHistory-content">
          <div className="gameHistory-btn-group">
            <button
              onClick={() => {
                setActiveBtn("minesweeper");
              }}
              className={`${
                activeBtn === "minesweeper" ? "gameHistory-activeBtn" : ""
              }`}
            >
              Minesweeper
            </button>
            <button
              onClick={() => {
                setActiveBtn("circle");
              }}
              className={`${
                activeBtn === "circle" ? "gameHistory-activeBtn" : ""
              }`}
            >
              Circle
            </button>
            <button
              onClick={() => {
                setActiveBtn("fast-parity");
              }}
              className={`${
                activeBtn === "fast-parity" ? "gameHistory-activeBtn" : ""
              }`}
            >
              Fast-Parity
            </button>
            <button
              onClick={() => {
                setActiveBtn("full-parity");
              }}
              className={`${
                activeBtn === "full-parity" ? "gameHistory-activeBtn" : ""
              }`}
            >
              Parity
            </button>
          </div>

          {activeBtn === "minesweeper" && (
            <div className="game-history-card-group">
              {minesweeperHistory?.length ? (
                minesweeperHistory.map((item, i) => (
                  <div key={i} className="mine-myorder">
                    <div className="game-type">
                      {item?.game_mode === "2*2" ? (
                        <div
                          className={`minesweeper-game-2x2`}
                          style={{ marginBottom: 0 }}
                        >
                          {Array(4)
                            .fill()
                            .map((_, i) => (
                              <div key={i}>
                                {item?.bomb_cell === String(i + 1) && (
                                  <img
                                    style={{ width: "80%" }}
                                    src={bomb}
                                    alt=""
                                  />
                                )}
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div
                          className={`minesweeper-game-4x4`}
                          style={{ marginBottom: 0 }}
                        >
                          {Array(16)
                            .fill()
                            .map((_, i) => (
                              <div key={i}>
                                {item?.bomb_cell === String(i + 1) && (
                                  <img
                                    style={{ width: "80%" }}
                                    src={bomb}
                                    alt=""
                                  />
                                )}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    <div style={{ marginLeft: "1rem" }}>
                      <div style={{ margin: 0 }} className="myorder-text">
                        <div>
                          <p>Points</p>
                          <p>₹{item.actual_amount}</p>
                        </div>

                        <div>
                          <p>Pass</p>
                          <p>{item.number_of_taps}</p>
                        </div>

                        <div>
                          <p>Bonous</p>
                          <p style={{ color: "#7eb298" }}>
                            +₹{item.total_transaction}
                          </p>
                        </div>
                      </div>

                      <p
                        style={{ marginTop: 8, fontSize: 15, color: "#e5eae7" }}
                      >
                        Delivery: ₹{item.game_amount} Fees: ₹1.00
                      </p>
                      <p
                        style={{ marginTop: 8, fontSize: 15, color: "#e5eae7" }}
                      >
                        12/07/2023 12:32
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="emptyImage">
                  <img src={emptyBox} alt="" />
                </div>
              )}
            </div>
          )}

          {activeBtn === "circle" &&
            (circle ? (
              ""
            ) : (
              <div className="emptyImage">
                <img src={emptyBox} alt="" />
              </div>
            ))}

          {activeBtn === "fast-parity" &&
            (fastParity ? (
              <div className="game-history">
                {fastParityHistory.map((item, i) => (
                  <FastParityCard item={item} />
                ))}
              </div>
            ) : (
              <div className="emptyImage">
                <img src={emptyBox} alt="" />
              </div>
            ))}

          {activeBtn === "full-parity" &&
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

const FastParityCard = ({ item }) => {

  const dateTimeArr = item.date.split('T')
  const date  = dateTimeArr[0]
  const time = dateTimeArr[1].split(':')
  return (
    <div className="history-parity">
      <div className="date">
        <p>Period {`${time[0]}:${time[1]}`}</p>
        <p>{`${date} ${time[0]}:${time[1]}`}</p>
      </div>

      <div>
        <table style={{ width: "100%", marginTop: "1rem" }}>
          <thead>
            <tr
              className="parity-myorder-header parity-myorder"
              style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
            >
              <td>Select</td>
              <td>Point</td>
              <td>Result</td>
              <td>Amount</td>
            </tr>
          </thead>

          <tbody>
            <tr
              className="parity-myorder"
              style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
            >
              <td className="parity-selected">
                <p
                  style={{
                    backgroundColor: item.user_color || "#a1989894",
                    width: "100%",
                    color: "#fff",
                  }}
                >
                  {item.user_color || item.user_number}
                </p>
              </td>
              <td>₹{item.actual_amount}</td>
              <td className="parity-selected parity-result">
                <p style={{ backgroundColor: "#388e3d" }}>{item.result}</p>
              </td>
              <td>+₹{item.transaction}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="hr80" />

      <div className="parity-delivery">
        <p>Delivery: ₹{item.amount}</p>
        <p>Fees: ₹1.00</p>
      </div>

      <div className="history-parity-btn">
        <button style={{ backgroundColor: "#ffdcaa" }}>To Verify</button>
        <button style={{ backgroundColor: "#e99d97" }}>Complaint</button>
      </div>
    </div>
  );
};

const FullParityCard = () => (
  <div className="history-parity">
    <div className="date">
      <p>Period 15:58</p>
      <p>11/07/2023 15:58</p>
    </div>

    <div>
      <table style={{ width: "100%", marginTop: "1rem" }}>
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
      <button style={{ backgroundColor: "#ffdcaa" }}>To Verify</button>
      <button style={{ backgroundColor: "#e99d97" }}>Complaint</button>
    </div>
  </div>
);

export default GameHistory;
