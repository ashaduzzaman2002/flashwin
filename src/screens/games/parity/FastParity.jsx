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
=======
import React, { useEffect, useState } from 'react';
import { database } from '../../../firebase.config';

import '../../../components/parity/parity.css';
import GameDetails from '../../../components/gameDetails/GameDetails';
import Start from '../../../components/start/Start';
import { onValue, ref } from 'firebase/database';
import { dbObject } from '../../../helper/constant';
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5

const FastParity = () => {
  const { user } = useContext(AuthContext);
  const [isFastParityPlaying, setIsFastParityPlaying] = useState(false); //check if the game is playing or not
<<<<<<< HEAD
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
    const data = await dbObject.get("/fastparity/historyall");
    if (!data.data.error) {
      setRecords(data.data.data);
    }
  };

  const getProbability = async () => {
    const data = await dbObject.get("/fastparity/probability");
    if (!data.data.error) {
      setProbability(data.data.data);
    }
  };

  const getContinuos = async () => {
    const data = await dbObject.get("/fastparity/continous");
    if (!data.data.error) {
      setContinuos(data.data.data);
    }
  };

  const getMyRecords = async () => {
    const data = await dbObject.get("/fastparity/history");
    if (!data.data.error) {
      setMyRecords(data.data.data);
    }
  };

  const getResult = async () => {
    const body = {
      game_id: gameid,
    };
    const data = await dbObject.post("/fastparity/result", body);
    console.log(data);
    setIsFastParityPlaying(false);
  };

  useEffect(() => {
    const fastParityRef = ref(database, "fast_parity/timer");
    setIsParticipenceAllowed(false);
=======
  const firstCardList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const probabilityBox = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [activeBtn, setActiveBtn] = useState('probability');
  const [activeBtn2, setActiveBtn2] = useState('OtherPlayers');
  const [timer, setTimer] = useState(0);
  const [startCart, setStartCart] = useState(false);
  const [color, setColor] = useState(null);
  const [number, setNumber] = useState(null);

  useEffect(() => {
    const fastParityRef = ref(database, 'fast_parity/timer');
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5

    setTimeout(() => {
      onValue(fastParityRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const key = Object.keys(data)[0];
          const { time } = data[key];
          setTimer(time);
          if (Number(time) == 12) {
            setIsParticipenceAllowed(false);
          }
          if (Number(time) == 1) {
            if (isFastParityPlaying) {
              getResult();
            }
          }
          if (Number(time) == 0 || Number(time) == 35) {
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

<<<<<<< HEAD
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
    const data = await dbObject.post("/fastparity/play", body);
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
      <ToastContainer />
      {amountModal && color && (
        <Start
          name={"Fast Party - " + color}
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
          name={"Fast Party - " + number}
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

=======
  const startGame = async (value) => {
    setStartCart(false);

    try {
      const { data } = await dbObject.post('/parity/play', { ...value, color });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {startCart && (
        <Start
          startGame={startGame}
          name={`Fast Parity - ${color || number}`}
          setStartCart={setStartCart}
          color={color}
        />
      )}
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5
      <div
        style={{
          width: '100%',
          minHeight: '95vh',
          background: 'linear-gradient(180deg, #310b5e, #0a1527)',
          marginBottom: '-2rem',
        }}
      >
        <div className="container">
          <div className="parity-container">
            <h2>Fast Parity</h2>

            <div className="parity-top">
              <div className="parity-period">
                <p>Period</p>
                <p>23034151</p>
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
=======
              {firstCardList.map((item, i) => (
                <div
                key={i}
                  onClick={() => {
                    setNumber(item);
                    setColor(null);
                    setStartCart(true);
                  }}
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5
                >
                  <p>{item}</p>
                  <i className="fa-solid fa-bolt"></i>
                </div>
              ))}
            </div>

            <div className="parity-btn">
              <button
                onClick={() => setActiveBtn('continuos')}
                className={activeBtn === 'continuos' ? 'parity-btn-active' : ''}
              >
                Continuos
              </button>
              <button
                onClick={() => setActiveBtn('record')}
                className={activeBtn === 'record' ? 'parity-btn-active' : ''}
              >
                Record
              </button>
              <button
                onClick={() => setActiveBtn('probability')}
                className={
                  activeBtn === 'probability' ? 'parity-btn-active' : ''
                }
              >
                Probability
              </button>
            </div>

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

<<<<<<< HEAD
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
=======
            {activeBtn2 === 'OtherPlayers' ? (
              <div className="gameDetails-others">
                <div>
                  <p>Period</p>
                  <small>18:54</small>
>>>>>>> 668bba1c6fdbd32208eb83025b63161403e4eca5
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
                        <p
                          style={{
                            backgroundColor: '#1776d7',
                            width: '100%',
                            color: '#fff',
                          }}
                        >
                          blue
                        </p>
                      </td>
                      <td>₹10</td>
                      <td className="parity-selected parity-result">
                        <p style={{ backgroundColor: '#388e3d' }}>7</p>
                      </td>
                      <td>+₹0.00</td>
                    </tr>
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
      <p>Fast Parity Record</p>
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

export default FastParity;
