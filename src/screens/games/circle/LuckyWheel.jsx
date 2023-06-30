import React from 'react';
// import SpinWheel from '../components/SpinWheel'
import './LuckyWheel.css';
import { Cow, ElephantIcon, Wheel, roulette, tiger } from '../../../assets';
import GameDetails from '../../../components/gameDetails/GameDetails';
import WheelComponent from '../../../components/WheelComponent';

const LuckyWheel = () => {
  const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div
      className="container"
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #47072a, #071724)',
      }}
    >
      <div className="lucky-wheel-container">
        <h2>Cirlce</h2>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '1rem',
          }}
        >
          <p>Game ends in</p>
          <div
            style={{
              height: 40,
              width: 40,
              background: 'rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              borderRadius: 10,
            }}
          >
            <p>0</p>
          </div>
        </div>

        {/* <div className="wheel-container">
          <img src={Wheel} alt="" />

          <button className="spin-btn" type="button">
            <img src={roulette} alt="" />
          </button>
        </div> */}

<div className="wheel-container">
        <WheelComponent segments={['Segment 1', 'Segment 2', 'Segment 3', 'Segment 4', 'Segment 5', 'Segment 6', 'Segment 7', 'Segment 8', 'Segment 9', 'Segment 10']} // Replace with your own segments array
              segColors={['#f6aa32', '#ec463f', '#f6aa32', '#ec463f', '#f0cf50', '#815cd1', '#f0cf50', '#815cd1', '#3da5e0', '#4ca350']} // Replace with your own segColors array
              winningSegment="Segment 4"
              onFinished={(segment) =>
                console.log('Finished spinning:', segment)
              }
              primaryColor="black"
              contrastColor="white"
              buttonText="Spin"
              isOnlyOnce={true}
              size={160}
              upDuration={100}
              downDuration={1000}
              fontFamily="proxima-nova"
              />
              </div>

        <div className="luckyWehel-btn-group">
          <Button bgColor="#d32f2e" colorName="Red" ratio="1:2" />
          <Button bgColor="#1976d3" colorName="Blue" ratio="1:18" />
          <Button bgColor="#ff9f00" colorName="Orange" ratio="1:2" />
        </div>

        <div className="sticker-group">
          <Sticker icon={Cow} ratio={'1:2'} />
          <Sticker icon={tiger} ratio={'1:18'} />
          <Sticker icon={ElephantIcon} ratio={'1:2'} />
          <Sticker icon={Cow} ratio={'1:2'} />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
            fontSize: '1.1rem',
            color: '#9d9fac',
          }}
        >
          <p
            style={{
              background: '#465a65',
              color: '#fff',
              padding: '0.4rem 1.5rem',
              borderRadius: 20,
            }}
          >
            1-10
          </p>
          <p>11-20</p>
          <p>21-30</p>
          <p>31-36,000</p>
        </div>

        <div className='num-group'>
          {numList.map((num) => (
            <div key={num}>
              <p>{num}</p>
            </div>
          ))}
        </div>

        <div>
          <p style={{textAlign: 'center', marginTop: 5, color: '#ebe7f5', fontSize: 15}}>1:36</p>
        </div>

        <GameDetails />
      </div>
    </div>
  );
};

const Button = ({ bgColor, colorName, ratio }) => (
  <div className="luckyWehel-btn">
    <button style={{ background: bgColor }}>{colorName}</button>
    <p>{ratio}</p>
  </div>
);

const Sticker = ({ icon, ratio }) => (
  <div className="sticker">
    <div>
      <img src={icon} alt="" />
    </div>

    <p>{ratio}</p>
  </div>
);

export default LuckyWheel;
