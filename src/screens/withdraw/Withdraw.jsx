import React, { useState } from 'react';
import './withdraw.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BottomNav from '../../components/bottomNav/BottomNav';
import HeaderSecondar from '../../components/HeaderSecondar';
import { dbObject } from '../../helper/constant';
import { Link } from 'react-router-dom';

const Withdraw = () => {
  const [amount, setAmount] = useState('0');

  const withdrawRequest = async () => {
    try {
      const amountMap = {
        amount,
      };
      const { data } = await dbObject.post('/withdraw/request', amountMap);
      if (!data.error) {
        // console.log(data);
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
  };

  return (
    <div className="container">
      <BottomNav />
      <div className="withdraw-container">
        <HeaderSecondar title={'Withdraw'} />

        {/* <div>
          <Link to={'add-bank'}>
            <i class="fa-solid fa-building-columns"></i>
            Add Bank Account
          </Link>
        </div> */}

        <h2 className="withdraw-amount-header">Withdrawal amount</h2>

        <div className="withdraw-amount">
          <p>₹</p>
          <input
            type="number"
            placeholder="23~100000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="withdraw-note">
          <h3>Note: </h3>
          <p>
            Amount {'<'} <span>Rs. 1500,</span> Fee: <span>Rs. 30,</span>{' '}
            Maximum: <span>Rs. 167</span>{' '}
          </p>
          <p>
            Amount {'>='} <span>Rs. 1500,</span> Fee: <span>2%,</span> Maximum:{' '}
            <span>Rs. 35</span>{' '}
          </p>
        </div>

        <div>
          <button className="withdraw-btn" onClick={withdrawRequest}>
            Withdraw
          </button>
        </div>
      </div>

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
  );
};

export default Withdraw;
