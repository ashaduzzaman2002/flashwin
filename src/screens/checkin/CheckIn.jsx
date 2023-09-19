import React, { useEffect, useState } from "react";
import "./CheckIn.css";
import { coin, treasure } from "../../assets";
import { dbObject } from "../../helper/constant";

import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Toaster, { toastOptions } from "../../components/Toster/Toaster";

const CheckIn = () => {
  const navigate = useNavigate();
  const [dailyCheckinList, setDailyCheckList] = useState({
    day1: null,
    day2: null,
    day3: null,
    day4: null,
    day5: null,
    day6: null,
    day7: null,
  });

  const fetchCheckinDetails = async () => {
    try {
      const { data } = await dbObject.post("/task/checkin/fetch");
      console.log(data.data);
      if (!data.error) {
        setDailyCheckList(data?.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const claimCheckinReward = async () => {
    try {
      const { data } = await dbObject.post("/task/checkin");
      console.log(data);
      if (!data.error) {
        toast.success(data.message, toastOptions);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCheckinDetails();
  }, []);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App">
      <Toaster />
      <div className="app__responsive">
        <div className="checkIn__page">
          <div className="container">
            <div className="checkIn__nav">
              <div className="checkIn__nav__col">
                <div
                  onClick={() => navigate("/")}
                  className="top__nav__back__btn"
                  style={{ color: "rgb(255, 255, 255)" }}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M216.4 163.7c5.1 5 5.1 13.3.1 18.4L155.8 243h231.3c7.1 0 12.9 5.8 12.9 13s-5.8 13-12.9 13H155.8l60.8 60.9c5 5.1 4.9 13.3-.1 18.4-5.1 5-13.2 5-18.3-.1l-82.4-83c-1.1-1.2-2-2.5-2.7-4.1-.7-1.6-1-3.3-1-5 0-3.4 1.3-6.6 3.7-9.1l82.4-83c4.9-5.2 13.1-5.3 18.2-.3z"></path>
                  </svg>
                </div>
              </div>
              <div
                className="checkIn__nav__col"
                style={{ color: "rgb(255, 255, 255)", fontWeight: "500" }}
              >
                <center>Check In</center>
              </div>
              <div className="checkIn__nav__col"></div>
            </div>
            <div className="checkIn__screen" style={{ position: "relative" }}>
              <div className="checkIn__screen__container">
                <CoinCard
                  title={"Day 1"}
                  point={"1"}
                  isDisable={dailyCheckinList?.day1 !== null}
                />

                <CoinCard
                  title="Day 2"
                  point="2"
                  isDisable={dailyCheckinList?.day2 !== null}
                />
                <CoinCard
                  title="Day 3"
                  point="2"
                  isDisable={dailyCheckinList?.day3 !== null}
                />
                <CoinCard
                  title="Day 4"
                  point="2"
                  isDisable={dailyCheckinList?.day4 !== null}
                />
                <CoinCard
                  title="Day 5"
                  point="3"
                  isDisable={dailyCheckinList?.day5 !== null}
                />
                <CoinCard
                  title="Day 6"
                  point="3"
                  isDisable={dailyCheckinList?.day6 !== null}
                />
                <CoinCard
                  title="Day 7"
                  point="3"
                  isDisable={dailyCheckinList?.day7 !== null}
                />
              </div>
              <div className="checkIn__button__container">
                <button
                  onClick={claimCheckinReward}
                  className="checkIn__button"
                  style={{
                    background: "rgb(253, 221, 12)",
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  Check In
                </button>
              </div>
            </div>
            <div className="checkIn__bottom__screen">
              <div className="checkIn__bottom__screen__text container">
                Check in for 7 consecutive days to get the key, use the key
                treasure box, and receive mysterious prizes!
              </div>
              <div className="checkIn__bottom__screen__img">
                <center>
                  <img src={treasure} alt="" className="img1" />
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CoinCard = ({ title, point, isDisable }) => (
  <div className="checkIn__screen__col">
    <center>
      <div className="checkIn__screen__col__day">{title}</div>
      <img
        style={{ opacity: isDisable ? "0.5" : "1" }}
        src={coin}
        alt=""
        height="40"
        className="checkIn__screen__col__img"
      />
      <div className="checkIn__screen__col__bonus">
        <span>+</span> {point}
      </div>
    </center>
  </div>
);

export default CheckIn;
