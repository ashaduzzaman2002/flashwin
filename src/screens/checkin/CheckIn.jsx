import React, { useEffect } from 'react';
import './CheckIn.css';
import { coin, treasure } from '../../assets';
import { dbObject } from '../../helper/constant';

import { toast, ToastContainer } from 'react-toastify';

const CheckIn = () => {
  const dayList = [1, 2, 3, 4, 5, 6, 7];

  const checkinData = [
    {
      'label': 'Day 1',
      'amount': 1,
      'icon': 'coin',
      'listLabel': 'day1',
    },
    {
      'label': 'Day 2',
      'amount': 2,
      'icon': 'coin',
      'listLabel': 'day2',
    },
    {
      'label': 'Day 3',
      'amount': 2,
      'icon': 'coin',
      'listLabel': 'day3',
    },
    {
      'label': 'Day 4',
      'amount': 2,
      'icon': 'coin',
      'listLabel': 'day4',
    },
    {
      'label': 'Day 5',
      'amount': 3,
      'icon': 'coin',
      'listLabel': 'day5',
    },
    {
      'label': 'Day 6',
      'amount': 3,
      'icon': 'coin',
      'listLabel': 'day6',
    },
    {
      'label': 'Day 7',
      'amount': 3,
      'icon': 'coin',
      'listLabel': 'day7',
    },
  ];

  let dailyCheckinList = {
    "day1": null,
    "day2": null,
    "day3": null,
    "day4": null,
    "day5": null,
    "day6": null,
    "day7": null
  };

  const fetchCheckinDetails = async () => {
    try {
      const { data } = await dbObject.post('/task/checkin/fetch')
      // console.log(data.error);
      if (!data.error) {
        dailyCheckinList = data.data[0];
        // console.log(dailyCheckinList.day1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const claimCheckinReward = async () => {
    try {
      const { data } = await dbObject.post("/task/checkin");
      // console.log(data);
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
  }

  useEffect(() => {
    fetchCheckinDetails();
  }, [])


  return (
    <div
      style={{
        background: 'linear-gradient(#6b2e01, #071724)',
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <div className="checkin-container">
          <h1>Check In</h1>

          <div className="daily-rewards">
            {dayList.map((item) => (
              <div key={item}>
                <p>Day {item}</p>
                <img src={coin} alt="" />
              </div>
            ))}
          </div>

          <div>
            <button className="checkin-btn" onClick={claimCheckinReward}>Check In</button>
          </div>

          <p className='checkin-desc'>Check in for 7 consecutive days to get the key for mega tresure box and recive the mysterious prizes!</p>

          <div className='checkin-tresure'>
            <img src={treasure} alt="" />
            <div />
          </div>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

        </div>
      </div>
    </div>
  );
};

export default CheckIn;
