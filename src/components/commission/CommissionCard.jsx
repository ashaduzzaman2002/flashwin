import React from 'react'
import './commisionCard.css'
import { check } from '../../assets';

const CommissionCard = ({data}) => {
    const newDate = new Date(data.date);
  const formattedDate = newDate.toLocaleDateString('en-GB'); // dd/mm/yyyy
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const formattedTime = `${hours}:${minutes}`;

  return (
    <div className='commission-card'>
        
      <div className="info">
        <img src={check} width={50} alt="" />
        <div>
          <p>Commission from</p>
          <p>{data.refer}</p>
          <p>{`${formattedDate} ${formattedTime}`}</p>
        </div>
      </div>

      <div style={{ color: '#3bd146' }}>
        <p className="amount">
        ₹{Number(data.amount).toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default CommissionCard