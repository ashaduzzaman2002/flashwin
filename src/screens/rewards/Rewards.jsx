import React, { useEffect, useState } from 'react';
import './Rewards.css';
import Progressbar from '../../components/ProgressBar';
import { profileFilled, receipt } from '../../assets';
import { dbObject } from '../../helper/constant';
import { useNavigate } from 'react-router-dom';

const Rewards = () => {
  const [taskReward, setTaskReward] = useState([]);
  const navigate = useNavigate()

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
    <div className="App">
      <div className="app__responsive" style={{background: "linear-gradient(rgb(27, 69, 65), rgb(37, 88, 79), rgb(27, 69, 65))"}}>
        <div className='container'>
        <div style={{ minHeight: '100vh' }}>
          <div
            className="checkIn__nav"
            style={{ height: 40 }}
          >
            <div className="checkIn__nav__col" style={{color: 'rgb(255, 255, 255)', fontWeight: '500'}}>
              <div onClick={() => navigate('/')} className="top__nav__back__btn">
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
            <div className="checkIn__nav__col" style={{color: 'rgb(255, 255, 255)', fontWeight: '500'}}>
              <center>Task</center>
            </div>
            <div className="checkIn__nav__col"></div>
          </div>
          <div className="task__screen">
            <div className="task__box">
              <div className="task__box__top">
                <div className="task__box__top__top">
                  <div className="task__box__top__top__left">
                    <div className="task__img">
                      <img
                        src="https://res.cloudinary.com/fiewin/image/upload/images/rechargeOrder.png"
                        height="100%"
                        alt=""
                      />
                    </div>
                    <div className="task__box__top__top__left__right__top">
                      <div className="task__title">First Recharge</div>
                      <div className="task__discription">
                        You can receive it after completing the first recharge
                      </div>
                    </div>
                  </div>
                  <div className="task__prize">₹5</div>
                </div>
                <div className="task__meter">
                  <div className="task__parameter" style={{ width: '100%' }}></div>
                </div>
                <div className="task__meter__bottom">
                  <div className="task__meter__bottom__left">0%</div>
                  <div className="task__meter__bottom__right">100%</div>
                </div>
                <button
                  className="task__button"
                  style={{
                    background: 'rgb(204, 204, 204)',
                    color: ' rgb(102, 102, 102)',
                    border: '2px solid rgb(204, 204, 204)',
                  }}
                >
                  Claimed
                </button>
              </div>
              <div className="task__box__bottom"></div>
            </div>
            <div className="task__box">
              <div className="task__box__top">
                <div className="task__box__top__top">
                  <div className="task__box__top__top__left">
                    <div className="task__img">
                      <img
                        src="https://res.cloudinary.com/fiewin/image/upload/images/Effective.png"
                        height="100%"
                        alt=""
                      />
                    </div>
                    <div className="task__box__top__top__left__right__top">
                      <div className="task__title">First Invitation</div>
                      <div className="task__discription">
                        After inviting users to complete download registration
                        and purchase points, they can receive
                      </div>
                    </div>
                  </div>
                  <div className="task__prize">₹5</div>
                </div>
                <div className="task__meter">
                  <div className="task__parameter" style={{ width: '100%' }}></div>
                </div>
                <div className="task__meter__bottom">
                  <div className="task__meter__bottom__left">0%</div>
                  <div className="task__meter__bottom__right">100%</div>
                </div>
                <button
                  className="task__button"
                  style={{
                    background: 'rgb(204, 204, 204)',
                    color: 'rgb(102, 102, 102)',
                    border: '2px solid rgb(204, 204, 204)',
                  }}
                >
                  Claimed
                </button>
              </div>
              <div className="task__box__bottom"></div>
            </div>
            <div className="task__box">
              <div className="task__box__top">
                <div className="task__box__top__top">
                  <div className="task__box__top__top__left">
                    <div className="task__img">
                      <img
                        src="https://res.cloudinary.com/fiewin/image/upload/images/task100orders.png"
                        height="100%"
                        alt=""
                      />
                    </div>
                    <div className="task__box__top__top__left__right__top">
                      <div className="task__title">More than 100 orders</div>
                      <div className="task__discription">
                        All game orders, more than 100 times
                      </div>
                    </div>
                  </div>
                  <div className="task__prize">₹20</div>
                </div>
                <div className="task__meter">
                  <div className="task__parameter" style={{ width: '21%' }}></div>
                </div>
                <div className="task__meter__bottom">
                  <div className="task__meter__bottom__left">0%</div>
                  <div className="task__meter__bottom__right">100%</div>
                </div>
                <button className="task__button">Go order</button>
              </div>
              <div className="task__box__bottom"></div>
            </div>
            <div className="task__box">
              <div className="task__box__top">
                <div className="task__box__top__top">
                  <div className="task__box__top__top__left">
                    <div className="task__img">
                      <img
                        src="https://res.cloudinary.com/fiewin/image/upload/images/task1000orders.png"
                        height="100%"
                        alt=""
                      />
                    </div>
                    <div className="task__box__top__top__left__right__top">
                      <div className="task__title">More than 1000 orders</div>
                      <div className="task__discription">
                        All game orders, more than 1000 times
                      </div>
                    </div>
                  </div>
                  <div className="task__prize">₹100</div>
                </div>
                <div className="task__meter">
                  <div className="task__parameter" style={{ width: '2.1%' }}></div>
                </div>
                <div className="task__meter__bottom">
                  <div className="task__meter__bottom__left">0%</div>
                  <div className="task__meter__bottom__right">100%</div>
                </div>
                <button className="task__button">Go order</button>
              </div>
              <div className="task__box__bottom"></div>
            </div>
            <div className="task__box">
              <div className="task__box__top">
                <div className="task__box__top__top">
                  <div className="task__box__top__top__left">
                    <div className="task__img">
                      <img
                        src="https://res.cloudinary.com/fiewin/image/upload/images/task10000orders.png"
                        height="100%"
                        alt=""
                      />
                    </div>
                    <div className="task__box__top__top__left__right__top">
                      <div className="task__title">More than 10000 orders</div>
                      <div className="task__discription">
                        All game orders, more than 10000 times
                      </div>
                    </div>
                  </div>
                  <div className="task__prize">₹1000</div>
                </div>
                <div className="task__meter">
                  <div className="task__parameter" style={{ width: '0.21%' }}></div>
                </div>
                <div className="task__meter__bottom">
                  <div className="task__meter__bottom__left">0%</div>
                  <div className="task__meter__bottom__right">100%</div>
                </div>
                <button className="task__button">Go order</button>
              </div>
              <div className="task__box__bottom"></div>
            </div>
          </div>
          <div className="toastContainer top-center"></div>
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
