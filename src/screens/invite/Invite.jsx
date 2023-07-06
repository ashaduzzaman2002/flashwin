import React, { useContext, useEffect, useState } from 'react';
import BottomNav from '../../components/bottomNav/BottomNav';
import './invite.css';
import { Link, useNavigate } from 'react-router-dom';
import { dbObject } from '../../helper/constant';
import { diamond, treasure } from '../../assets';
import CommissionCard from '../../components/commission/CommissionCard';
import { AuthContext } from '../../context/AuthContext';

const Invite = () => {
  const navigate = useNavigate();
  const { commissionHistory } = useContext(AuthContext);

  const [commissionWalletBalance, setCommissionWalletBalance] = useState('0.0');
  const [totalReferralCount, setTotalReferralCount] = useState('0');
  const [totalReferralEarning, setTotalReferralEarning] = useState('0');
  const [todayReferralCount, setTodayReferralCount] = useState('0');
  const [todayReferralEarning, setTodayReferralEarning] = useState('0');

  const fetchCommissionWallet = async () => {
    try {
      const { data } = await dbObject.get('/commision/wallet');
      if (!data.error) {
        setCommissionWalletBalance(data.data[0].balance);
      } else {
        console.log('Issue from Server Side');
      }
    } catch (error) {
      console.log(error);
    }
  };



  const fetchReferCounts = async () => {
    try {
      const { data } = await dbObject.get('/wallet/refer_history');
      if (!data.error) {
        console.log(data);
        setTotalReferralCount(data.data.total_refer);
        setTotalReferralEarning(data.data.total_earning);
        setTodayReferralCount(data.today.total);
        setTodayReferralEarning(data.today.amount);
      } else {
        console.log('Issue from Server Side');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCommissionWallet();
    fetchReferCounts();
  }, []);

  return (
    <div className="container" style={{ paddingBottom: '0rem' }}>
      <BottomNav />

      <div className="invite-content">
        <h1>Invite</h1>

        <div className="invite-amount-out">
          <div className="invite-amount">
            <p>Invite Amount</p>
            <h2>₹ {commissionWalletBalance}</h2>
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
            url={'/privilege'}
          />

          <Card1
            bgColor={'linear-gradient(to bottom right, #5ef6d2, #6caea5)'}
            color={'#000503'}
            icon={'fa-solid fa-ranking-star'}
            title={'Ranking'}
            url={'/ranking'}
          />

        </div>

        <Link to={'/agent'} className="agent-contrainer">
          <div>
            <h2>Agent 10 million</h2>
            <p>cash growth plan</p>
          </div>

          <div className="invite-diamond">
            <img src={diamond} alt="" />
            <div />
          </div>
        </Link>

        <div className="income-history">
          <div className="income-history-card-group">
            <Card2 title={'Invited Today'} amount={totalReferralCount} />

            <Card2
              title={"Today's Income"}
              amount={'₹ ' + totalReferralEarning}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1rem',
            }}
          >
            <h3>Income History</h3>
            <Link
              style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: '#3191dc',
                cursor: 'default',
              }}
              to={'/commission-history'}
            >
              See all
            </Link>
          </div>
        </div>

        <div className="commission-container" style={{marginBottom: '9rem'}}>
          {commissionHistory?.map((item) => (
            <CommissionCard key={item.id} data={item} />
          ))}
        </div>

        <button className="invite-button" type="button">
          <i className="fa-solid fa-people-line"></i> Invite
        </button>
      </div>
    </div>
  );
};

const Card1 = ({ icon, title, bgColor, color, url }) => {
  return (
    <Link
      to={url}
      className="invite-card1"
      style={{
        background: bgColor,
        color: color,
        cursor: 'default',
      }}
    >
      <i className={icon}></i>
      <p>{title}</p>
    </Link>
  );
};

const Card2 = ({ title, amount }) => (
  <div className="income-history-card">
    <p>
      {title} <i className="fa-solid fa-chevron-right"></i>
    </p>
    <h2>{amount}</h2>
  </div>
);

export default Invite;
