import React from 'react';
import './Rewards.css'
import Progressbar from '../../components/ProgressBar';
import { profileFilled, receipt } from '../../assets';

const Rewards = () => {
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

const RewardCard = ({progressRate, btn, bgcolor, icon}) => {
  console.log(progressRate);
  return (
  <div className='reward-card'>
    <div className='reward-card-desc'>
      <img style={{backgroundColor: bgcolor}} src={icon} alt="" />

      <div>
        <h3>First Invitation</h3>
        <p>After invitation users to complete download registration and purchase points, they can recive</p>
      </div>

      <h2>+5.0</h2>
    </div>
    
    <Progressbar bgcolor="#69f0ae" progress={progressRate}  height={6} />
    <div className='progress-percentage'>
      <p>{progressRate}%</p>
      <p>100%</p>
    </div>

    <div>
          <button className='reward-btn'>{btn}</button>
        </div>
  </div>
)}


export default Rewards;
