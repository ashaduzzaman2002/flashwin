import React, { useEffect, useState } from 'react';
import './privilege.css';
import { bar1, bar2, bar3, privilege } from '../../assets';
import { dbObject } from '../../helper/constant';

const Privilege = () => {
  const [people, setPeople] = useState(1);
  const [people2, setPeople2] = useState(1);
  const [day, setDay] = useState(1);
  const [commisssion, setCommission] = useState(62);
  const [incomeEstimate, setCIcomeEstimate] = useState(50);
  const [levels, setLevels] = useState({});

  const handleCommission = () => {
    setCommission(62 * people * day);
  };

  const handleIcome = () => {
    setCIcomeEstimate(50 * people2);
  };

  const commisionCalculator = async () => {
    try {
      const { data } = await dbObject.get('/commision/calculator');
      setLevels(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Replace the existing handleCommission calls with the following:
  useEffect(() => {
    handleCommission();
    handleIcome()
    commisionCalculator();
  }, [people, day, people2]);

  const winnerAmounts = [
    '+₹4011',
    '+₹3511',
    '+₹3011',
    '+₹2511',
    '+₹2011',
    '+₹1711',
    '+₹1511',
    '+₹1411',
    '+₹1311',
    '+₹1211',
    '+₹1111',
    '+₹1011',
    '+₹911',
    '+₹811',
    '+₹711',
    '+₹611',
    '+₹511',
  ];

  return (
    <div className="container">
      <div className="privilege-container">
        <div className="privilege-header">
          <h1>FlashWin</h1>
          <h3>Agency Privilege</h3>
        </div>

        <div className="privilege_img">
          <img src={privilege} alt="" />
          <div />
        </div>

        <div className="longest-btn-outer">
          <button className="longest-btn">The longest</button>
        </div>

        <p className="privilege_note">
          3 level invitees, each user will generate commission
        </p>

        <div className="privilege-card">
          <div className="privilege-level">
            <div>
              <button>Level 1</button>
              <p>40.0%</p>
            </div>

            <div>
              <button>Level 2</button>
              <p>20.0%</p>
            </div>

            <div>
              <button>Level 3</button>
              <p>10.0%</p>
            </div>
          </div>

          <p className="note">
            If each person can ivite 10 people, and each invitee only needs to
            place an order of ₹100 per day, the:
          </p>

          <h3
            style={{
              textAlign: 'center',
              fontWeight: '500',
              fontSize: '1.2rem',
              marginBlock: '0.5rem',
            }}
          >
            Commission Estimate
          </h3>
          <div className="privilege-slider">
            <p>People({people})</p>
            <input
              min="1"
              max="100"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="progress-slider"
              type="range"
            />
          </div>

          <div className="privilege-slider">
            <p>Days({day})</p>
            <input
              min="1"
              max="100"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="progress-slider"
              type="range"
            />
          </div>

          <h3
            style={{
              textAlign: 'center',
              fontWeight: '500',
              fontSize: '1.2rem',
              marginBlock: '1rem',
            }}
          >
            Commission <span style={{color: "#71d9ab"}}>₹{commisssion}</span>
          </h3>
        </div>

        <div
          className="longest-btn-outer"
          style={{ marginTop: '1.5rem', marginBottom: '0.4rem' }}
        >
          <button
            className="longest-btn"
            style={{ background: 'linear-gradient(90deg, #63bc65, #356b20) ' }}
          >
            The most effective
          </button>
        </div>

        <h3
          style={{
            textAlign: 'center',
            fontWeight: '500',
            fontSize: '1.2rem',
            marginBottom: '-1.5rem',
          }}
        >
          Everytime you invite a valid user, get ₹50 ad reward
        </h3>

        <div
          className="privilege-card"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <p className="note">
            If the recharge amount is greater than 100, it is a effective user
          </p>

          <i className="fa-solid fa-user"></i>

          <button
            style={{
              border: 'none',
              backgroundColor: '#ffdcac',
              fontWeight: '500',
              padding: '0.5rem 1.5rem',
              marginTop: '1rem',
              borderRadius: '2rem',
            }}
          >
            Recharge over 100
          </button>

          <h3
          style={{
            textAlign: 'center',
            fontWeight: '500',
            fontSize: '1.2rem',
            marginBottom: '-1.5rem',
          }}
        >
          Income Estimate
        </h3>

        <div className="privilege-slider" style={{width: '100%'}}>
            <p>People({people2})</p>
            <input
              min="1"
              max="100"
              value={people2}
              onChange={(e) => setPeople2(e.target.value)}
              className="progress-slider"
              style={{width: '100%'}}
              type="range"
            />
          </div>
          
        <h3
            style={{
              textAlign: 'center',
              fontWeight: '500',
              fontSize: '1.2rem',
              marginBlock: '1rem',
            }}
          >
            Reward: <span style={{color: "#71d9ab"}}>₹{incomeEstimate}</span>
          </h3>
        </div>


        <div
          className="longest-btn-outer"
          style={{ marginTop: '1.5rem', marginBottom: '0.4rem' }}
        >
          <button
            className="longest-btn"
            style={{ background: 'linear-gradient(90deg,#ffc007,#fd6c00) ' }}
          >
            The highest amount
          </button>
        </div>

        <h3
          style={{
            textAlign: 'center',
            fontWeight: '500',
            fontSize: '1.2rem',
            marginBottom: '-1.5rem',
          }}
        >
          The top 20 daily order commissions can get high rewards
        </h3>

        <div className="privilege-card" style={{ padding: '1rem 2rem' }}>
          <div className="bar-cart">
            <div>
              <p>+₹7011</p>
              <img width={55} height={65} src={bar2} alt="" />
            </div>

            <div>
              <p>+₹10011</p>
              <img width={50} height={80} src={bar1} alt="" />
            </div>

            <div>
              <p>+₹5011</p>
              <img width={45} height={50} src={bar3} alt="" />
            </div>
          </div>

          <div className="winnerAmounts">
            {winnerAmounts?.map((item, i) => (
              <div>
                <p
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: '#a2f3c6',
                    color: '#210b32',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%',
                  }}
                >
                  {i + 4}
                </p>
                <p style={{ fontWeight: '500' }}>{item}</p>
              </div>
            ))}
          </div>

          <p className="note" style={{ marginBottom: '0.4rem' }}>
            FlashWin has distributed rewards:
          </p>
          <h3
            style={{
              textAlign: 'center',
              fontWeight: '500',
              fontSize: '1rem',
            }}
          >
            ₹17,678, 213
          </h3>
        </div>

        <div
          className="longest-btn-outer"
          style={{ marginTop: '1.5rem', marginBottom: '0.4rem' }}
        >
          <button
            className="longest-btn"
            style={{ background: 'linear-gradient(90deg, #ed1c64, #b01158) ' }}
          >
            The easiest
          </button>
        </div>
        <h3
          style={{
            textAlign: 'center',
            fontWeight: '500',
            fontSize: '1.2rem',
            marginBottom: '-1.5rem',
          }}
        >
          What is an Awakener?
        </h3>

        <div className="privilege-card easiest">
          <i className="fa-solid fa-user"></i>
          <p className="plus">+</p>
          <p>
            <span style={{ fontSize: '2rem', fontWeight: '600' }}>1</span>rupee
          </p>
        </div>

        <div
          className="longest-btn-outer"
          style={{ marginTop: '1.5rem', marginBottom: '-1rem' }}
        >
          <button
            className="longest-btn"
            style={{ background: 'linear-gradient(90deg, #019183, #006d5e) ' }}
          >
            Awakener
          </button>
        </div>

        <div className="privilege-card">
          <h3
            style={{
              textAlign: 'center',
              fontWeight: '500',
              fontSize: '1.2rem',
              marginBlock: '0.5rem',
            }}
          >
            What is an Awakener?
          </h3>

          <p style={{ color: '#eceaea' }}>
            As long as the user who does not visited FlashWin for 30 days,
            revisit through your link, he will become your invitee, this is
            called "Awakened".
          </p>
          <h3
            style={{
              textAlign: 'center',
              fontWeight: '500',
              fontSize: '1.2rem',
              marginBlock: '0.5rem',
            }}
          >
            How does the awakener affect me?
          </h3>
          <p style={{ color: '#eceaea' }}>
            Stay actuve and promote FlashWin for a long time, and you will keep
            getting invitees and more revenue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privilege;
