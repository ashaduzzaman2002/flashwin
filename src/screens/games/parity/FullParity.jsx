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
                aria-disabled={!isParticipenceAllowed}
                style={{ backgroundColor: "#d72e2a" }}
                onClick={() => isParticipenceAllowed && setColor("red")}
              >
                <p>Join Red</p>
                <p>1:2</p>
              </div>

              <div
                style={{ backgroundColor: "#1976d3" }}
                onClick={() => isParticipenceAllowed && setColor("blue")}
              >
                <p>Join Blue</p>
                <p>1:4.5</p>
              </div>

              <div
                style={{ backgroundColor: "#388e3d" }}
                onClick={() => isParticipenceAllowed && setColor("green")}
              >
                <p>Join green</p>
                <p>1:2</p>
              </div>
            </div>

            <div className="paritynum-btns">
              {firstCardList.map((item) => (
                <div
                  onClick={() => isParticipenceAllowed && setNumber(item)}
                  key={item}
                >
                  <p>{item}</p>
                  <i className="fa-solid fa-bolt"></i>
                </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default FastParity;
