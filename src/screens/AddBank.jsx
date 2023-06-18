import React from 'react';

const AddBank = () => {
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
            />
          </div>

          <div className="up-input-outer">
            <label htmlFor="input2">Account Number</label>
            <input
              id="input2"
              type="text"
              placeholder="Eg., 110283...."
            />
          </div>

          <div className="up-input-outer">
            <label htmlFor="input3">IFSC Code</label>
            <input
              id="input3"
              type="text"
              placeholder="Eg., SBIN008.."
            />
          </div>

          <div className="up-input-outer">
            <label htmlFor="input4">Account Holder Name</label>
            <input
              id="input4"
              type="text"
              placeholder="Eg., Your Name"
            />
          </div>

          <div className="up-input-outer">
            <label htmlFor="input1">UPI Address</label>
            <input
              id="input1"
              type="text"
              placeholder="Eg., some@upi"
            />
          </div>
          <div style={{width: '100%'}}>
          <button className="btn" style={{marginTop: '1.5rem'}}>Add bank account</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AddBank;
