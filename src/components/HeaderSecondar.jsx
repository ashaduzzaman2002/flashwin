import React, { useContext, useEffect, useState } from 'react';
import { dbObject } from '../helper/constant';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const HeaderSecondar = ({ title }) => {
  const {walletBalance} = useContext(AuthContext)

  return (
    <div className="header-secondary">
      <h1>{title}</h1>

      <div className='header-secondary-card'>
        <div>
          <p>Total Blance Available</p>
          <p>₹ {walletBalance}</p>
        </div>

        <button>
          <i className="fa-solid fa-clock-rotate-left"></i> History
        </button>
      </div>
    </div>
  );
};

export default HeaderSecondar;
