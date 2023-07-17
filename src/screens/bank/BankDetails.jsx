import React, { useContext, useEffect, useState } from 'react';
import './Bank.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const BankDetails = () => {
  const { user } = useContext(AuthContext);
  const [banks, setBanks] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="bankDetails-container">
        <h2>Bank Details</h2>

        {banks ? (
          <div className="all-bank">
            <BankCard setBanks={setBanks} />
          </div>
        ) : (
          <div onClick={() => navigate('/add-bank')} className="bank-card">
            <i className="fa-solid fa-building-columns"></i>
            <p>Tab to add first account</p>
          </div>
        )}

        <button onClick={() => navigate('/add-bank')} className="addAcountBtn">
          <span style={{ fontSize: '2rem', paddingBottom: 8 }}>+</span> Add
          Account
        </button>
      </div>
    </div>
  );
};

const BankCard = ({setBanks}) => (
  <div className="bank-detail-card">
    <div className="bank-detail-card-header">
      <h3>Punjab National Bank</h3>
      <button onClick={() => setBanks(false)}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>

    <div className='bank-detail-card-info' style={{marginTop: '2rem'}}>
      <div>
        <p>A/C Number</p>
        <p>00000000000</p>
      </div>

      <div>
        <p>IFSC</p>
        <p>UTBI0007</p>
      </div>
    </div>

    <div className='bank-detail-card-info'>
      <div>
        <p>Holder Name</p>
        <p>Ashadu Zaman</p>
      </div>

      <div>
        <p>UPI Address</p>
        <p>exaple@ybl</p>
      </div>
    </div>
  </div>
);

export default BankDetails;
