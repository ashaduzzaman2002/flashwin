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
      // console.log(data.task1);
      // if (!data.error) {
      //   taskRewardList.task1 = data.task1;
      //   taskRewardList.task2 = data.task2;
      //   taskRewardList.task3 = data.task3;
      //   taskRewardList.task4 = data.task4;
      //   taskRewardList.task5 = data.task5;
      //   taskRewardList.task6 = data.task6;
      // }

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
              task={taskReward?.task1?.task}
              reward={taskReward?.task1?.reward}
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
              task={taskReward?.task2?.task}
              reward={taskReward?.task2?.reward}
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
              task={taskReward?.task3?.task}
              reward={taskReward?.task3?.reward}
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
              task={taskReward?.task4?.task}
              reward={taskReward?.task4?.reward}
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
              task={taskReward?.task5?.task}
              reward={taskReward?.task5?.reward}
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
              task={taskReward?.task6?.task}
              reward={taskReward?.task6?.reward}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const RewardCard = ({ progressRate, btn, bgcolor, icon, task, reward }) => {
  return (
    <div className="reward-card">
      <div className="reward-card-desc">
        <div style={{ backgroundColor: bgcolor }} className="img">
          <img  src={icon} alt="" />
        </div>

        <div>
          <h3>{task}</h3>
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
