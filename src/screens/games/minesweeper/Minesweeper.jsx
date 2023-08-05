import React, { useEffect, useState } from "react";
import "./Minesweeper.css";
import { dbObject } from "../../../helper/constant";
import GameDetails from "../../../components/gameDetails/GameDetails";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import Toaster from "../../../components/Toster/Toaster";
import { bomb, mining, moneyBag } from "../../../assets";
import Lottie from "lottie-react";

const Minesweeper = () => {
  const [ratio, setRatio] = useState("2x2");
  const [contactPoint, setContactPoint] = useState(10);

  const [cellsMined, setCellsMined] = useState([0]);
  const [selectedGridType, setSelectedGridType] = useState(2);
  const [selectedAmount, setSelectedAmount] = useState(20);
  const [gameId, setGameId] = useState("");
  const [rewardAmount, setRewardAmount] = useState(0.0);
  const [bonusAmount, setBonusAmount] = useState(0.0);
  const [randomUsers, setRandomUsers] = useState([]);
  const [previousGameData, setPreviousGameData] = useState({});
  const [isPlayingMinesweeper, setIsPlayingMinesweeper] = useState(false);
  const [startCart, setStartCart] = useState(false);
  const [miningAnimation, setMiningAnimation] = useState(false);
  const game = "minesweeper";
  const name = "Minesweeper";
  const [activeBtn2, setActiveBtn2] = useState("OtherPlayers");
  const [toastMsg, setToastMsg] = useState(null);

  const { walletBalance } = useContext(AuthContext);

  const handleStart = () => {
    setStartCart(true);
  };

  const startGame = async () => {
    setStartCart(false);
    setIsPlayingMinesweeper(false);
    setGameId("");

    let body = {
      amount: selectedAmount,
      cell: selectedGridType,
    };
    const response = await dbObject.post("/mine/start", body);
    if (!response.data.error) {
      setIsPlayingMinesweeper(true);
      setGameId(response.data.id);
      toast.success(response?.data?.message);
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
      toast.warning("Game is already running");
    } else {
      setIsPlayingMinesweeper(false);
      setGameId("");
      toast.error("Something went wrong");
    }
  };

  const handleInc = (value) => {
    return setContactPoint(contactPoint + value);
  };

  const handleDec = (value) => {
    if (contactPoint > 5) return setContactPoint(contactPoint - value);
  };

  const stopAndClaimBonus = async () => {
    if (cellsMined?.length > 0) {
      const { data } = await dbObject.post("/mine/stop", { game_id: gameId });
      if (!data.error) {
        setIsPlayingMinesweeper(false);
        setCellsMined([]);
        setRewardAmount(0.0);
        setBonusAmount(0.0);
        setSelectedAmount(20);
        toast.success(
          data?.message + " Wallet balance " + data.total_transaction
        );
      } else {
        toast.success(data?.message);
      }
    } else {
      toast.success("Please mine atleast one cell");
    }
  };

  const mineCell = async (cell) => {
    setMiningAnimation(cell);
    if (!cellsMined?.includes(cell)) {
      // mining popup animation

      // call bonus api
      const body = {
        cell: cell,
      };

      const { data } = await dbObject.post("/mine/bonus", body);
      if (!data.error) {
        // toast.success('You won ' + data.bonus + ' bonus');
        setToastMsg("You won " + data.bonus + " bonus");

        setCellsMined((prev) => [...prev, cell]);
        setBonusAmount(data.bonus);
        setRewardAmount(data.total_transaction);

        setTimeout(() => {
          setToastMsg(null);
        }, 2000);
      }
      setMiningAnimation(null);
    } else {
      toast.warning("Already mined");
      setMiningAnimation(null);
    }
    if (
      (selectedGridType == 2 && cellsMined.length + 1 == 2 * 2) ||
      (selectedGridType == 4 && cellsMined.length + 1 == 4 * 4)
    ) {
      stopAndClaimBonus();
    }
  };

  const removeLastComma = (arr) => {
    var b = arr.split(",").map(function (item) {
      return parseInt(item, 10);
    });
    b.pop();
    return b;
  };

  const closeCard = () => {
    setStartCart(false)
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
      {toastMsg ? <div className="toast-custom">{toastMsg}</div> : null}

      <Toaster position={"top-left"} />
      {startCart && (
        <div className="start-container">
          <div onClick={closeCard} className='card-out-side'></div>
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
                  <button onClick={() => handleDec(5)}>-5</button>
                  <button onClick={() => handleDec(1)}>-1</button>
                </div>
                <p>{contactPoint}</p>
                <div>
                  <button onClick={() => handleInc(1)}>+1</button>
                  <button onClick={() => handleInc(5)}>+5</button>
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
                  {cellsMined?.includes(i + 1) && (
                    <img width={"90%"} src={moneyBag} alt="money" />
                  )}

                  {miningAnimation === i + 1 ? (
                    <div className="minnig">
                      <Lottie animationData={mining} loop={true} />
                    </div>
                  ) : null}
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
                <div key={i + 1} id={i + 1} onClick={() => mineCell(i + 1)}>
                  {cellsMined?.includes(i + 1) && (
                    <img width={"90%"} src={moneyBag} alt="money" />
                  )}
                </div>
              ))}
          </div>
          {!isPlayingMinesweeper && (
            <button style={{ cursor: "default" }} onClick={handleStart}>
              Start
            </button>
          )}
        </div>

        {isPlayingMinesweeper && (
          <div className="minesweeper-bonus">
            <div>
              <p>Bonus </p>
              <p>₹ {bonusAmount}</p>
            </div>

            <button onClick={() => stopAndClaimBonus()}>Stop & Claim</button>
          </div>
        )}

        <div className="minesweeper-note">
          <img src="" alt="" />
          <p>
            <i className="fa-solid fa-circle-info"></i> Check the boxes that you
            think have no mines to get a bonus
          </p>
        </div>

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
          <div className="mine-myorder">
            <div className="game-type">
              <div
                className={`minesweeper-game-2x2`}
                style={{ marginBottom: 0 }}
              >
                <div>
                  <img style={{ width: "80%" }} src={bomb} alt="" />
                </div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>

            <div style={{ marginLeft: "1rem" }}>
              <div style={{ margin: 0 }} className="myorder-text">
                <div>
                  <p>Points</p>
                  <p>₹ 20</p>
                </div>

                <div>
                  <p>Pass</p>
                  <p>3</p>
                </div>

                <div>
                  <p>Bonous</p>
                  <p style={{ color: "#7eb298" }}>+₹20.50</p>
                </div>
              </div>

              <p style={{ marginTop: 8, fontSize: 15, color: "#e5eae7" }}>
                Delivery: ₹19.00 Fees: ₹1.00
              </p>
              <p style={{ marginTop: 8, fontSize: 15, color: "#e5eae7" }}>
                12/07/2023 12:32
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Minesweeper;
