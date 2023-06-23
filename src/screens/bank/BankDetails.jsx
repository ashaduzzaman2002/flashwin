import React from 'react';
import './Bank.css';
import { useNavigate } from 'react-router-dom';

const BankDetails = () => {
    const navigate = useNavigate()
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
