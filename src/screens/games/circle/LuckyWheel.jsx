import React, { useEffect, useState } from 'react';
// import SpinWheel from '../components/SpinWheel'
import './LuckyWheel.css';
import { Cow, ElephantIcon, Wheel, roulette, tiger } from '../../../assets';
import { database } from '../../../firebase.config';
import { onValue, ref } from 'firebase/database';
import { dbObject } from '../../../helper/constant';
import Start from '../../../components/start/Start';
import Toaster, { toastOptions } from '../../../components/Toster/Toaster';
import { toast } from 'react-toastify';
import Result from '../../../components/result/Result';

const LuckyWheel = () => {
  const [activeNumbers, setActiveNumbers] = useState('1-10');
  const [timer, setTimer] = useState(0);
  const [degree, setDegree] = useState(0);
  const [gameId, setGameId] = useState([]);
  const [number, setNumber] = useState(null);
  const [color, setColor] = useState(null);
  const [animal, setAnimal] = useState(null);
  const [startCart, setStartCart] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const generateNumbers = (start) => {
    const numberArray = Array.from({ length: 10 }, (_, index) => index + start);
    return numberArray;
  };

  const [activeBtn2, setActiveBtn2] = useState('OtherPlayers');

  const fortuneWheelItems = [
    { number: 31, color: 'blue', animal: 'lion' },
    { number: 1, color: 'orange', animal: 'lion' },
    { number: 19, color: 'blue', animal: 'lion' },
    { number: 7, color: 'orange', animal: 'lion' },
    { number: 22, color: 'blue', animal: 'lion' },
    { number: 0, color: 'red', animal: 'lion' },
    { number: 6, color: 'blue', animal: 'lion' },
    { number: 25, color: 'orange', animal: 'lion' },
    { number: 17, color: 'blue', animal: 'lion' },
    { number: 21, color: 'orange', animal: 'cow' },
    { number: 10, color: 'blue', animal: 'cow' },
    { number: 23, color: 'orange', animal: 'cow' },
    { number: 4, color: 'blue', animal: 'cow' },
    { number: 26, color: 'orange', animal: 'cow' },
    { number: 9, color: 'blue', animal: 'cow' },
    { number: 30, color: 'orange', animal: 'cow' },
    { number: 13, color: 'blue', animal: 'cow' },
    { number: 33, color: 'orange', animal: 'cow' },
    { number: 8, color: 'blue', animal: 'cow' },
    { number: 27, color: 'orange', animal: 'cow' },
    { number: 12, color: 'blue', animal: 'cow' },
    { number: 36, color: 'orange', animal: 'elephant' },
    { number: 15, color: 'blue', animal: 'elephant' },
    { number: 28, color: 'orange', animal: 'elephant' },
    { number: 0, color: 'red', animal: 'elephant' },
    { number: 14, color: 'orange', animal: 'elephant' },
    { number: 34, color: 'blue', animal: 'elephant' },
    { number: 3, color: 'orange', animal: 'elephant' },
    { number: 35, color: 'blue', animal: 'elephant' },
    { number: 5, color: 'orange', animal: 'elephant' },
    { number: 32, color: 'blue', animal: 'elephant' },
    { number: 16, color: 'orange', animal: 'elephant' },
    { number: 20, color: 'blue', animal: 'elephant' },
    { number: 2, color: 'orange', animal: 'trophy' },
    { number: 29, color: 'blue', animal: 'trophy' },
    { number: 18, color: 'orange', animal: 'lion' },
    { number: 24, color: 'blue', animal: 'lion' },
    { number: 11, color: 'orange', animal: 'lion' },
  ];

  useEffect(() => {
    const circleRef = ref(database, 'circle/timer');

    onValue(circleRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data)[0];
        setGameId(key);
        const { time } = data[key];
        setTimer(time);
      }
    });
  }, []);

  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (timer <= 10 && timer > 0 && isPlay) {
      const id = setInterval(() => {
        setDegree(Math.floor(Math.random() * 361));
      }, 50);

      return () => {
        clearInterval(id);
      };
    }

    if (timer > 10) {
      setDegree(0);
    }
  }, [timer]);


  const handleStart = (data) => {
    setColor(data.color);
    setAnimal(data.animal);
    setNumber(data.number);
    setStartCart(true);
  };

  const startGame = async (amount) => {
    setStartCart(false);

    const values = {
      animal,
      color,
      number,
      amount: String(amount),
    };
    try {
      const { data } = await dbObject.post('/circle/play', values);
      setIsPlay(true);
      setGameId(data?.game_id);
      
      toast.success(data?.message, toastOptions);
    } catch (error) {
      toast.success('Internal Server error', toastOptions);
    }
  };

  const gameResult = async () => {
    try {
      if (timer <= 0 && isPlay && gameId) {
        const { data } = await dbObject.post('/circle/result', {
          game_id: gameId,
        });
        setIsPlay(false);
        setGameId(null);
        setResult(data)
        if (data?.winner) {
          const index = fortuneWheelItems.findIndex(
            (item) => item.number === Number(data?.winner?.winner_number)
          );
          clearInterval(intervalId);
          setDegree(index * 9.4);
          setShowResult(true)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gameResult();
  }, [timer]);

  const gameHistory = async () => {
    try {
      const { data } = await dbObject.get('/circle/history');
      const sortedData = data?.result?.reverse();
      setHistory(sortedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gameHistory();
  }, []);

  return (
    <div
      className="container"
      style={{
        width: '100%',
        height: showResult? '100vh': 'auto',
        background: 'linear-gradient(180deg, #47072a, #071724)',
        overflow: 'hidden'
      }}
    >
      <Toaster />
      {startCart && (
        <Start
          setStartCart={setStartCart}
          name={`Circle - ${color || animal || number}`}
          startGame={startGame}
        />
      )}

      {
        showResult && (
          <Result result={result} setShowResult={setShowResult} />
        )
      }

      {/* <button onClick={stopInterval}>stop</button> */}
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
            <p>{timer}</p>
          </div>
        </div>

        <div className="wheel-container">
          <img
            style={{
              transform: `rotate(${degree}deg)`,
            }}
            src={Wheel}
            alt=""
          />

          <button
            style={{ cursor: 'default' }}
            className="spin-btn"
            type="button"
          >
            <img src={roulette} alt="" />
          </button>
        </div>

        <div className="luckyWehel-btn-group">
          <Button
            handleStart={handleStart}
            bgColor="#d32f2e"
            colorName="Red"
            ratio="1:2"
            timer={timer}
          />
          <Button
            handleStart={handleStart}
            bgColor="#1976d3"
            colorName="Blue"
            ratio="1:18"
            timer={timer}
          />
          <Button
            handleStart={handleStart}
            bgColor="#ff9f00"
            colorName="Orange"
            ratio="1:2"
            timer={timer}
          />
        </div>

        <div className="sticker-group">
          <Sticker
            handleStart={handleStart}
            name={'Cow'}
            icon={Cow}
            ratio={'1:2'}
            timer={timer}
          />
          <Sticker
            handleStart={handleStart}
            name={'Tiger'}
            icon={tiger}
            ratio={'1:18'}
            timer={timer}
          />
          <Sticker
            handleStart={handleStart}
            name={'Elephant'}
            icon={ElephantIcon}
            ratio={'1:2'}
            timer={timer}
          />
          <Sticker
            handleStart={handleStart}
            name={'Cow'}
            icon={Cow}
            ratio={'1:2'}
            timer={timer}
          />
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
            onClick={() => setActiveNumbers('1-10')}
            className={`${activeNumbers === '1-10' ? 'activeNumber' : ''}`}
          >
            1-10
          </p>
          <p
            onClick={() => setActiveNumbers('11-20')}
            className={`${activeNumbers === '11-20' ? 'activeNumber' : ''}`}
          >
            11-20
          </p>
          <p
            onClick={() => setActiveNumbers('21-30')}
            className={`${activeNumbers === '21-30' ? 'activeNumber' : ''}`}
          >
            21-30
          </p>
          <p
            onClick={() => setActiveNumbers('31-36,000')}
            className={`${activeNumbers === '31-36,000' ? 'activeNumber' : ''}`}
          >
            31-36,000
          </p>
        </div>

        {activeNumbers === '31-36,000' ? (
          ''
        ) : (
          <div className="num-group">
            {generateNumbers(
              activeNumbers === '1-10'
                ? 1
                : activeNumbers === '11-20'
                ? 11
                : activeNumbers === '21-30'
                ? 21
                : ''
            ).map((num) => (
              <button
                onClick={() =>
                  handleStart({
                    color: '',
                    animal: '',
                    number: String(num),
                  })
                }
                key={num}
                style={{ padding: '0.3rem 0' }}
                disabled={timer <= 10 ? true : false}
              >
                <p>{num}</p>
              </button>
            ))}
          </div>
        )}

        <div>
          <p
            style={{
              textAlign: 'center',
              marginTop: 5,
              color: '#ebe7f5',
              fontSize: 15,
            }}
          >
            1:36
          </p>
        </div>

        <div className="gameDetails-btn-group">
          <button
            onClick={() => setActiveBtn2('OtherPlayers')}
            className={`${
              activeBtn2 === 'OtherPlayers' ? 'gameDetails-activeBtn' : ''
            }`}
          >
            Other Players
          </button>

          <button
            onClick={() => setActiveBtn2('MyOrder')}
            className={`${
              activeBtn2 === 'MyOrder' ? 'gameDetails-activeBtn' : ''
            }`}
          >
            My Orders
          </button>
        </div>

        {activeBtn2 === 'OtherPlayers' ? (
          <div className="gameDetails-others">
            <div>
              <p>Period</p>
              <small>18:54</small>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p>User</p>
              <small>****18787</small>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p>Select</p>
              <small>2x2</small>
            </div>

            <div style={{ textAlign: 'right' }}>
              <p>Point</p>
              <small>₹ 90</small>
            </div>
          </div>
        ) : (
          <div>
            <table style={{ width: '100%', marginTop: '1rem' }}>
              <thead>
                <tr className="parity-myorder-header parity-myorder">
                  <td>Period</td>
                  <td>Select</td>
                  <td>Point</td>
                  <td>Result</td>
                  <td>Amount</td>
                </tr>
              </thead>

              <tbody>
                {history?.map((item, i) => {
                  const currentDate = new Date(item.date);
                  const hours = currentDate.getHours();
                  const minutes = currentDate.getMinutes();

                  return (
                    <tr key={i} className="parity-myorder">
                      <td>{`${hours}:${minutes}`}</td>
                      <td
                        className="parity-selected"
                        style={{
                          backgroundColor: item?.user_color,
                          padding: '0.3rem',
                          borderRadius: '0.5rem',
                        }}
                      >
                        {!item.user_color && !item.user_animal ? (
                          <p style={{ padding: '0.2rem' }}>
                            {item.user_number}
                          </p>
                        ) : item.user_color && !item.user_animal ? (
                          <p
                            style={{
                              background: 'none',
                              color: '#fff',
                              textTransform: 'capitalize',
                            }}
                          >
                            {item.user_color}
                          </p>
                        ) : !item.user_color && item.user_animal ? (
                          <img
                            width={'50%'}
                            src={
                              item.user_animal === 'lion'
                                ? tiger
                                : item.user_animal === 'elephant'
                                ? ElephantIcon
                                : Cow
                            }
                          />
                        ) : null}
                      </td>
                      <td>₹10</td>
                      <td
                        className="parity-selected parity-result"
                        style={{
                          backgroundColor: item?.winner_color,
                          padding: '0.3rem',
                          borderRadius: '0.5rem',
                        }}
                      >
                        <p style={{ background: 'none' }}>
                          {item?.winner_number}
                        </p>
                      </td>
                      <td>₹{Number(item.amount).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const Button = ({ bgColor, colorName, ratio, handleStart, timer }) => (
  <div className="luckyWehel-btn">
    <button
      onClick={() => handleStart({ color: colorName, animal: '', number: '' })}
      disabled={timer <= 10 ? true : false}
      style={{ background: bgColor }}
    >
      {colorName}
    </button>
    <p>{ratio}</p>
  </div>
);

const Sticker = ({ icon, ratio, handleStart, name, timer }) => (
  <div className="sticker">
    <button
      onClick={() =>
        handleStart({
          color: '',
          animal: name,
          number: '',
        })
      }
      disabled={timer <= 10 ? true : false}
    >
      <img src={icon} alt="" />
    </button>

    <p>{ratio}</p>
  </div>
);

export default LuckyWheel;
