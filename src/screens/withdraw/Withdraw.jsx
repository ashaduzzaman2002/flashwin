import React, { useState } from 'react';
import './withdraw.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dbObject } from '../../helper/constant';
import { Link, useNavigate } from 'react-router-dom';

const Withdraw = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(true);
  const [amount, setAmount] = useState();

  const withdrawRequest = async () => {
    try {
      const amountMap = {
        amount,
      };
      const { data } = await dbObject.post('/withdraw/request', amountMap);
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

    <div className="App">
      <div className="app__responsive">
        <div style={{ minHeight: '100vh' }}>
          <div className='container'>

          
          <div
            className="checkIn__nav"
            style={{
              borderBottom: '1px solid rgb(240, 240, 240)',
              height: 40,
              color: '#fff',
            }}
          >
            <div className="checkIn__nav__col">
              <div onClick={() => navigate('/')} className="top__nav__back__btn">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M216.4 163.7c5.1 5 5.1 13.3.1 18.4L155.8 243h231.3c7.1 0 12.9 5.8 12.9 13s-5.8 13-12.9 13H155.8l60.8 60.9c5 5.1 4.9 13.3-.1 18.4-5.1 5-13.2 5-18.3-.1l-82.4-83c-1.1-1.2-2-2.5-2.7-4.1-.7-1.6-1-3.3-1-5 0-3.4 1.3-6.6 3.7-9.1l82.4-83c4.9-5.2 13.1-5.3 18.2-.3z"></path>
                </svg>
              </div>
            </div>
            <div className="checkIn__nav__col">
              <center>Withdrawal</center>
            </div>
            <div className="checkIn__nav__col"></div>
          </div>
          <div className="withdrawal__page__balance__section">
            <center>
              <div className="withdrawal__page__balance__section__top">
                My Balance
              </div>
              <div
                className="withdrawal__page__balance__section__bottom"
                style={{ fontFamily: 'sans-serif' }}
              >
                ₹398.48
              </div>
            </center>
          </div>
          <div className="passbook__details">
            <div className="passbook__details__in">
              <div className="passbook__detail__box" style={{ marginTop: 15 }}>
                <div className="to__bank">Bank</div>
                <div className="passbook__active__container">
                  <div className="passbook__active">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"></path>
                    </svg>
                  </div>
                </div>
                <div className="passbook__detail">
                  <div className="passbook__detail__col">
                    <div className="passbook__detail__col__left">Name</div>
                    <div className="passbook__detail__col__right">Ashadu Zaman</div>
                  </div>
                  <div className="passbook__detail__col">
                    <div className="passbook__detail__col__left">IFSC</div>
                    <div className="passbook__detail__col__right">
                      SOMETHING002
                    </div>
                  </div>
                  <div className="passbook__detail__col">
                    <div className="passbook__detail__col__left">
                      Account Number
                    </div>
                    <div className="passbook__detail__col__right">
                      0616261626162
                    </div>
                  </div>
                </div>
              </div>
              <div className="changeCard">
                <Link to={'/bank-details'}>change &gt;</Link>
              </div>
            </div>
          </div>
          <div className="withdrawal__amount__field">
            <div className="withdrawal__field__header">
              Withdrawal Amount{' '}
              <span style={{ fontSize: 12, fontWeight: '300' }}></span>
            </div>
            <div className="withdrawal__input__field">
              <div className="withdrawal__input__field__icon">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 320 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"></path>
                </svg>
              </div>
              <input
                type="number"
                placeholder="100 - 50000"
                name=""
                id=""
                value={amount}
                onChange={handleChange}
              />
            </div>
            <div className="withdrawal__input__notes">
              <div className="withdrawal__input__notes__left">
                Amount &lt;₹1500,fee 30
              </div>
              <div className="withdrawal__input__notes__left">Maximum: ₹398.48</div>
            </div>
            <div className="withdrawal__input__notes">
              <div className="withdrawal__input__notes__left">
                Amount &gt;=₹1500,fee 2%
              </div>
              <div className="withdrawal__input__notes__left">Minimum: ₹35</div>
            </div>
            <br />
            <button
              className={`withdraw__btn ${error && 'recharge__btn_disabled'}`}
              style={{
                height: 45,
              }}
              onClick={withdrawRequest}
              disabled={error}
            >
              Withdraw
            </button>
          </div>
          <div className="withdrawal__records__section">
            <div className="withdrawal__records__section__record__top"></div>
            <div className="withdrawal__records__section__bottom">
              <div className="withdrawal__records__section__bottom__header">
                Withdrawal Records
              </div>
              <div className="withdrawalRecords__container">
                <div className="withdrawalRecords__container__box">
                  <div className="withdrawalRecords__container__box__top">
                    <div
                      className="withdrawalRecords__container__box__top__col"
                      style={{ flexBasis: '32%', width: '100%' }}
                    >
                      <div className="withdrawalRecords__container__box__top__top">
                        Amount
                      </div>
                      <div
                        className="withdrawalRecords__container__box__top__bottom"
                        style={{ fontFamily: 'sans-serif' }}
                      >
                        ₹158
                      </div>
                    </div>
                    <div
                      className="withdrawalRecords__container__box__top__col"
                      style={{ flexBasis: '34%', width: '100%' }}
                    >
                      <div className="withdrawalRecords__container__box__top__top">
                        Time
                      </div>
                      <div className="withdrawalRecords__container__box__top__bottom">
                        01/25 16:24
                      </div>
                    </div>
                    <div
                      className="withdrawalRecords__container__box__top__col"
                      style={{
                        flexBasis: '34%',
                        width: '100%',
                        textAlign: 'right',
                      }}
                    >
                      <div className="withdrawalRecords__container__box__top__top">
                        Status
                      </div>
                      <div className="withdrawalRecords__container__box__top__bottom">
                        Pending
                      </div>
                    </div>
                  </div>
                  <div className="withdrawalRecords__container__box__bottom">
                    <div className="withdrawalRecords__container__box__bottom__top">
                      <div className="withdrawalRecords__container__box__bottom__top__col">
                        Actually Arrived: 128
                      </div>
                      <div className="withdrawalRecords__container__box__bottom__top__col">
                        Fee: 30
                      </div>
                    </div>
                    <div
                      className="withdrawalRecords__container__box__bottom__top"
                      style={{ marginTop: 12 }}
                    >
                      <div className="withdrawalRecords__container__box__bottom__top__col">
                        Name:
                      </div>
                      <div className="withdrawalRecords__container__box__bottom__top__col">
                        Harsh Kumar Jha
                      </div>
                    </div>
                    <div className="withdrawalRecords__container__box__bottom__top">
                      <div className="withdrawalRecords__container__box__bottom__top__col">
                        UPI:
                      </div>
                      <div className="withdrawalRecords__container__box__bottom__top__col">
                        mrhulk@apl
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="toastContainer top-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
