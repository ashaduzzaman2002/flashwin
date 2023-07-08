import React, { useEffect, useState } from "react";
import "./Minesweeper.css";
import { dbObject } from "../../../helper/constant";
import GameDetails from "../../../components/gameDetails/GameDetails";
import Start from "../../../components/start/Start";
import "../../../components/start/start.css";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

//   int _selectedGridType = 2;
//   int selectedAmount = 20;
//   String selectedPlayer = 'Other Players';
//   String gameId = '';
//   List<int> cellsMined = [];
//   double rewardAmount = 0.0;
//   double bonusAmount = 0.0;
//   List<dynamic> randomUsers = [];
//   Timer? userBidTimer;
//   Map previousGameData = {};
// bool isPlayingMinesweeper = false;

const Minesweeper = () => {
  const [ratio, setRatio] = useState("2x2");
  const [contactPoint, setContactPoint] = useState(10);

  const [cellsMined, setCellsMined] = useState([0]); // [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  const [selectedGridType, setSelectedGridType] = useState(2); // [2,4]
  const [selectedAmount, setSelectedAmount] = useState(20);
  const [selectedPlayer, setSelectedPlayer] = useState("Other Players");
  const [gameId, setGameId] = useState("");
  const [rewardAmount, setRewardAmount] = useState(0.0);
  const [bonusAmount, setBonusAmount] = useState(0.0);
  const [randomUsers, setRandomUsers] = useState([]);
  const [previousGameData, setPreviousGameData] = useState({});
  const [isPlayingMinesweeper, setIsPlayingMinesweeper] = useState(false);
  const [startCart, setStartCart] = useState(false);
  const [data, setData] = useState(); // {gameId: "minesweeper_2x2_20_1629785059", cell: 2, amount: 20, cellsMined: Array(1), rewardAmount: 0, …}
  const [selectedCell, setSelectedCell] = useState();
  const game = "minesweeper";
  const name = "Minesweeper";

  const { walletBalance } = useContext(AuthContext);

  const handleStart = () => {
    setStartCart(true);
  };

  // const startGame = async () => {
  //   let body;
  //   if (ratio === "2x2") {
  //     body = {
  //       amount: 20,
  //       cell: 2,
  //     };
  //   } else {
  //     body = {
  //       amount: 20,
  //       cell: 4,
  //     };
  //   }
  //   const response = await dbObject.post("mine/start", body);
  //   if (!response.data.error) {
  //     setData(response.data.data);
  //   }
  // };

  const startGame = async () => {
    setStartCart(false);
    setIsPlayingMinesweeper(false);
    setGameId("");
    // let body;
    // if (ratio === "2x2") {
    //   body = {
    //     amount: 20,
    //     cell: 2,
    //   };
    // } else {
    //   body = {
    //     amount: 20,
    //     cell: 4,
    //   };
    // }
    let body = {
      amount: selectedAmount,
      cell: selectedGridType,
    };
    const response = await dbObject.post("mine/start", body);
    if (!response.data.error) {
      setIsPlayingMinesweeper(true);
      setGameId(response.data.id);
      alert(response.data.message);
    } else if (
      response.data.error &&
      response.data.message === "Game is already running"
    ) {
      setPreviousGameData(response.data.data);
      setIsPlayingMinesweeper(true);
      setSelectedGridType(response?.data?.data?.game_mode === "2*2" ? 2 : 4);
      setGameId(response.data.data?.game_id);
      setCellsMined(removeLastComma(response.data.data?.tapped_cells));
      setRewardAmount(response.data.data?.total_transaction);
      setBonusAmount(response.data.data?.total_transaction);
      alert("Game is already running");
    } else {
      setIsPlayingMinesweeper(false);
      setGameId("");
      alert("Something went wrong");
    }
  };

  // const startGameModal = () => {
  //   setFunc(false);
  // };

  const handleIncDec = (value) => {
    // setContactPoint(contactPoint + value);
  };

  const stopAndClaimBonus = async () => {
    if (cellsMined?.length > 0) {
      const data = await dbObject.post("mine/stop", { game_id: gameId });
      if (!data.error) {
        setIsPlayingMinesweeper(false);
        setCellsMined([]);
        setRewardAmount(0.0);
        setBonusAmount(0.0);
        setSelectedAmount(20);
        alert(data?.message + " Wallet balance " + data.total_transaction);
      } else {
        alert(data?.message);
      }
    } else {
      alert("Please mine atleast one cell");
    }
  };

  const fetchMineSweeperUserHistory = async () => {};

  const mineCell = async (cell) => {
    if (!cellsMined?.includes(cell)) {
      // mining popup animation

      // call bonus api
      const body = {
        cell: cell,
      };
      const data = await dbObject.post("mine/bonus", body);
      if (!data.error) {
        alert("You won " + data.bonus + " bonus");
        setCellsMined((prev) => [...prev, cell]);
        setBonusAmount(data.bonus);
        setRewardAmount(data.total_transaction);
      }
    } else {
      alert("Already mined");
      setIsPlayingMinesweeper(false);
      setCellsMined([]);
      setRewardAmount(0.0);
      setBonusAmount(0.0);
      setGameId("");
      fetchMineSweeperUserHistory();
    }
    if (
      (selectedGridType == 2 && cellsMined.length + 1 == 2 * 2) ||
      (selectedGridType == 4 && cellsMined.length + 1 == 4 * 4)
    ) {
      stopAndClaimBonus();
    }
  };

  useEffect(() => {
    // startGame();
    // setTimeout(() => {
    //   mineCell(2);
    // }, 5000);
  }, []);

  const removeLastComma = (arr) => {
    var b = arr.split(",").map(function (item) {
      return parseInt(item, 10);
    });
    console.log("before b: ", b);
    // remove last comma
    b.pop();
    console.log("after b: ", b);
    return b;
  };

  return (
    <div
      className="container"
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #424242, #071724)",
      }}
    >
      {startCart && (
        <div className="start-container">
          <div className="start-box">
            <h2 className="game-name">{name}</h2>
            <p>Points</p>

            <div className="points-div">
              <h3>INR {walletBalance}</h3>
              <button>
                <i className="fa-solid fa-clock-rotate-left"></i> Recharge
              </button>
            </div>

            <div className="contract-point">
              {!game === "minesweeper" && <p>Contract Points</p>}

              <div>
                <button
                  onClick={() => setContactPoint(10)}
                  className={
                    contactPoint === 10 ? "contract-point-selected" : ""
                  }
                >
                  10
                </button>
                <button
                  onClick={() => setContactPoint(100)}
                  className={
                    contactPoint === 100 ? "contract-point-selected" : ""
                  }
                >
                  100
                </button>
                <button
                  onClick={() => setContactPoint(1000)}
                  className={
                    contactPoint === 1000 ? "contract-point-selected" : ""
                  }
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
                  <button onClick={() => handleIncDec(-5)}>-5</button>
                  <button onClick={() => handleIncDec(-1)}>-1</button>
                </div>
                <p>{contactPoint}</p>
                <div>
                  <button onClick={() => handleIncDec(1)}>+1</button>
                  <button onClick={() => handleIncDec(5)}>+5</button>
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

            <div style={{ width: "100%", marginTop: "1rem" }}>
              <button className="btn" onClick={startGame}>
                Start
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="minesweeper-container">
        <h2>Minesweeper</h2>

        <div className="minesweeper-ratio">
          <button
            disabled={isPlayingMinesweeper}
            onClick={() => setRatio("2x2")}
            className={`${ratio === "2x2" && "minesweeper-ratio-active"}`}
          >
            2x2
          </button>
          <button
            disabled={isPlayingMinesweeper}
            onClick={() => setRatio("4x4")}
            className={`${ratio === "4x4" && "minesweeper-ratio-active"}`}
          >
            4x4
          </button>
        </div>

        <div className="minesweeper-game">
          <div
            className={`minesweeper-game-2x2 ${ratio === "2x2" ? "" : "hide"}`}
          >
            {/* 2*2 cell */}
            {Array(4)
              .fill()
              .map((_, i) => (
                <div key={i + 1} id={i + 1} onClick={() => mineCell(i + 1)}>
                  {cellsMined?.includes(i + 1) && <p>found</p>}
                </div>
              ))}
          </div>

          <div
            className={`minesweeper-game-4x4 ${ratio === "4x4" ? "" : "hide"}`}
          >
            {/* 4*4 cell */}
            {Array(16)
              .fill()
              .map((_, i) => (
                <div
                  key={i + 1}
                  id={i + 1}
                  onClick={() => mineCell(i + 1)}
                ></div>
              ))}
          </div>
          {!isPlayingMinesweeper && (
            <button style={{ cursor: "default" }} onClick={handleStart}>
              Start
            </button>
          )}
        </div>

        <div className="minesweeper-note">
          <p>Bonus: {bonusAmount}</p>

          <button onClick={() => stopAndClaimBonus()}>
            <i className="fa-solid fa-circle-info"></i> Stop & Claim
          </button>
        </div>

        <div className="minesweeper-note">
          <img src="" alt="" />
          <p>
            <i className="fa-solid fa-circle-info"></i> Check the boxes that you
            think have no mines to get a bonus
          </p>
        </div>
        <GameDetails />
      </div>
    </div>
  );
};

export default Minesweeper;
