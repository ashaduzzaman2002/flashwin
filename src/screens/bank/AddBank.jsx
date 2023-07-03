import React, { useState } from 'react';
import { dbObject } from '../../helper/constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBank = () => {
  const [bank_name, setBankName] = useState('');
  const [account_number, setAccountNumber] = useState('');
  const [ifsc_code, setIfscCode] = useState('');
  const [account_holder, setAccountHolder] = useState('');
  const [upi, setUpiId] = useState('');

  const addbankAccount = async (e) => {
    e.preventDefault();
    const bankMap = { bank_name, account_holder, account_number, ifsc_code, upi };
    try {
      const { data } = await dbObject.post("/payment/add", bankMap);
      console.log(data);
      if (!data.error) {
        toast.success(data.message, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else {
        toast.error(data.message, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="bankDetails-container">
        <div className="addbank-icon">
          <i className="fa-solid fa-building-columns"></i>
        </div>

        <form action="">
          <div className="up-input-outer">
            <label htmlFor="input1">Bank Name</label>
            <input
              id="input1"
              type="text"
              placeholder="Eg., State Bank of India"
              value={bank_name}
              onChange={(e) => setBankName(e.target.value)}
            />
          </div>

          <div className="up-input-outer">
            <label htmlFor="input2">Account Number</label>
            <input
              id="input2"
              type="number"
              placeholder="Eg., 110283...."
              value={account_number}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>

          <div className="up-input-outer">
            <label htmlFor="input3">IFSC Code</label>
            <input
              id="input3"
              type="text"
              placeholder="Eg., SBIN008.."
              value={ifsc_code}
              onChange={(e) => setIfscCode(e.target.value)}
            />
          </div>

          <div className="up-input-outer">
            <label htmlFor="input4">Account Holder Name</label>
            <input
              id="input4"
              type="text"
              placeholder="Eg., Your Name"
              value={account_holder}
              onChange={(e) => setAccountHolder(e.target.value)}
            />
          </div>

          <div className="up-input-outer">
            <label htmlFor="input1">UPI Address</label>
            <input
              id="input1"
              type="text"
              placeholder="Eg., some@upi"
              value={upi}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
          <div style={{ width: '100%' }}>
            <button className="btn" style={{ marginTop: '1.5rem' }} onClick={addbankAccount}>Add bank account</button>
          </div>
        </form>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
};

export default AddBank;
