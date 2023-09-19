import React, { useEffect, useState } from "react";
import Start from "../../../components/start/Start";
import { dbObject } from "../../../helper/constant";
import GameDetails from "../../../components/gameDetails/GameDetails";
import "./FullParity.css";
import { Toast } from "../../../helper";
import { onValue, ref } from "firebase/database";
import { database } from "../../../firebase.config";
import Header from "../../../components/Header";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import Toaster, { toastOptions } from "../../../components/Toster/Toaster";

const FullParity = () => {
  const [startCart, setStartCart] = useState(false);
  const [color, setColor] = useState(null);
  const [number, setNumber] = useState(null);
  const firstCardList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const probabilityBox = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [activeBtn, setActiveBtn] = useState("probability");
  const [activeBtn2, setActiveBtn2] = useState("OtherPlayers");
  const [resultHistory, setResultHistory] = useState();
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState([]);
  const [gameid, setGameid] = useState(); //game id of the game
  const [timer, setTimer] = useState(0);
  const { fetchWallet } = useContext(AuthContext);
  const [period, setPeriod] = useState("");

  useEffect(() => {
    const fastParityRef = ref(database, "parity/timer");

    onValue(fastParityRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data)[0];
        const { time } = data[key];
        setTimer(time);
      }
    });
  }, []);

  useEffect(() => {
    const fastParityRef = ref(database, "parity/period");
    console.log("first");
    onValue(fastParityRef, (snapshot) => {
      console.log(snapshot)
      const data = snapshot.val();
      console.log(data);
      if (data) {
        setPeriod(data);
        console.log(data);
      }
    });

    console.log("first");
  }, []);

  const playGame = async (amount) => {
    let body;
    if (color) {
      body = {
        amount,
        color,
      };
    }
    if (number !== null) {
      body = {
        amount,
        number,
      };
    }
    if (timer > 10) {
      const { data } = await dbObject.post("/fastparity/play", body);
      console.log(data);
      if (!data.error) {
        // setIsFastParityPlaying(true);
        setGameid(data.game_id);
        // setIsParticipenceAllowed(false);
        // setAmountModal(false);
        // insertGameData();
        Toast(data.message, "");

        setStartCart(false);
        fetchWallet();
      } else {
        setStartCart(false);
        toast.error(data.message, toastOptions);
      }
    }
  };

  const getHistory = async () => {
    try {
      const { data } = await dbObject("/parity/history");
      console.log(data);

      if (!data.error) {
        setResultHistory(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  const getResult = async () => {
    try {
      const { data } = await dbObject.post("/parity/result", {
        game_id: gameid,
      });
      console.log(data);

      if (!data.error && data.result.length) {
        setResult(data.result[0]);
        setShowResult(true);

        setTimeout(() => {
          setShowResult(false);
          setResult([]);
          setGameid(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (timer == 0) {
      getResult();
      fetchWallet();
    }
  }, [timer]);

  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <>
      {startCart && (
        <Start
          startGame={playGame}
          setStartCart={setStartCart}
          name={`Parity - ${color || number}`}
          color={color}
        />
      )}
      <Toaster />

      {showResult && (
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
                  style={{
                    textAlign: "center",
                    fontSize: "2rem",
                    color: "green",
                  }}
                >
                  +₹{result?.transaction}
                </p>

                <div className="result-popup-text">
                  <div className="d-flex justify-content-between">
                    <p className="mb-0">Period</p>
                    <p className="mb-0">{result.game_id}</p>
                  </div>

                  <div className="mt-4 result-popup-text-box">
                    <div
                      className="d-flex justify-content-between align-items-center mb-2"
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p className="mb-0">Selected</p>

                      <p className="" style={{ color: result.user_color }}>
                        {result.user_color || result.user_number}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0">Point</p>
                      <h2
                        className="mb-0 text-success"
                        style={{ color: "#111" }}
                      >
                        {result.amount}
                      </h2>
                    </div>
                  </div>
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
      )}

      <div
        style={{
          width: "100%",
          background: "linear-gradient(180deg, #1b5d21, #0a1d24)",
          marginBottom: "-2rem",
        }}
      >
        <div className="container">
          <div className="parity-container">
            <Header path={"/"} title={"Parity"} />

            <div className="parity-top">
              <div className="parity-period">
                <p>Period</p>
                <p>{period}</p>
              </div>

              <div className="parity-count">
                <p>Count Down</p>
                <div className="parity-count-box">
                  <p>{timer}</p>
                  <p>secs</p>
                </div>
              </div>
            </div>

            <div className="prity-colors">
              <button
                onClick={() => {
                  setColor("Red");
                  setNumber(null);
                  setStartCart(true);
                }}
                style={{ backgroundColor: "#d72e2a" }}
                disabled={timer < 11}
              >
                <p>Join Red</p>
                <p>1:2</p>
              </button>

              <button
                onClick={() => {
                  setColor("Blue");
                  setNumber(null);
                  setStartCart(true);
                }}
                style={{ backgroundColor: "#1976d3" }}
                disabled={timer < 11}
              >
                <p>Join Blue</p>
                <p>1:4.5</p>
              </button>

              <button
                onClick={() => {
                  setColor("Green");
                  setNumber(null);
                  setStartCart(true);
                }}
                style={{ backgroundColor: "#388e3d" }}
                disabled={timer < 11}
              >
                <p>Join green</p>
                <p>1:2</p>
              </button>
            </div>

            <div className="paritynum-btns">
              {firstCardList.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setNumber(item);
                    setColor(null);
                    setStartCart(true);
                  }}
                  disabled={timer < 11}
                >
                  <p>{item}</p>
                </button>
              ))}
            </div>

            <div className="parity-btn">
              <button
                onClick={() => setActiveBtn("continuos")}
                className={activeBtn === "continuos" ? "parity-btn-active" : ""}
              >
                Continuos
              </button>
              <button
                onClick={() => setActiveBtn("record")}
                className={activeBtn === "record" ? "parity-btn-active" : ""}
              >
                Record
              </button>
              <button
                onClick={() => setActiveBtn("probability")}
                className={
                  activeBtn === "probability" ? "parity-btn-active" : ""
                }
              >
                Probability
              </button>
            </div>

            {activeBtn === "continuos" && <ContinuousTab />}

            {activeBtn === "record" && <Record />}

            {activeBtn === "probability" && (
              <Probability probabilityBox={probabilityBox} />
            )}

            <div className="gameDetails-btn-group">
              <button
                onClick={() => setActiveBtn2("OtherPlayers")}
                className={`${
                  activeBtn2 === "OtherPlayers" ? "gameDetails-activeBtn" : ""
                }`}
              >
                Other Players
              </button>

              <button
                onClick={() => setActiveBtn2("MyOrder")}
                className={`${
                  activeBtn2 === "MyOrder" ? "gameDetails-activeBtn" : ""
                }`}
              >
                My Orders
              </button>
            </div>

            {activeBtn2 === "OtherPlayers" ? (
              <div className="gameDetails-others">
                <div>
                  <p>Period</p>
                  <small>18:54</small>
                </div>

                <div style={{ textAlign: "center" }}>
                  <p>User</p>
                  <small>****18787</small>
                </div>

                <div style={{ textAlign: "center" }}>
                  <p>Select</p>
                  <small>2x2</small>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p>Point</p>
                  <small>₹ 90</small>
                </div>
              </div>
            ) : (
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
                    {resultHistory?.map((item, i) => (
                      <tr key={i} className="parity-myorder">
                        <td>{convertTimestamp(item?.date)}</td>
                        <td className="parity-selected">
                          <p
                            style={{
                              backgroundColor:
                                item?.user_color || "transparent",
                              width: "100%",
                              color: "#fff",
                            }}
                          >
                            {item?.user_color || item?.user_number}
                          </p>
                        </td>
                        <td>₹{item?.actual_amount}</td>
                        <td className="parity-selected parity-result">
                          <p style={{ backgroundColor: "#388e3d" }}>
                            {item?.result || "?"}
                          </p>
                        </td>
                        <td>+₹{item?.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Probability = ({ probabilityBox }) => (
  <>
    <div>
      <p
        style={{
          textAlign: "center",
          marginTop: "1.2rem",
          fontSize: 15,
        }}
      >
        1 item today
      </p>
    </div>

    <div className="game-first-row">
      <div>
        <p>0</p>
      </div>

      <div>
        <p>0</p>
      </div>

      <div>
        <p>0</p>
      </div>

      <div className="game-first-row-box-out">
        <p style={{ backgroundColor: "#d72e2a" }}>R</p>
        <div
          className="game-first-row-box"
          style={{ backgroundColor: "#ffcdd2" }}
        ></div>
      </div>

      <div className="game-first-row-box-out">
        <p style={{ backgroundColor: "#1976d3" }}>B</p>
        <div
          className="game-first-row-box"
          style={{ backgroundColor: "#bbdefa" }}
        ></div>
      </div>

      <div className="game-first-row-box-out">
        <p style={{ backgroundColor: "#388e3d" }}>G</p>
        <div
          className="game-first-row-box"
          style={{ backgroundColor: "#c8e6ca" }}
        ></div>
      </div>
    </div>

    <div className="probabilty-game-second-row game-second-row">
      {probabilityBox.map((item, i) => (
        <div key={i} className="game-second-row-color">
          <p>{item}</p>
        </div>
      ))}

      {probabilityBox.map((item, i) => (
        <div key={i} className="numbers">
          <p>{item}</p>
          <p>0</p>
        </div>
      ))}
    </div>
  </>
);

const Record = ({}) => {
  const numberList = [
    2,
    2,
    2,
    2,
    9,
    9,
    0,
    "-",
    5,
    9,
    8,
    8,
    8,
    8,
    6,
    4,
    8,
    7,
    1,
    4,
    9,
    7,
    1,
    2,
    8,
    1,
    4,
  ];

  return (
    <div className="parity-record">
      <p>Parity Record</p>
      <div className="parity-record-box">
        {numberList.map((item, i) => (
          <div key={i} className="parity__records__circle">
            <div className="parity__records__circle__no">{item}</div>
            <div
              className="parity__records__circle__inner"
              style={{
                backgroundColor:
                  item === "-"
                    ? "#fec007"
                    : item % 2 === 0
                    ? "#f44238"
                    : "#3b8d3c",
              }}
            >
              <div
                className="parity__records__circle__col"
                style={{
                  background:
                    item === 0 ? "#f24337" : item === 5 ? "#1f98ef" : "",
                }}
              ></div>
              <div
                className="parity__records__circle__col"
                style={{
                  background:
                    item === 0 ? "#0f45a2" : item === 5 ? "#388e3d" : "",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function ContinuousTab({}) {
  const fastParityContinuousList = [
    0,
    7,
    "-",
    8,
    0,
    6,
    1,
    9,
    3,
    5,
    0,
    7,
    7,
    8,
    0,
    7,
    8,
    0,
    6,
    1,
    9,
    3,
  ];
  return (
    <div className="continuous-tab">
      <div className="scroll-container">
        {fastParityContinuousList?.map((item, i) => (
          <div key={i} className="parity__records__circle">
            <div className="parity__records__circle__no">{item}</div>
            <div
              className="parity__records__circle__inner"
              style={{
                backgroundColor:
                  item === "-"
                    ? "#fec007"
                    : item % 2 === 0
                    ? "#f44238"
                    : "#3b8d3c",
              }}
            >
              <div
                className="parity__records__circle__col"
                style={{
                  background:
                    item === 0 ? "#f24337" : item === 5 ? "#1f98ef" : "",
                }}
              ></div>
              <div
                className="parity__records__circle__col"
                style={{
                  background:
                    item === 0 ? "#0f45a2" : item === 5 ? "#388e3d" : "",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FullParity;
