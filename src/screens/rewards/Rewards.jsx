import React, { useEffect } from 'react';
import './Rewards.css'
import Progressbar from '../../components/ProgressBar';
import { profileFilled, receipt } from '../../assets';
import { dbObject } from '../../helper/constant';

const Rewards = () => {

  let taskRewardList = {
    'task1': {
      'task': 'Invite first customer',
      'reward': 5,
      'target': 1,
      'achieved': 0
    },
    'task2': {
      'task': 'Invite customer with your refer and make them first recharge',
      'reward': 20,
      'target': 1,
      'achieved': 0
    },
    'task3': {
      'task': 'Do your first recharge',
      'reward': 20,
      'target': 1,
      'achieved': 0
    },
    'task4': {
      'task': 'Play 100 games',
      'reward': 15,
      'target': 100,
      'achieved': 0
    },
    'task5': {
      'task': 'Play 1000 games',
      'reward': 40,
      'target': 1000,
      'achieved': 0
    },
    'task6': {
      'task': 'Play 10000 games',
      'reward': 300,
      'target': 10000,
      'achieved': 0
    }
  };


  const fetchTaskRewardDetails = async () => {
    try {
      const { data } = await dbObject.get("/task/reward");
      // console.log(data.task1);
      if (!data.error) {
        taskRewardList.task1 = data.task1;
        taskRewardList.task2 = data.task2;
        taskRewardList.task3 = data.task3;
        taskRewardList.task4 = data.task4;
        taskRewardList.task5 = data.task5;
        taskRewardList.task6 = data.task6;
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchTaskRewardDetails();
  }, [])


  return (
    <div
      style={{
        background: 'linear-gradient(#1b4541, #25584f, #1b4541)',
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <div className="rewards-container">
          <h1>Check In</h1>

          <div className='reward-card-group'>
            <RewardCard bgcolor={'#62ffdb'} icon={profileFilled} progressRate='0' btn={'Invite'} />
            <RewardCard bgcolor={'#ffc008'} icon={profileFilled} progressRate='0' btn={'Invite'} />
            <RewardCard bgcolor={'#62ffdb'} icon={profileFilled} progressRate='50' btn={'Invite'} />
            <RewardCard bgcolor={'#ffc008'} icon={profileFilled} progressRate='50' btn={'Invite'} />
          </div>
        </div>
      </div>
    </div>
  );
};

const RewardCard = ({ progressRate, btn, bgcolor, icon }) => {
  // console.log(progressRate);
  return (
    <div className='reward-card'>
      <div className='reward-card-desc'>
        <img style={{ backgroundColor: bgcolor }} src={icon} alt="" />

        <div>
          <h3>First Invitation</h3>
          <p>After invitation users to complete download registration and purchase points, they can recive</p>
        </div>

        <h2>+5.0</h2>
      </div>

      <Progressbar bgcolor="#69f0ae" progress={progressRate} height={6} />
      <div className='progress-percentage'>
        <p>{progressRate}%</p>
        <p>100%</p>
      </div>

      <div>
        <button className='reward-btn'>{btn}</button>
      </div>
    </div>
  )
}


export default Rewards;
