import React, { useContext, useEffect, useState } from 'react';
import './Bank.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const BankDetails = () => {
  const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user.bank);
  return (
    <div className="container">
      <div className="bankDetails-container">
        <h2>Bank Details</h2>

        <div className="bank-card">
          <i className="fa-solid fa-building-columns"></i>
          <p>Tab to add first account</p>
        </div>
        <button onClick={() => navigate('/add-bank')} className="addAcountBtn">
          <span style={{ fontSize: '2rem', paddingBottom: 8 }}>+</span> Add
          Account
        </button>
      </div>
    </div>
  );
};

export default BankDetails;
