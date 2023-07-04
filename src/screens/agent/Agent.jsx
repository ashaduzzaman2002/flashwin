import React from 'react';
import './agent.css';
import { diamond } from '../../assets';

const Agent = () => {
  return (
    <div
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, #616161, #081723)',
      }}
    >
      <div className="agent-container container">
        <h2>-Agent-</h2>
        <h1>10 Million</h1>
        <h3>Cash growth plan</h3>

        <div className="agent-diamond">
          <img src={diamond} alt="" />
          <div />
        </div>

        <p className='agent-note'>
          The Flashwin Agent 10 Millions Cash Growth Plan is divided into 8
          levels, and each level has generous rewards. Complete the highest
          level and get a reward of <span>₹10,000,000</span> immediately.
        </p>

        <Level level={1} levelText = 'Iron' amount={5} color1={"#3f2723"} color2="#baa7a2" />
        <Level level={2} levelText = 'Bronze' amount={50} color1={"#1e75cd"} color2="#bbdffd" />
        <Level level={3} levelText = 'Silver' amount={300} color1={"#040203"} color2="#9e9d9c" />

        <div className='agent-card'>
          <p style={{fontSize: '1.3rem', fontWeight: '500', marginBottom: '0.7rem'}}><strong>Reward Conditions</strong></p>
          <p style={{marginBottom: '2rem'}}>Invite 5  effective users to recive.</p>

          <p style={{fontSize: '1.3rem', fontWeight: '500', marginBottom: '0.7rem'}}><strong>Upgade skills:</strong></p>

          <ol>
            <li>1. Expand the scope of sending promotional content, including adding more Facebook groups, Whatsapp groups, Instagram, Youtube comments, Telegram groups.</li>
            <li>2. Increase the frequency of sending content</li>
          </ol>
          <div>
          <button className="withdraw-btn" style={{marginTop: '2rem'}}>
            Receive Reward
          </button>
        </div>
        </div>
        <Level level={4} levelText = 'Gold' amount={'1,500'} color1={"#873900"} color2="#febf07" />
        <Level level={5} levelText = 'Platinum' amount={'4,000'} color1={"#1d247a"} color2="#c6cce8" />
        <Level level={6} levelText = 'Diamond' amount={'100,000'} color1={"#066659"} color2="#b2dfdd" />
        <Level level={7} levelText = 'Master' amount={'1,000,000'} color1={"#f36b04"} color2="#ffdcae" />

      </div>
    </div>
  );
};


const Level = ({level, levelText, amount, color1, color2}) => (
  <div className='level-card' style={{background: `linear-gradient(90deg, ${color1}, ${color2})`}}>
    <div>
      <p>Level {level}</p>
      <p>{levelText}</p>
    </div>

    <p style={{color: color1}}>+₹{amount}</p>
  </div>
)

export default Agent;
