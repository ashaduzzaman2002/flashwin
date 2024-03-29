import React, { useContext, useEffect, useState } from "react";
import BottomNav from "../../components/bottomNav/BottomNav";
import "./invite.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { dbObject } from "../../helper/constant";
import { agentPlanEnter, myLink, privilege1, ranking } from "../../assets";
import CommissionCard from "../../components/commission/CommissionCard";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";

const Invite = () => {
  const navigate = useNavigate();
  const { commissionHistory } = useContext(AuthContext);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [commissionWalletBalance, setCommissionWalletBalance] = useState("0.0");
  const [totalReferralCount, setTotalReferralCount] = useState("0");
  const [totalReferralEarning, setTotalReferralEarning] = useState("0");
  const [todayReferralCount, setTodayReferralCount] = useState("0");
  const [todayReferralEarning, setTodayReferralEarning] = useState("0");

  const fetchCommissionWallet = async () => {
    try {
      const { data } = await dbObject.get("/commision/wallet");
      console.log(data);
      if (!data.error) {
        setCommissionWalletBalance(data?.data[0]?.balance);
      } else {
        console.log("Issue from Server Side");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReferCounts = async () => {
    try {
      const { data } = await dbObject.get("/wallet/refer_history");
      console.log(data);
      if (!data.error) {
        setTotalReferralCount(data.data.total_refer);
        setTotalReferralEarning(data.data.total_earning);
        setTodayReferralCount(data.today.total);
        setTodayReferralEarning(data.today.amount);
      } else {
        console.log("Issue from Server Side");
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
    <div className="container" style={{ paddingBottom: "0rem" }}>
      <BottomNav />

      <div className="App">
        <div className="app__responsive">
          <div>
            <Header path={"/"} title={"Ivite & Earn"} />
            <div className="invite__page__top">
              <div className="invite__balance__section">
                <div className="invite__balance__section__box">
                  <div className="invite__balance__section__box__left">
                    <div className="invite__balance__section__box__left__top">
                      Referral Income
                    </div>
                    <div
                      className="invite__balance__section__box__left__bottom"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      ₹{commissionWalletBalance}
                    </div>
                  </div>
                  <button
                    className="referral__balance__transfer__btn"
                    onClick={() => navigate("/withdraw")}
                  >
                    Withdraw
                  </button>
                </div>
              </div>

              <div className="invitePageMenuOptions">
                <div className="invitePageMenuCol">
                  <img
                    src={privilege1}
                    onClick={() => navigate("/privilege")}
                    width="100%"
                    alt=""
                  />
                </div>

                <div className="invitePageMenuCol">
                  <img
                    onClick={() => navigate("/ranking")}
                    src={ranking}
                    width="100%"
                    alt=""
                  />
                </div>
                <div className="invitePageMenuCol">
                  <img src={myLink} width="100%" alt="" />
                </div>
              </div>
            </div>

            <div className="invitePageBottom">
              <div
                className="invitePageBottomTop"
                onClick={() => navigate("/agent")}
              >
                <img style={{cursor: 'pointer'}} src={agentPlanEnter} width="100%" alt="" />
              </div>
              <div className="invitePageBottomBottom">
                <div className="invitePageBottomBottomCols">
                  <center>
                    <div className="invitePageBottomColTop">Invited Today</div>
                    <div className="invitePageBottomColBottom">
                      {todayReferralCount}
                    </div>
                    <div className="invitePageMostBottom">
                      <div className="invitePageMostBottomLeft">
                        Total {totalReferralCount}
                      </div>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAADZ0lEQVRYCcVXTUhUURT+7hs0KDP7UabJ3/4gF7VJLAS1kCKloEVtWrWIloGbFv2ZJrQI27QLauWmFoGQ0aZ/wrSoLAxKiGwyf7BkcsjfuZ1z73v5fPPe+N4w4oHhvrn3nPOde865554r4JPknWPZGP+2D5g7AohyEotAyogSF2KQRvrJPiDUgbySx+L43Wk/qsViTPJ2RRjTiYsEeoIAchfj1+siRrztyDaaxcmeoVQyngbIzkMr8H3kHAQaIbEqlRLPNYE4ybahqKBV1D+YcuNzNUDteiZxj4T3uAkFnhPoQpZx1M0bSQbIm5U7IefuU3wLAwOlEhAiSjrrxek3H+xsCwzQO5c9GQe3ENmILFFh94RhramYK7dneOcWAI/sVcJQWOb8fwNUwmUq5nZQ5zdjcHKbpEJgJl2/72xfUwzER4DZSUtPsJFPR5axlUOhPcDn3O9R21YPHGwDKs8AK3yWBad5jKVqC1UXVeF+fx31XWTqrgKb6ziewJdOoOs6MDnuhPDxn4rV2rJ8Q5dXvxWO9L69BcSiZDpFb3sDUHUWWLnBB6CThTCptIeaDocbaanCuez5/+8YMPoJyN9BwOuBdVuA3CJg6B0wE/cUc10QMkY5oC4W13XPyeH3wJMmYOSjZimtAaovADkbPUXcF0Q5J6G+0dw5vGfHPgOP6I4afK15ivYCtZfIK/neMskrEYOSKT0DWFlsQHti4KVWHdkN7L+SDOM1Q9j6GHox+JlPzAGJ2XlOrg9+SQhpUDZzM5Ee5YQp9ueB0motP9wLdN8IousneyA9A3LpsqyhmBdXacAf3ZQTZEx8OIgBg2QAt1EBKa+MEu4ysMk8vdEu4Gkz8CfoXmQfGUA9XBDio3bgGhDepaU4AZ9R4k2k7Lw8EEIdBjeQVAuoh/NJXP3ySjTzwAvgeWua4IRJ2IbuXqmB9EtcfH71A/0PaecEHizmNhTZztjpXcerqXRMkdOmJ2wKA3w6r2PVInH36pc42dIFZwzCstoyPoaaqHWmFpzSeYmJMRjLJBUC68+yNqVshHKLCDVQdYxaRmVstNpyx0tpPgQmkjj1qpdb54yGQz1MqB13vAkYMskAnlSeKCyopc8WMiRgl8EaTNKyLSBdVtJZS9a4IAesSfuo8mI5Hqd2I/h7qZ7n/wBZfz7VBRipQAAAAABJRU5ErkJggg=="
                        height="17.5"
                        alt=""
                      />
                    </div>
                  </center>
                </div>
                <div className="invitePageBottomBottomCols">
                  <center>
                    <div className="invitePageBottomColTop">Today's Income</div>
                    <div className="invitePageBottomColBottom">
                      ₹{todayReferralEarning}
                    </div>
                    <div className="invitePageMostBottom">
                      <div className="invitePageMostBottomLeft">
                        Total ₹{totalReferralEarning}
                      </div>
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

            <div className="invitePageIncomeDetails">
              <div className="invitePageIncomeDetailsTop">
                <div className="invitePageIncomeDetailsTopLeft">
                  Income Detail's
                </div>
                <div
                  className="invitePageIncomeDetailsTopRight"
                  style={{cursor: 'pointer'}}
                  onClick={() => navigate("/commission-history")}
                >
                  More &gt;
                </div>
              </div>
              {commissionHistory?.slice(0, 3)?.map((item, i) => (
                <CommissionCard key={item.id} data={item} />
              ))}
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
        cursor: "default",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <i className={icon}></i>
      <p>{title}</p>
    </Link>
  );
};

export default Invite;
