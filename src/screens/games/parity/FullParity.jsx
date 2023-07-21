<<<<<<< HEAD
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { database } from "../../../firebase.config";

import "../../../components/parity/parity.css";
import GameDetails from "../../../components/gameDetails/GameDetails";
import Start from "../../../components/start/Start";
import { onValue, ref } from "firebase/database";
import { dbObject } from "../../../helper/constant";
import GetMaskInput from "../../../helper/MaskInput";
import { AuthContext } from "../../../context/AuthContext";

const FastParity = () => {
  const { user } = useContext(AuthContext);
  const [isFastParityPlaying, setIsFastParityPlaying] = useState(false); //check if the game is playing or not
  const [gameid, setGameid] = useState(); //game id of the game
  const [color, setColor] = useState(); //color of the game
  const [number, setNumber] = useState(); //number of the game
  const [isParticipenceAllowed, setIsParticipenceAllowed] = useState(true); //check if the participence is allowed or not
  const [continuos, setContinuos] = useState(); //continuos of the game
  const [records, setRecords] = useState(); //record of the game
  const [probability, setProbability] = useState(); //probability of the game
  const [myRecords, setMyRecords] = useState(); //my record of the game
  const firstCardList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [activeBtn, setActiveBtn] = useState("probability");
  const [amountModal, setAmountModal] = useState(false);
  const [timer, setTimer] = useState(0);
  const [message, setMessage] = useState("");

  const getRecords = async () => {
    const data = await dbObject.get("/parity/historyall");
    if (!data.data.error) {
      setRecords(data.data.data);
    }
  };

  const getProbability = async () => {
    const data = await dbObject.get("/parity/probability");
    if (!data.data.error) {
      setProbability(data.data.data);
=======
import React, { useEffect, useState } from 'react';
import Start from '../../../components/start/Start';
import { dbObject } from '../../../helper/constant';
import GameDetails from '../../../components/gameDetails/GameDetails';
import './FullParity.css';

const FullParity = () => {
  const [startCart, setStartCart] = useState(false);
  const [color, setColor] = useState(null);
  const [number, setNumber] = useState(null);
  const firstCardList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const probabilityBox = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [activeBtn, setActiveBtn] = useState('probability');
  const [activeBtn2, setActiveBtn2] = useState('OtherPlayers');

  const timerStart = async () => {
    try {
      const { data } = await dbObject.post('/parity/timer/start');
    } catch (error) {
      console.log(error);
    }
  };

  const startGame = async (value) => {
    setStartCart(false);

    try {
      const { data } = await dbObject.post('/parity/play', { ...value, color });
    } catch (error) {
      console.log(error);
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5
    }
  };

  const getContinuos = async () => {
    const data = await dbObject.get("/parity/continous");
    if (!data.data.error) {
      setContinuos(data.data.data);
    }
  };

  const getMyRecords = async () => {
    const data = await dbObject.get("/parity/history");
    if (!data.data.error) {
      setMyRecords(data.data.data);
    }
  };

  const getResult = async () => {
    const body = {
      game_id: gameid,
    };
    const data = await dbObject.post("/parity/result", body);
    console.log(data);
    setIsFastParityPlaying(false);
  };

  useEffect(() => {
    const fastParityRef = ref(database, "parity/timer");
    setIsParticipenceAllowed(false);

    setTimeout(() => {
      onValue(fastParityRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const key = Object.keys(data)[0];
          const { time } = data[key];
          setTimer(time);
          if (time == 30) {
            setIsParticipenceAllowed(false);
          }
          if (time == 1) {
            if (isFastParityPlaying) {
              getResult();
            }
          }
          if (time == 0 || time == 180) {
            setIsParticipenceAllowed(true);
          }
        }
      });
      setIsParticipenceAllowed(true);
    }, 4000);

    getContinuos();
    getMyRecords();
    getProbability();
    getRecords();
  }, []);

  useEffect(() => {
    if (color) {
      setAmountModal(true);
      setNumber();
    } else if (number) {
      setAmountModal(true);
      setColor();
    }
  }, [color, number]);

  const playGame = async (amount) => {
    let body;
    if (color) {
      body = {
        amount,
        color,
      };
    }
    if (number) {
      body = {
        amount,
        number,
      };
    }
    const data = await dbObject.post("/parity/play", body);
    if (!data.data.error) {
      setIsFastParityPlaying(true);
      setGameid(data.data.game_id);
      setIsParticipenceAllowed(false);
      setAmountModal(false);
      insertGameData();

      // toast emitter
      toast.success(data.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const insertGameData = async () => {
    const maskNumber = GetMaskInput(user.number);
    console.log(maskNumber);
  };

  return (
    <>
<<<<<<< HEAD
      <ToastContainer />
      {amountModal && color && (
        <Start
          name={"Full Party - " + color}
          startGame={(amount) => {
            playGame(amount);
          }}
          onPress={() => {
            setAmountModal(false);
            setColor();
            setNumber();
          }}
        />
      )}

      {amountModal && number && (
        <Start
          name={"Full Party - " + number}
          startGame={(amount) => {
            playGame(amount);
          }}
          onPress={() => {
            setAmountModal(false);
            setColor();
            setNumber();
          }}
=======
      {startCart && (
        <Start
          startGame={startGame}
          setStartCart={setStartCart}
          name={`Parity - ${color || number}`}
          color={color}
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5
        />
      )}

      <div
        style={{
          width: "100%",
          minHeight: "95vh",
          background: "linear-gradient(180deg, #310b5e, #0a1527)",
          marginBottom: "-2rem",
        }}
      >
        <div className="container">
          <div className="parity-container">
<<<<<<< HEAD
            <h2>Fast Parity</h2>
=======
            <h2>Parity</h2>
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5

            <div className="parity-top">
              <div className="parity-period">
                <p>Period</p>
                <p>23034151</p>
              </div>

              <div className="parity-count">
                <p>Count Down</p>
                <div className="parity-count-box">
<<<<<<< HEAD
                  <p>{timer}</p>
=======
                  <p>0</p>
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5
                  <p>secs</p>
                </div>
              </div>
            </div>

            <div className="prity-colors">
              <div
<<<<<<< HEAD
                aria-disabled={!isParticipenceAllowed}
                style={{ backgroundColor: "#d72e2a" }}
                onClick={() => isParticipenceAllowed && setColor("red")}
=======
                onClick={() => {
                  setColor('Red');
                  setNumber(null);
                  setStartCart(true);
                }}
                style={{ backgroundColor: '#d72e2a' }}
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5
              >
                <p>Join Red</p>
                <p>1:2</p>
              </div>

              <div
<<<<<<< HEAD
                style={{ backgroundColor: "#1976d3" }}
                onClick={() => isParticipenceAllowed && setColor("blue")}
=======
                onClick={() => {
                  setColor('Blue');
                  setNumber(null);
                  setStartCart(true);
                }}
                style={{ backgroundColor: '#1976d3' }}
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5
              >
                <p>Join Blue</p>
                <p>1:4.5</p>
              </div>

              <div
<<<<<<< HEAD
                style={{ backgroundColor: "#388e3d" }}
                onClick={() => isParticipenceAllowed && setColor("green")}
=======
                onClick={() => {
                  setColor('Green');
                  setNumber(null);
                  setStartCart(true);
                }}
                style={{ backgroundColor: '#388e3d' }}
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5
              >
                <p>Join green</p>
                <p>1:2</p>
              </div>
            </div>

            <div className="paritynum-btns">
<<<<<<< HEAD
              {firstCardList.map((item) => (
                <div
                  onClick={() => isParticipenceAllowed && setNumber(item)}
                  key={item}
                >
                  <p>{item}</p>
                  <i className="fa-solid fa-bolt"></i>
=======
              {firstCardList.map((item, i) => (
                <div
                key={i}
                  onClick={() => {
                    setNumber(item);
                    setColor(null);
                    setStartCart(true);
                  }}
                >
                  <p>{item}</p>
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5
                </div>
              ))}
            </div>

            <div className="parity-btn">
              <button
<<<<<<< HEAD
                onClick={() => setActiveBtn("continuos")}
                className={activeBtn === "continuos" ? "parity-btn-active" : ""}
=======
                onClick={() => setActiveBtn('continuos')}
                className={activeBtn === 'continuos' ? 'parity-btn-active' : ''}
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5
              >
                Continuos
              </button>
              <button
<<<<<<< HEAD
                onClick={() => setActiveBtn("record")}
                className={activeBtn === "record" ? "parity-btn-active" : ""}
=======
                onClick={() => setActiveBtn('record')}
                className={activeBtn === 'record' ? 'parity-btn-active' : ''}
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5
              >
                Record
              </button>
              <button
<<<<<<< HEAD
                onClick={() => setActiveBtn("probability")}
                className={
                  activeBtn === "probability" ? "parity-btn-active" : ""
=======
                onClick={() => setActiveBtn('probability')}
                className={
                  activeBtn === 'probability' ? 'parity-btn-active' : ''
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5
                }
              >
                Probability
              </button>
            </div>

<<<<<<< HEAD
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

            <div className="game-second-row">
              {firstCardList.map((item) => (
                <div className="game-second-row-color" key={item}>
                  <p>{item}</p>
                </div>
              ))}

              {firstCardList.map((item) => (
                <div key={item}>
                  <p>0</p>
                </div>
              ))}
            </div>

            <GameDetails />
=======
            {activeBtn === 'continuos' && <ContinuousTab />}

            {activeBtn === 'record' && <Record />}

            {activeBtn === 'probability' && (
              <Probability probabilityBox={probabilityBox} />
            )}

            <div className="gameDetails-btn-group">
              <button
                onClick={() => setActiveBtn2('OtherPlayers')}
                className={`${
                  activeBtn2 === 'OtherPlayers' ? 'gameDetails-activeBtn' : ''
                }`}
              >
                Other Players
              </button>

              <button
                onClick={() => setActiveBtn2('MyOrder')}
                className={`${
                  activeBtn2 === 'MyOrder' ? 'gameDetails-activeBtn' : ''
                }`}
              >
                My Orders
              </button>
            </div>

            {activeBtn2 === 'OtherPlayers' ? (
              <div className="gameDetails-others">
                <div>
                  <p>Period</p>
                  <small>18:54</small>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p>User</p>
                  <small>****18787</small>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p>Select</p>
                  <small>2x2</small>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <p>Point</p>
                  <small>₹ 90</small>
                </div>
              </div>
            ) : (
              <div>
                <table style={{ width: '100%', marginTop: '1rem' }}>
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
            )}
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5
          </div>
        </div>
      </div>
    </>
  );
};

<<<<<<< HEAD
export default FastParity;
=======
const Probability = ({ probabilityBox }) => (
  <>
    <div>
      <p
        style={{
          textAlign: 'center',
          marginTop: '1.2rem',
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
        <p style={{ backgroundColor: '#d72e2a' }}>R</p>
        <div
          className="game-first-row-box"
          style={{ backgroundColor: '#ffcdd2' }}
        ></div>
      </div>

      <div className="game-first-row-box-out">
        <p style={{ backgroundColor: '#1976d3' }}>B</p>
        <div
          className="game-first-row-box"
          style={{ backgroundColor: '#bbdefa' }}
        ></div>
      </div>

      <div className="game-first-row-box-out">
        <p style={{ backgroundColor: '#388e3d' }}>G</p>
        <div
          className="game-first-row-box"
          style={{ backgroundColor: '#c8e6ca' }}
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
    '-',
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
                  item === '-'
                    ? '#fec007'
                    : item % 2 === 0
                    ? '#f44238'
                    : '#3b8d3c',
              }}
            >
              <div
                className="parity__records__circle__col"
                style={{
                  background:
                    item === 0 ? '#f24337' : item === 5 ? '#1f98ef' : '',
                }}
              ></div>
              <div
                className="parity__records__circle__col"
                style={{
                  background:
                    item === 0 ? '#0f45a2' : item === 5 ? '#388e3d' : '',
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
    '-',
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
                  item === '-'
                    ? '#fec007'
                    : item % 2 === 0
                    ? '#f44238'
                    : '#3b8d3c',
              }}
            >
              <div
                className="parity__records__circle__col"
                style={{
                  background:
                    item === 0 ? '#f24337' : item === 5 ? '#1f98ef' : '',
                }}
              ></div>
              <div
                className="parity__records__circle__col"
                style={{
                  background:
                    item === 0 ? '#0f45a2' : item === 5 ? '#388e3d' : '',
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
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5
