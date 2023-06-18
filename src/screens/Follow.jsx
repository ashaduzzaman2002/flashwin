import React from 'react';
import '../styles/Follow.css';
import {telegram} from '../assets'

const Follow = () => {
  return (
    <div className="container">
      <div className="follow-container">
        <h2>Follow Us</h2>

        <div className='follow-cards'>
            <Card1 imgUrl = {telegram} title='Telegram Channel' />
            <Card1 imgUrl = {telegram} title='Telegram Bot' />
        </div>
      </div>
    </div>
  );
};


const Card1 = ({imgUrl, title}) => (
    <div className='follow-card'>
        <img src={imgUrl} alt="" />
        <h2>{title}</h2>
    </div>
)

export default Follow;
