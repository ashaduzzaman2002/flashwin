import React, { useEffect, useState } from "react";
import "./GameHistory.css";
import { Cow, ElephantIcon, bomb, emptyBox, tiger } from "../../../assets";
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
  const [parityHistory, setParityHistory] = useState([]);
  const [circleHistory, setCirlceHistory] = useState([]);

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

  const getParityHistory = async () => {
    try {
      const { data } = await dbObject.get("/parity/history");

      console.log(data);

      if (!data?.error) {
        setParityHistory(data?.result);
        console.log(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const getCircleHistory = async () => {
    try {
      const { data } = await dbObject.get("/circle/history");

      console.log(data);

      if (!data?.error) {
        setCirlceHistory(data?.result);
        console.log(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMinesweeperHistory();
    getFastParityHistory();
    getParityHistory();
    getCircleHistory()
  }, []);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="container">
      <div className="gameHistory-container" style={{ marginBottom: "-65px" }}>
        {/* <h2>Game History</h2> */}
        <Header title={"Game History"} path={"/profile"} />

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
            (circleHistory.length ? (
              circleHistory.map((item, i) => (
                <tbody>
                {circleHistory?.map((item, i) => {
                  const currentDate = new Date(item.date);
                  const hours = currentDate.getHours();
                  const minutes = currentDate.getMinutes();

                  return (
                    <tr key={i} className="parity-myorder">
                      <td>{`${hours}:${minutes}`}</td>
                      <td
                        className="parity-selected"
                        style={{
                          backgroundColor: item?.user_color,
                          padding: "0.3rem",
                          borderRadius: "0.5rem",
                        }}
                      >
                        {!item.user_color && !item.user_animal ? (
                          <p style={{ padding: "0.2rem" }}>
                            {item.user_number}
                          </p>
                        ) : item.user_color && !item.user_animal ? (
                          <p
                            style={{
                              background: "none",
                              color: "#fff",
                              textTransform: "capitalize",
                            }}
                          >
                            {item.user_color}
                          </p>
                        ) : !item.user_color && item.user_animal ? (
                          <img
                            width={"50%"}
                            src={
                              item.user_animal === "lion"
                                ? tiger
                                : item.user_animal === "elephant"
                                ? ElephantIcon
                                : Cow
                            }
                          />
                        ) : null}
                      </td>
                      <td>₹{item.actual_amount}</td>
                      <td
                        className="parity-selected parity-result"
                        style={{
                          backgroundColor: item?.winner_color,
                          padding: "0.3rem",
                          borderRadius: "0.5rem",
                        }}
                      >
                        <p style={{ background: "none" }}>
                          {item?.winner_number}
                        </p>
                      </td>
                      <td>₹{Number(item.transaction).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
              ))
            ) : (
              <div className="emptyImage">
                <img src={emptyBox} alt="" />
              </div>
            ))}

          {activeBtn === "fast-parity" &&
            (fastParity ? (
              <div className="game-history">
                {fastParityHistory.map((item, i) => (
                  <FastParityCard key={i} item={item} />
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
                {parityHistory.map((item, i) => (
                  <FullParityCard key={i} item={item} />
                ))}
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

const FastParityCard = ({ item, key }) => {
  const dateTimeArr = item.date.split("T");
  const date = dateTimeArr[0];
  const time = dateTimeArr[1].split(":");
  return (
    <div key={key} className="history-parity">
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

const FullParityCard = ({ item, key }) => {
  const dateTimeArr = item.date.split("T");
  const date = dateTimeArr[0];
  const time = dateTimeArr[1].split(":");

  return (
    <div key={key} className="history-parity">
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
              style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
              className="parity-myorder"
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
                <p>{item.result}</p>
              </td>
              <td>₹{item.transaction}</td>
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

export default GameHistory;
