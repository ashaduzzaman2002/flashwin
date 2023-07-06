import React, { useEffect, useState } from "react";
import "./Minesweeper.css";
import GameDetails from "../../../components/gameDetails/GameDetails";
import { dbObject } from "../../../helper/constant";

const Minesweeper = () => {
  const [ratio, setRatio] = useState("2x2");

  useEffect(() => {
    startGame();
  }, []);

  const startGame = async () => {
    let body;
    if (ratio === "2x2") {
      body = {
        amount: 20,
        cell: 2,
      };
    } else {
      body = {
        amount: 20,
        cell: 4,
      };
    }
    const response = await dbObject.post("mine/start", body);
    console.log(response);
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
      <div className="minesweeper-container">
        <h2>Minesweeper</h2>

        <div className="minesweeper-ratio">
          <button
            onClick={() => setRatio("2x2")}
            className={`${ratio === "2x2" && "minesweeper-ratio-active"}`}
          >
            2x2
          </button>
          <button
            onClick={() => setRatio("4x4")}
            className={`${ratio === "4x4" && "minesweeper-ratio-active"}`}
          >
            4x4
          </button>
        </div>

        <div className="minesweeper-game">
          <div
            className={`minesweeper-game-2x2 ${ratio == "2x2" ? "" : "hide"}`}
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div
            className={`minesweeper-game-4x4 ${ratio === "4x4" ? "" : "hide"}`}
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <button>Start</button>
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
