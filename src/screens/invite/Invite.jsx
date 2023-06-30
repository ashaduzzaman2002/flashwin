import React from 'react';
import BottomNav from '../../components/bottomNav/BottomNav';
import './invite.css';
import { useNavigate } from 'react-router-dom';

const Invite = () => {
  const navigate = useNavigate()
  return (
    <div className="container">
      <BottomNav />

      <div className="invite-content">
        <h1>Invite</h1>

        <div className="invite-amount-out">
          <div className="invite-amount">
            <p>Invite Amount</p>
            <h2>₹ 0</h2>
          </div>

          <button onClick={() => navigate('/withdraw')} type="button">
            <i className="fa-sharp fa-solid fa-circle-down"></i> Withdraw
          </button>
        </div>

        <div className="invite-card1-group">
          <Card1
            bgColor={'linear-gradient(to bottom right, #ffbf0c, #fba638)'}
            color={'#040100'}
            icon={'fa-regular fa-star'}
            title={'Privilege'}
          />

          <Card1
            bgColor={'linear-gradient(to bottom right, #5ef6d2, #6caea5)'}
            color={'#000503'}
            icon={'fa-solid fa-ranking-star'}
            title={'Ranking'}
          />

          <Card1
            bgColor={'linear-gradient(to bottom right, #ffb909, #fe402d)'}
            color={'#fcffff'}
            icon={'fa-solid fa-link'}
            title={'My Link'}
          />
        </div>

        <div className="income-history">
          <div className="income-history-card-group">
            <Card2 title={'Invited Today'} amount={0} />
            
            <Card2 title={"Today's Income"} amount={0} />
          </div>
          <h3>Income History</h3>
        </div>

        <button className="invite-button" type="button">
          <i className="fa-solid fa-people-line"></i> Invite
        </button>
      </div>
    </div>
  );
};

const Card1 = ({ icon, title, bgColor, color }) => {
  return (
    <div
      className="invite-card1"
      style={{
        background: bgColor,
        color: color,
      }}
    >
      <i className={icon}></i>
      <p>{title}</p>
    </div>
  );
};

const Card2 = ({ title, amount }) => (
  <div className="income-history-card">
    <p>
      {title} <i className="fa-solid fa-chevron-right"></i>
    </p>
    <h2>Rs. {amount}</h2>
  </div>
);

export default Invite;
