import React from 'react';
import './commisionCard.css';
import { check } from '../../assets';

const CommissionCard = ({ data }) => {
  const newDate = new Date(data.date);
  const formattedDate = newDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
  });
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const formattedTime = `${hours}:${minutes}`;

  console.log(data);

  return (
    <div className="invitePageIncomeBox">
      <div className="invitePageIncomeBoxLeft">
        <div className="invitePageIncomeBoxIcon">
          <img
            src={"https://res.cloudinary.com/fiewin/image/upload/images/Cash.png"}
            width="100%"
            alt=""
            style={{borderRadius: 100}}
          />
        </div>
        <div className="invitePageIncomeBoxLeftRight">
          <div className="invitePageIncomeDetail1">Invite cashback</div>
          <div className="invitePageIncomeDetailBottom">
            <div className="invitePageIncomeTime">
              {formattedDate} {formattedTime} &nbsp;&nbsp;&nbsp; from {data.refer}
            </div>
          </div>
        </div>
      </div>
      <div className="invitePageIncomeAmount">+₹{data.amount}</div>
    </div>
  );
};

export default CommissionCard;
