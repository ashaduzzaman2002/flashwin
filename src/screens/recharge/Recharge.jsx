import React, { useContext } from 'react';
import './Recharge.css';
import BottomNav from '../../components/bottomNav/BottomNav';
import HeaderSecondar from '../../components/HeaderSecondar';
import { useState } from 'react';
import { dbObject } from '../../helper/constant';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { AuthContext } from '../../context/AuthContext';

const Recharge = () => {
  const quickAmount = [100, 250, 500, 1000, 5000, 10000];
  const [error, setError] = useState(true);
  const [amount, setAmount] = useState();

  const { walletBalance } = useContext(AuthContext);

  const rechargeRequest = async () => {
    try {
      const amountMap = {
        amount,
      };
      const { data } = await dbObject.post('/payment/deposit', amountMap);
      if (!data.error) {
        window.open(data.data.payurl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;

    const input = Number(value);
    console.log(typeof value);

    if (input && typeof Number(input) == 'number' && input >= 100) {
      setError(false);
    } else {
      setError(true);
    }
    setAmount(value);
  };
  return (
    <div className="container">
      {/* ====== Bottom Navbar ====== */}
      <BottomNav />

      <div className="withdraw-container">
        {/* ====== Header ====== */}
        <Header title="Recharge" path="/recharge-history" btn="Records" />

        {/* ====== Blance ====== */}
        <div class="recharge__page__balance__section">
          <div class="recharge__page__balance__section__inner">
            <center>
              <div class="recharge__page__balance__section__top">Balance</div>
              <div class="recharge__page__balance__section__bottom">
                ₹{walletBalance}
              </div>
            </center>
          </div>
        </div>

        {/* ===== Recharge Input ===== */}
        <div class="recharge__screen">
          <div class="amount__field">Amount</div>
          <input
            type="number"
            onChange={handleChange}
            placeholder="₹ (100 - 150000)"
            value={amount}
          />
          <div class="recharge__price__options">
            {quickAmount?.map((item) => (
              <div
                onClick={() => {
                  setAmount(item);
                  setError(false);
                }}
                key={item}
                class="recharge__price__option"
              >
                ₹{item}
              </div>
            ))}
          </div>
          <div class="recharge__button">
            <button
              onClick={rechargeRequest}
              class={`recharge__btn ${error && 'recharge__btn_disabled'}`}
            >
              Recharge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
