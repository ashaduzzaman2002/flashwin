import React, { useContext, useEffect, useState } from 'react';
import './Bank.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/Header';

const BankDetails = () => {
  const { user } = useContext(AuthContext);
  // const 
 
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="bankDetails-container">
        {/* <h2>Bank Details</h2> */}
        <Header path={'/withdraw'} title={'Bank'} />

        {user?.bank ? (
          <div className="all-bank">
            <BankCard remove = {true} data={user?.bank} />
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

export const BankCard = ({remove, data}) => {
  console.log(data)
  return (
  <div className="bank-detail-card" style={{color: '#fff'}}>
    <div className="bank-detail-card-header" >
      <h3>{data?.bank_name}</h3>
      {
        remove && <button>
        <i className="fa-solid fa-trash"></i>
      </button>
      }
      
    </div>

    <div className='bank-detail-card-info' style={{marginTop: '2rem'}}>
      <div>
        <p>A/C Number</p>
        <p>{data?.account_number}</p>
      </div>

      <div>
        <p>IFSC</p>
        <p>{data?.ifsc_code}</p>
      </div>
    </div>

    <div className='bank-detail-card-info'>
      <div>
        <p>Holder Name</p>
        <p>{data?.account_holder}</p>
      </div>

      <div>
        <p>UPI Address</p>
        <p>{data?.upi}</p>
      </div>
    </div>
  </div>
);}

export default BankDetails;
