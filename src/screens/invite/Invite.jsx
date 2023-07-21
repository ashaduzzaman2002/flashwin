import React, { useContext, useEffect, useState } from 'react';
import BottomNav from '../../components/bottomNav/BottomNav';
import './invite.css';
import { Link, useNavigate } from 'react-router-dom';
import { dbObject } from '../../helper/constant';
import {
  agentPlanEnter,
  diamond,
  myLink,
  privilege,
  privilege1,
  ranking,
  treasure,
} from '../../assets';
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

      <div class="App">
        <div class="app__responsive">
          <div style={{ minHeight: '100vh' }}>
            <div
              class="invite__page__nav"
              style={{ color: 'rgb(255, 255, 255)', fontWeight: '500' }}
            >
              Invite &amp; Earn
            </div>
            <div style={{ height: 50, width: '100%' }}></div>
            <div class="invite__page__top">
              <div class="invite__balance__section">
                <div class="invite__balance__section__box">
                  <div class="invite__balance__section__box__left">
                    <div class="invite__balance__section__box__left__top">
                      Referral Income
                    </div>
                    <div
                      class="invite__balance__section__box__left__bottom"
                      style={{ fontFamily: 'sans-serif' }}
                    >
                      ₹54.00
                    </div>
                  </div>
                  <button class="referral__balance__transfer__btn">
                    Withdraw
                  </button>
                </div>
              </div>

              <div class="invitePageMenuOptions">
                <div class="invitePageMenuCol">
                  <img
                    src={privilege1}
                    onClick={() => navigate('/privilege')}
                    width="100%"
                    alt=""
                  />
                </div>

                <div class="invitePageMenuCol">
                  <img
                    onClick={() => navigate('/ranking')}
                    src={ranking}
                    width="100%"
                    alt=""
                  />
                </div>
                <div class="invitePageMenuCol">
                  <img src={myLink} width="100%" alt="" />
                </div>
              </div>
            </div>
            <div class="invitePageBottom">
              <div class="invitePageBottomTop">
                <img src={agentPlanEnter} width="100%" alt="" />
              </div>
              <div class="invitePageBottomBottom">
                <div class="invitePageBottomBottomCols">
                  <center>
                    <div class="invitePageBottomColTop">Invited Today</div>
                    <div class="invitePageBottomColBottom">0</div>
                    <div class="invitePageMostBottom">
                      <div class="invitePageMostBottomLeft">Total 1</div>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAADZ0lEQVRYCcVXTUhUURT+7hs0KDP7UabJ3/4gF7VJLAS1kCKloEVtWrWIloGbFv2ZJrQI27QLauWmFoGQ0aZ/wrSoLAxKiGwyf7BkcsjfuZ1z73v5fPPe+N4w4oHhvrn3nPOde865554r4JPknWPZGP+2D5g7AohyEotAyogSF2KQRvrJPiDUgbySx+L43Wk/qsViTPJ2RRjTiYsEeoIAchfj1+siRrztyDaaxcmeoVQyngbIzkMr8H3kHAQaIbEqlRLPNYE4ybahqKBV1D+YcuNzNUDteiZxj4T3uAkFnhPoQpZx1M0bSQbIm5U7IefuU3wLAwOlEhAiSjrrxek3H+xsCwzQO5c9GQe3ENmILFFh94RhramYK7dneOcWAI/sVcJQWOb8fwNUwmUq5nZQ5zdjcHKbpEJgJl2/72xfUwzER4DZSUtPsJFPR5axlUOhPcDn3O9R21YPHGwDKs8AK3yWBad5jKVqC1UXVeF+fx31XWTqrgKb6ziewJdOoOs6MDnuhPDxn4rV2rJ8Q5dXvxWO9L69BcSiZDpFb3sDUHUWWLnBB6CThTCptIeaDocbaanCuez5/+8YMPoJyN9BwOuBdVuA3CJg6B0wE/cUc10QMkY5oC4W13XPyeH3wJMmYOSjZimtAaovADkbPUXcF0Q5J6G+0dw5vGfHPgOP6I4afK15ivYCtZfIK/neMskrEYOSKT0DWFlsQHti4KVWHdkN7L+SDOM1Q9j6GHox+JlPzAGJ2XlOrg9+SQhpUDZzM5Ee5YQp9ueB0motP9wLdN8IousneyA9A3LpsqyhmBdXacAf3ZQTZEx8OIgBg2QAt1EBKa+MEu4ysMk8vdEu4Gkz8CfoXmQfGUA9XBDio3bgGhDepaU4AZ9R4k2k7Lw8EEIdBjeQVAuoh/NJXP3ySjTzwAvgeWua4IRJ2IbuXqmB9EtcfH71A/0PaecEHizmNhTZztjpXcerqXRMkdOmJ2wKA3w6r2PVInH36pc42dIFZwzCstoyPoaaqHWmFpzSeYmJMRjLJBUC68+yNqVshHKLCDVQdYxaRmVstNpyx0tpPgQmkjj1qpdb54yGQz1MqB13vAkYMskAnlSeKCyopc8WMiRgl8EaTNKyLSBdVtJZS9a4IAesSfuo8mI5Hqd2I/h7qZ7n/wBZfz7VBRipQAAAAABJRU5ErkJggg=="
                        height="17.5"
                        alt=""
                      />
                    </div>
                  </center>
                </div>
                <div class="invitePageBottomBottomCols">
                  <center>
                    <div class="invitePageBottomColTop">Today's Income</div>
                    <div class="invitePageBottomColBottom">₹0</div>
                    <div class="invitePageMostBottom">
                      <div class="invitePageMostBottomLeft">Total ₹1</div>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAADZ0lEQVRYCcVXTUhUURT+7hs0KDP7UabJ3/4gF7VJLAS1kCKloEVtWrWIloGbFv2ZJrQI27QLauWmFoGQ0aZ/wrSoLAxKiGwyf7BkcsjfuZ1z73v5fPPe+N4w4oHhvrn3nPOde865554r4JPknWPZGP+2D5g7AohyEotAyogSF2KQRvrJPiDUgbySx+L43Wk/qsViTPJ2RRjTiYsEeoIAchfj1+siRrztyDaaxcmeoVQyngbIzkMr8H3kHAQaIbEqlRLPNYE4ybahqKBV1D+YcuNzNUDteiZxj4T3uAkFnhPoQpZx1M0bSQbIm5U7IefuU3wLAwOlEhAiSjrrxek3H+xsCwzQO5c9GQe3ENmILFFh94RhramYK7dneOcWAI/sVcJQWOb8fwNUwmUq5nZQ5zdjcHKbpEJgJl2/72xfUwzER4DZSUtPsJFPR5axlUOhPcDn3O9R21YPHGwDKs8AK3yWBad5jKVqC1UXVeF+fx31XWTqrgKb6ziewJdOoOs6MDnuhPDxn4rV2rJ8Q5dXvxWO9L69BcSiZDpFb3sDUHUWWLnBB6CThTCptIeaDocbaanCuez5/+8YMPoJyN9BwOuBdVuA3CJg6B0wE/cUc10QMkY5oC4W13XPyeH3wJMmYOSjZimtAaovADkbPUXcF0Q5J6G+0dw5vGfHPgOP6I4afK15ivYCtZfIK/neMskrEYOSKT0DWFlsQHti4KVWHdkN7L+SDOM1Q9j6GHox+JlPzAGJ2XlOrg9+SQhpUDZzM5Ee5YQp9ueB0motP9wLdN8IousneyA9A3LpsqyhmBdXacAf3ZQTZEx8OIgBg2QAt1EBKa+MEu4ysMk8vdEu4Gkz8CfoXmQfGUA9XBDio3bgGhDepaU4AZ9R4k2k7Lw8EEIdBjeQVAuoh/NJXP3ySjTzwAvgeWua4IRJ2IbuXqmB9EtcfH71A/0PaecEHizmNhTZztjpXcerqXRMkdOmJ2wKA3w6r2PVInH36pc42dIFZwzCstoyPoaaqHWmFpzSeYmJMRjLJBUC68+yNqVshHKLCDVQdYxaRmVstNpyx0tpPgQmkjj1qpdb54yGQz1MqB13vAkYMskAnlSeKCyopc8WMiRgl8EaTNKyLSBdVtJZS9a4IAesSfuo8mI5Hqd2I/h7qZ7n/wBZfz7VBRipQAAAAABJRU5ErkJggg=="
                        height="17.5"
                        alt=""
                      />
                    </div>
                  </center>
                </div>
              </div>
            </div>
            <div class="invitePageBreaker"></div>
            <div class="invitePageIncomeDetails">
              <div class="invitePageIncomeDetailsTop">
                <div class="invitePageIncomeDetailsTopLeft">
                  Income Detail's
                </div>
                <div class="invitePageIncomeDetailsTopRight">More &gt;</div>
              </div>
              <div class="invitePageIncomeDetailsBottom">
                <div class="invitePageIncomeBox">
                  <div class="invitePageIncomeBoxLeft">
                    <div class="invitePageIncomeBoxIcon">
                      <img
                        src="https://res.cloudinary.com/fiewin/image/upload/images/Cash.png"
                        width="100%"
                        alt=""
                        style={{ borderRadius: 100 }}
                      />
                    </div>
                    <div class="invitePageIncomeBoxLeftRight">
                      <div class="invitePageIncomeDetail1">Invite cashback</div>
                      <div class="invitePageIncomeDetailBottom">
                        <div class="invitePageIncomeTime">
                          11/01 09:10 &nbsp;&nbsp;&nbsp; from 07B4UMIV
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="invitePageIncomeAmount">+₹1</div>
                </div>

                <div
                  className="commission-container"
                  style={{ marginBottom: '9rem' }}
                >
                  {commissionHistory?.map((item) => (
                    <CommissionCard key={item.id} data={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
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


export default Invite;
