import React, { useEffect, useState } from 'react';
import './Rewards.css';
import Progressbar from '../../components/ProgressBar';
import { profileFilled, receipt } from '../../assets';
import { dbObject } from '../../helper/constant';

const Rewards = () => {
  const [taskReward, setTaskReward] = useState([]);

  const fetchTaskRewardDetails = async () => {
    try {
      const { data } = await dbObject.get('/task/reward');
      setTaskReward(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTaskRewardDetails();
  }, []);

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

          <div className="reward-card-group">
            <RewardCard
              bgcolor={'#62ffdb'}
              icon={profileFilled}
              progressRate={String(
                Math.round(
                  (Number(taskReward?.task1?.achieved) /
                    Number(taskReward?.task1?.target)) *
                    100
                )
              )}
              btn={'Invite'}
              task={'First Invitation'}
              reward={taskReward?.task1?.reward}
              desc="After inviting users to complete dowload registration and purchase points, they can recive"
            />
            <RewardCard
              bgcolor={'#ffc008'}
              icon={profileFilled}
              progressRate={String(
                Math.round(
                  (Number(taskReward?.task2?.achieved) /
                    Number(taskReward?.task2?.target)) *
                    100
                )
              )}
              btn={'Invite'}
              task="Invite Friend and Make Them 1st Recharge"
              reward={taskReward?.task2?.reward}
              desc="Invite your frined with your referral id and ask them to make their first recharge"
            />
            <RewardCard
              bgcolor={'#62ffdb'}
              icon={profileFilled}
              progressRate={String(
                Math.round(
                  (Number(taskReward?.task3?.achieved) /
                    Number(taskReward?.task3?.target)) *
                    100
                )
              )}
              btn={'Invite'}
              task="Make your first recharge"
              reward={taskReward?.task3?.reward}
              desc="Register and make your first recharge"
            />
            <RewardCard
              bgcolor={'#ffc008'}
              icon={profileFilled}
              progressRate={String(
                Math.round(
                  (Number(taskReward?.task4?.achieved) /
                    Number(taskReward?.task4?.target)) *
                    100
                )
              )}
              btn={'Invite'}
              task="Play more than 100 games"
              reward={taskReward?.task4?.reward}
              desc="Play any game for more than or equal to 100 times"
            />
            <RewardCard
              bgcolor={'#ffc008'}
              icon={profileFilled}
              progressRate={String(
                Math.round(
                  (Number(taskReward?.task5?.achieved) /
                    Number(taskReward?.task5?.target)) *
                    100
                )
              )}
              btn={'Invite'}
              task="Play more than 1,000 games"
              reward={taskReward?.task5?.reward}
              desc="Play any game for more than or equal to 1,000 times"
            />
            <RewardCard
              bgcolor={'#ffc008'}
              icon={profileFilled}
              progressRate={String(
                Math.round(
                  (Number(taskReward?.task6?.achieved) /
                    Number(taskReward?.task6?.target)) *
                    100
                )
              )}
              btn={'Invite'}
              task="Play more than 10,000 games"
              reward={taskReward?.task6?.reward}
              desc="Play any game for more than or equal to 10,000 times"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const RewardCard = ({
  progressRate,
  btn,
  bgcolor,
  icon,
  task,
  reward,
  desc,
}) => {
  return (
    <div className="reward-card">
      <div className="reward-card-desc">
        <div style={{ backgroundColor: bgcolor }} className="img">
          <img src={icon} alt="" />
        </div>

        <div>
          <h3>{task}</h3>
          <p>{desc}</p>
        </div>

        <h2>+{Number(reward).toFixed(1) || 0.0}</h2>
      </div>

      <Progressbar bgcolor="#69f0ae" progress={progressRate} />
      <div className="progress-percentage">
        <p>{progressRate}%</p>
        <p>100%</p>
      </div>

      <div>
        <button className="reward-btn">{btn}</button>
      </div>
    </div>
  );
};

export default Rewards;
