import React, { useContext, useEffect, useState } from 'react';
import BottomNav from '../../components/bottomNav/BottomNav';
import './home.css';
import {
  Money,
  bomb,
  check,
  dice,
  fortuneWheel,
  reward,
  rocket,
  vault,
} from '../../assets';
import { useNavigate } from 'react-router-dom';
import { dbObject } from '../../helper/constant';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
  const naivgate = useNavigate();

  const { walletBalance } = useContext(AuthContext);

  return (
    <div
      style={{
        backgroundColor: '#08224e',
        minHeight: '100vh',
      }}
    >
      <div className="container" style={{ marginTop: '-2rem' }}>
        <BottomNav backgroundColor={'transparent'} />

        <div className="home-container">
          <div className="home-top">
            <div className="balance__section">
              <div className="balance__section__left">
                <div className="balance__section__text">My Balance</div>
                <div className="balance__value">
                  <span style={{ fontSize: 18 }}>₹</span>
                  {walletBalance}
                </div>
              </div>
              <div className="balance__section__right">
                <div className="balance__section__right__inner">
                  <button
                    onClick={() => naivgate('/recharge')}
                    className="balance__section__recharge__btn"
                  >
                    Recharge
                  </button>{' '}
                  <br />
                  <button
                    onClick={() => naivgate('/withdraw')}
                    className="balance__section__withdrawal__btn"
                    style={{ marginTop: 5 }}
                  >
                    Withdrawal
                  </button>
                </div>
              </div>
            </div>

            <div className="balance__section__bottom">
              <div
                onClick={() => naivgate('/rewards')}
                className="balance__section__bottom__cols"
              >
                <div className="balance__section__bottom__icon">
                  <img
                    src="data:image/png;base64,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"
                    height="100%"
                    alt=""
                  />
                </div>
                <div className="balance__section__bottom__cols__name">
                  Rewards
                </div>
              </div>
              <div
                onClick={() => naivgate('/check-in')}
                className="balance__section__bottom__cols"
              >
                <div className="balance__section__bottom__icon">
                  <img
                    src="data:image/png;base64,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"
                    height="100%"
                    alt=""
                  />
                </div>
                <div className="balance__section__bottom__cols__name">
                  Check In
                </div>
              </div>
            </div>


            <div class="homepage__game__screen">
              <div class="homepage__game__cols">
                <div class="homepage__game__cols__icon">
                <Card2
                url={'/game/minesweeper'}
                icon={bomb}
                text={'Minesweeper'}
                bgColor='#4ec6de'
              />
                </div>
              </div>

              <div class="homepage__game__cols">
                <div class="homepage__game__cols__icon">
                <Card2
                url={'/game/fortune-wheel'}
                icon={fortuneWheel}
                text={'Circle'}
                bgColor={'#f88387'}
              />
                </div>
              </div>

              <div class="homepage__game__cols">
                <div class="homepage__game__cols__icon">
                <Card2
                url={'/game/fast-parity'}
                icon={rocket}
                text={'Fast Parity'}
                bgColor={'#f18752'}
              />
                </div>
              </div>

              <div class="homepage__game__cols">
                <div class="homepage__game__cols__icon">
                <Card2 bgColor={'#40e48b'} url={'/game/full-parity'} icon={dice} text={'Parity'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card2 = ({ icon, text, url, bgColor }) => {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: bgColor }} onClick={() => navigate(url)}>
      <img src={icon} alt="game image" />
      <p>{text}</p>
    </div>
  );
};

export default Home;
