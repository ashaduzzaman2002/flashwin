import React, { useEffect, useState } from 'react';
import './CheckIn.css';
import { coin, treasure } from '../../assets';
import { dbObject } from '../../helper/constant';

import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CheckIn = () => {
  const dayList = [1, 2, 3, 4, 5, 6, 7];
  const [data, setData] = useState([]);

  const navigate = useNavigate()

  const checkinData = [
    {
      label: 'Day 1',
      amount: 1,
      icon: 'coin',
      listLabel: 'day1',
    },
    {
      label: 'Day 2',
      amount: 2,
      icon: 'coin',
      listLabel: 'day2',
    },
    {
      label: 'Day 3',
      amount: 2,
      icon: 'coin',
      listLabel: 'day3',
    },
    {
      label: 'Day 4',
      amount: 2,
      icon: 'coin',
      listLabel: 'day4',
    },
    {
      label: 'Day 5',
      amount: 3,
      icon: 'coin',
      listLabel: 'day5',
    },
    {
      label: 'Day 6',
      amount: 3,
      icon: 'coin',
      listLabel: 'day6',
    },
    {
      label: 'Day 7',
      amount: 3,
      icon: 'coin',
      listLabel: 'day7',
    },
  ];

  let dailyCheckinList = {
    day1: null,
    day2: null,
    day3: null,
    day4: null,
    day5: null,
    day6: null,
    day7: null,
  };

  const fetchCheckinDetails = async () => {
    try {
      const { data } = await dbObject.post('/task/checkin/fetch');
      if (!data.error) {
        setData(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const claimCheckinReward = async () => {
    try {
      const { data } = await dbObject.post('/task/checkin');
      if (!data.error) {
        toast.success(data.message, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else {
        toast.error(data.message, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCheckinDetails();
  }, []);

  return (
    <div class="App">
      <div class="app__responsive">
        <div class="checkIn__page">
          <div className='container'>
            
          <div class="checkIn__nav">
            <div class="checkIn__nav__col">
              <div
              onClick={() => navigate('/')}
                class="top__nav__back__btn"
                style={{ color: 'rgb(255, 255, 255)' }}
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
              class="checkIn__nav__col"
              style={{ color: 'rgb(255, 255, 255)', fontWeight: '500' }}
            >
              <center>Check In</center>
            </div>
            <div class="checkIn__nav__col"></div>
          </div>
          <div class="checkIn__screen" style={{ position: 'relative' }}>
            <div class="checkIn__screen__container">
              <CoinCard title='Day 1' point="1" />
              <CoinCard title='Day 2' point="2" />
              <CoinCard title='Day 3' point="2" />
              <CoinCard title='Day 4' point="2" />
              <CoinCard title='Day 5' point="3" />
              <CoinCard title='Day 6' point="3" />
              <CoinCard title='Day 7' point="3" />
              
              
              
            </div>
            <div class="checkIn__button__container">
              <button
              onClick={claimCheckinReward}
                class="checkIn__button"
                style={{
                  background: 'rgb(253, 221, 12)',
                  color: 'rgb(255, 255, 255)',
                }}
              >
                Check In
              </button>
            </div>
          </div>
          <div class="checkIn__bottom__screen">
            <div class="checkIn__bottom__screen__text container">
              Check in for 7 consecutive days to get the key, use the key
              treasure box, and receive mysterious prizes!
            </div>
            <div class="checkIn__bottom__screen__img">
              <center>
                <img
                  src="https://teslawin.in/static/media/Treasure_b.d88905617ada24157d96.png"
                  alt=""
                  class="img1"
                />
              </center>
            </div>
          </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

const CoinCard = ({title, point}) => (
  <div class="checkIn__screen__col">
    <center>
      <div class="checkIn__screen__col__day">{title}</div>
      <img src={coin} alt="" height="40" class="checkIn__screen__col__img" />
      <div class="checkIn__screen__col__bonus">
        <span>+</span> {point}
      </div>
    </center>
  </div>
);

export default CheckIn;
