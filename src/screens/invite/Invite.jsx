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

        <div className="invite-amount-out" style={{marginBottom: '1rem'}}>
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
            bgColor={'linear-gradient(90deg, #ef5731, #f28e58)'}
            color={'#fff'}
            icon={'fa-regular fa-star'}
            title={'Privilege'}
            url={'/privilege'}
          />

          <Card1
            bgColor={'linear-gradient(90deg, #6caea5, #83f9dd)'}
            color={'#000503'}
            icon={'fa-solid fa-ranking-star'}
            title={'Ranking'}
            url={'/ranking'}
          />
        </div>

        <Link to={'/agent'} className="agent-contrainer" style={{marginBottom: '1rem'}}>
          <div>
            <h2>Agent 10 million</h2>
            <p>cash growth plan</p>
          </div>

          <div className="invite-diamond">
            <img src={diamond} alt="" />
            <div />
          </div>
        </Link>

        <div className="income-history" >

          <div class="invitePageBottomBottom">
           <Card2 title={"Invited Today"} amount={totalReferralCount} />
            <Card2 title={"Today's Income"}
              amount={'₹ ' + totalReferralEarning} />
          </div>


          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '2rem',
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

        <div className="commission-container" style={{ marginBottom: '9rem' }}>
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
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      }}
    >
      <i className={icon}></i>
      <p>{title}</p>
    </Link>
  );
};

const Card2 = ({ title, amount }) => (
  <div class="invitePageBottomBottomCols">
  <center>
    <div class="invitePageBottomColTop">{title}</div>
    <div class="invitePageBottomColBottom">{amount}</div>
    <div class="invitePageMostBottom">
      <div class="invitePageMostBottomLeft">Total {amount}</div>
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAADZ0lEQVRYCcVXTUhUURT+7hs0KDP7UabJ3/4gF7VJLAS1kCKloEVtWrWIloGbFv2ZJrQI27QLauWmFoGQ0aZ/wrSoLAxKiGwyf7BkcsjfuZ1z73v5fPPe+N4w4oHhvrn3nPOde865554r4JPknWPZGP+2D5g7AohyEotAyogSF2KQRvrJPiDUgbySx+L43Wk/qsViTPJ2RRjTiYsEeoIAchfj1+siRrztyDaaxcmeoVQyngbIzkMr8H3kHAQaIbEqlRLPNYE4ybahqKBV1D+YcuNzNUDteiZxj4T3uAkFnhPoQpZx1M0bSQbIm5U7IefuU3wLAwOlEhAiSjrrxek3H+xsCwzQO5c9GQe3ENmILFFh94RhramYK7dneOcWAI/sVcJQWOb8fwNUwmUq5nZQ5zdjcHKbpEJgJl2/72xfUwzER4DZSUtPsJFPR5axlUOhPcDn3O9R21YPHGwDKs8AK3yWBad5jKVqC1UXVeF+fx31XWTqrgKb6ziewJdOoOs6MDnuhPDxn4rV2rJ8Q5dXvxWO9L69BcSiZDpFb3sDUHUWWLnBB6CThTCptIeaDocbaanCuez5/+8YMPoJyN9BwOuBdVuA3CJg6B0wE/cUc10QMkY5oC4W13XPyeH3wJMmYOSjZimtAaovADkbPUXcF0Q5J6G+0dw5vGfHPgOP6I4afK15ivYCtZfIK/neMskrEYOSKT0DWFlsQHti4KVWHdkN7L+SDOM1Q9j6GHox+JlPzAGJ2XlOrg9+SQhpUDZzM5Ee5YQp9ueB0motP9wLdN8IousneyA9A3LpsqyhmBdXacAf3ZQTZEx8OIgBg2QAt1EBKa+MEu4ysMk8vdEu4Gkz8CfoXmQfGUA9XBDio3bgGhDepaU4AZ9R4k2k7Lw8EEIdBjeQVAuoh/NJXP3ySjTzwAvgeWua4IRJ2IbuXqmB9EtcfH71A/0PaecEHizmNhTZztjpXcerqXRMkdOmJ2wKA3w6r2PVInH36pc42dIFZwzCstoyPoaaqHWmFpzSeYmJMRjLJBUC68+yNqVshHKLCDVQdYxaRmVstNpyx0tpPgQmkjj1qpdb54yGQz1MqB13vAkYMskAnlSeKCyopc8WMiRgl8EaTNKyLSBdVtJZS9a4IAesSfuo8mI5Hqd2I/h7qZ7n/wBZfz7VBRipQAAAAABJRU5ErkJggg=="
        height="17.5"
        alt=""
      />
    </div>
  </center>
</div>
);

export default Invite;
