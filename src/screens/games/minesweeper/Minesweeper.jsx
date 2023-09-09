import React, { useEffect, useState } from "react";
import "./Minesweeper.css";
import { dbObject } from "../../../helper/constant";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import Toaster from "../../../components/Toster/Toaster";
import { bomb, mining, moneyBag } from "../../../assets";
import Lottie from "lottie-react";
import { Toast } from "../../../helper";
import ResultPopup from "../../../components/result-popup/ResultPopup";

const Minesweeper = () => {
  const [ratio, setRatio] = useState("2x2");
  const [contactPoint, setContactPoint] = useState(10);
  const [amount, setAmount] = useState(contactPoint);

  const [cellsMined, setCellsMined] = useState([0]);
  const [selectedGridType, setSelectedGridType] = useState(2);
  const [selectedAmount, setSelectedAmount] = useState(20);
  const [gameId, setGameId] = useState("");
  const [bonusAmount, setBonusAmount] = useState(0.0);
  const [isPlayingMinesweeper, setIsPlayingMinesweeper] = useState(false);
  const [startCart, setStartCart] = useState(false);
  const [miningAnimation, setMiningAnimation] = useState(false);
  const [isMined, setIsMined] = useState(false);
  const game = "minesweeper";
  const name = "Minesweeper";
  const [activeBtn2, setActiveBtn2] = useState("OtherPlayers");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState();

  const { walletBalance } = useContext(AuthContext);

  // Update ammount on selecting contact amount
  useEffect(() => {
    setAmount(contactPoint);
  }, [contactPoint]);

  const handleStart = () => {
    setStartCart(true);
  };

  // handle increment of amount
  const handleInc = (value) => {
    return setAmount(amount + (value * contactPoint) / 10);
  };

  // handle decreament of amount
  const handleDec = (value) => {
    if (amount > (contactPoint * value / 10)) return setAmount(amount -  (value * contactPoint) / 10);
  };

  const startGame = async () => {
    setStartCart(false);
    setIsPlayingMinesweeper(false);
    setGameId("");

    let body = {
      amount: selectedAmount,
      cell: String(ratio === "2x2" ? 2 : 4),
    };

    console.log(body);
    const response = await dbObject.post("/mine/start", body);

    console.log(response.data);
    if (!response.data.error) {
      setIsPlayingMinesweeper(true);
      setGameId(response.data.id);
      // toast.success(response?.data?.message);
      Toast(response?.data?.message, "");
      setSelectedGridType(ratio === "2x2" ? 2 : 4);
    } else if (
      response.data.error &&
      response.data.message === "Game is already running"
    ) {
      setIsPlayingMinesweeper(true);
      setSelectedGridType(response?.data?.data?.game_mode === "2*2" ? 2 : 4);
      setGameId(response.data.data?.game_id);
      setCellsMined(removeLastComma(response.data.data?.tapped_cells));
      setBonusAmount(response.data.data?.total_transaction);
      Toast("Game is already running", 30000);
    } else {
      setIsPlayingMinesweeper(false);
      setGameId("");
      toast.error("Something went wrong");
    }
  };

  // useEffect(() => {
  //   startGame()
  // }, [])

 

  const stopAndClaimBonus = async () => {
    if (cellsMined?.length > 0) {
      try {
        // return console.log('first')
        const { data } = await dbObject.post("/mine/stop", { game_id: gameId });
        console.log(data);
        if (!data.error) {
          setIsPlayingMinesweeper(false);
          setCellsMined([]);
          setBonusAmount(0.0);
          setSelectedAmount(20);
          // Toast(data?.message + " Wallet balance " + data.total_transaction, '')
          // setWinAmount(data.total_transaction)
          setResult(data);
          setShowResult(true);
          getMinesweeperHistory();

          // setTimeout(() => {
          //   setWinAmount(null);
          //   setShowResult(false);
          // }, 3000);
        } else {
          toast.success(data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.success("Please mine atleast one cell");
      Toast("Please mine atleast one cell", "");
    }
  };

  const mineCell = async (cell) => {
    if (isPlayingMinesweeper) {
      setIsMined(true);
      setMiningAnimation(cell);
      if (!cellsMined?.includes(cell)) {
        const body = {
          cell: String(cell),
        };

        const { data } = await dbObject.post("/mine/bonus", body);
        console.log(data);
        if (!data.error) {
          Toast("You won " + data.bonus + " bonus");

          setCellsMined((prev) => [...prev, cell]);
          setBonusAmount(data.bonus);
          getMinesweeperHistory();
        } else {
          setResult({
            bomb: {
              bomb_cell: data?.bomb,
            },
            total_transaction: "0",
          });
          setShowResult(true);
          setIsPlayingMinesweeper(false);
          setCellsMined([]);
          setBonusAmount(0.0);
          setSelectedAmount(20);

          getMinesweeperHistory();

          // setTimeout(() => {
          //   setShowResult(false);
          // }, 3000);
        }
        setMiningAnimation(null);
      } else {
        // toast.warning("Already mined");
        Toast("Already mined", "");
        setMiningAnimation(null);
      }

      setTimeout(() => {
        setIsMined(false);
      }, 1000);
      if (
        (selectedGridType === 2 && cellsMined.length + 1 === 2 * 2) ||
        (selectedGridType === 4 && cellsMined.length + 1 === 4 * 4)
      ) {
        stopAndClaimBonus();
      }
    }
  };

  useEffect(() => {
    console.log(selectedGridType);
  });

  const removeLastComma = (arr) => {
    var b = arr.split(",").map(function (item) {
      return parseInt(item, 10);
    });
    b.pop();
    return b;
  };

  const closeCard = () => {
    setStartCart(false);
  };

  const [minesweeperHistory, setMinesweeperHistory] = useState([]);

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

  useEffect(() => {
    getMinesweeperHistory();
  }, []);

  return (
    <div
      className="container"
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #424242, #071724)",
      }}
    >
      {showResult && (
        <ResultPopup
          result={result}
          ratio={ratio}
          setShowResult={setShowResult}
        />
      )}

      <Toaster position={"top-left"} />
      {startCart && (
        <div className="start-container">
          <div onClick={closeCard} className="card-out-side"></div>
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
                  <button onClick={() => handleDec(50)}>-5</button>
                  <button onClick={() => handleDec(10)}>-1</button>
                </div>
                <p>{amount}</p>
                <div>
                  <button onClick={() => handleInc(10)}>+1</button>
                  <button onClick={() => handleInc(50)}>+5</button>
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

      <div className="minesweeper-container" style={{ marginBottom: "-65px" }}>
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
          {isMined && (
            <div
              style={{
                backgroundColor: "#00000059",
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                position: "absolute",
                zIndex: "9999",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
              }}
            >
              <div class="loader"></div>
            </div>
          )}
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
          <div>
            {minesweeperHistory.map((item, i) => {
              var inputDate = new Date(item.date);
              var outputFormat = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              });
              var formattedOutput = outputFormat.format(inputDate);

              return (
                <div className="mine-myorder" key={i}>
                  <div className="game-type">
                    {item?.game_mode === "2*2" ? (
                      <div
                        className={`minesweeper-game-2x2`}
                        style={{ marginBottom: 0 }}
                      >
                        <div>
                          {item?.bomb_cell === "1" && (
                            <img style={{ width: "80%" }} src={bomb} alt="" />
                          )}
                        </div>
                        <div>
                          {item?.bomb_cell === "2" && (
                            <img style={{ width: "80%" }} src={bomb} alt="" />
                          )}
                        </div>
                        <div>
                          {item?.bomb_cell === "3" && (
                            <img style={{ width: "80%" }} src={bomb} alt="" />
                          )}
                        </div>
                        <div>
                          {item?.bomb_cell === "4" && (
                            <img style={{ width: "80%" }} src={bomb} alt="" />
                          )}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`minesweeper-game-4x4`}
                        style={{ marginBottom: 0 }}
                      >
                        <div>
                          {item?.bomb_cell === "1" && (
                            <img style={{ width: "80%" }} src={bomb} alt="" />
                          )}
                        </div>
                        <div>
                          {item?.bomb_cell === "2" && (
                            <img style={{ width: "80%" }} src={bomb} alt="" />
                          )}
                        </div>
                        <div>
                          {item?.bomb_cell === "3" && (
                            <img style={{ width: "80%" }} src={bomb} alt="" />
                          )}
                        </div>
                        <div>
                          {item?.bomb_cell === "4" && (
                            <img style={{ width: "80%" }} src={bomb} alt="" />
                          )}
                        </div>
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
                      style={{
                        marginTop: 8,
                        fontSize: 15,
                        color: "#e5eae7",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Delivery: ₹{item.game_amount}</span>{" "}
                      <span>Fees: ₹1.00</span>
                    </p>
                    <p style={{ marginTop: 8, fontSize: 15, color: "#e5eae7" }}>
                      {formattedOutput}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Minesweeper;
