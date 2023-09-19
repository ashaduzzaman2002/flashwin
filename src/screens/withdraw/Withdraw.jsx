import React, { useContext, useEffect, useState } from "react";
import "./withdraw.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dbObject } from "../../helper/constant";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";
import { BankCard } from "../bank/BankDetails";

const Withdraw = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(true);
  const [amount, setAmount] = useState();
  const { walletBalance, user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  const withdrawRequest = async () => {
    try {
      const amountMap = {
        amount: Number(amount),
      };
      console.log(amountMap);
      const { data } = await dbObject.post("/withdraw/request", amountMap);
      console.log(data);
      if (!data.error) {
        toast.success(data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setAmount("");
      } else {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
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

    if (input && typeof Number(input) == "number" && input >= 100) {
      setError(false);
    } else {
      setError(true);
    }
    setAmount(value);
  };

  const withdrawHistory = async () => {
    try {
      const { data } = await dbObject.post("/withdraw/history");
      console.log(data);
      if (!data.error) {
        setHistory(data?.data?.slice(0, 3));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(history);
  });

  useEffect(() => {
    withdrawHistory();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <div className="app__responsive">
        <div style={{ minHeight: "100vh" }}>
          <div className="container" style={{ paddingBottom: "0" }}>
            <Header path={"/"} title={"Withdraw"} />
            <div className="withdrawal__page__balance__section">
              <center>
                <div className="withdrawal__page__balance__section__top">
                  My Balance
                </div>
                <div
                  className="withdrawal__page__balance__section__bottom"
                  style={{ fontFamily: "sans-serif" }}
                >
                  ₹{walletBalance}
                </div>
              </center>
            </div>
            <div className="passbook__details">
              {user?.bank ? (
                <div className="passbook__details__in">
                  {/* <div
                    className="passbook__detail__box"
                    style={{ marginTop: 15 }}
                  >
                    <div className="to__bank">{user?.bank?.bank_name}</div>
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
                        <div className="passbook__detail__col__right">
                          {user.bank.account_holder}
                        </div>
                      </div>
                      <div className="passbook__detail__col">
                        <div className="passbook__detail__col__left">IFSC</div>
                        <div className="passbook__detail__col__right">
                          {user.bank.ifsc_code}
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
                  </div> */}
                  <BankCard data={user?.bank} />
                  <div className="changeCard">
                    <Link to={"/bank-details"}>change &gt;</Link>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => navigate("/add-bank")}
                  className="bank-card"
                >
                  <i
                    style={{
                      color: "#fff",
                      fontSize: "35px",
                      backgroundColor: "#a39c9c47",
                      marginBottom: "1rem",
                      padding: "1.5rem",
                      borderRadius: "50%",
                    }}
                    className="fa-solid fa-building-columns"
                  ></i>
                  <p>Tab to add first account</p>
                </div>
              )}
            </div>
            <div className="withdrawal__amount__field">
              <div className="withdrawal__field__header">
                Withdrawal Amount{" "}
                <span style={{ fontSize: 12, fontWeight: "300" }}></span>
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
                  placeholder="150"
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
                <div className="withdrawal__input__notes__left">
                  Maximum: ₹398.48
                </div>
              </div>
              <div className="withdrawal__input__notes">
                <div className="withdrawal__input__notes__left">
                  Amount &gt;=₹1500,fee 2%
                </div>
                <div className="withdrawal__input__notes__left">
                  Minimum: ₹35
                </div>
              </div>
              <br />
              <button
                className={`withdraw__btn ${error && "recharge__btn_disabled"}`}
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
                <div
                  className="withdrawal__records__section__bottom__header"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>Withdrawal Records</div>
                  <div onClick={() => navigate("/withdraw-history")} style={{cursor: 'pointer'}}>
                    History
                  </div>
                </div>
                {history?.map((items) => {
                  const dateString = items.date;
                  const date = new Date(dateString);
                  const formattedDate = date.toLocaleDateString("en-GB"); // dd/mm/yyyy
                  const hours = date.getHours();
                  const minutes = date.getMinutes();
                  const formattedTime = `${hours}:${minutes}`;

                  return (
                    <div className="withdraw-history-card" key={items.id}>
                      <div className="top">
                        <div>
                          <p>Points</p>
                          <p>₹{items.amount}</p>
                        </div>

                        <div>
                          <p>Time</p>
                          <p>{formattedDate}</p>
                          <p>{formattedTime}</p>
                        </div>

                        <div>
                          <p>State</p>
                          <p style={{ color: "#c3c37b" }}>
                            {items.is_approved ? "Approved" : "Proccessing"}
                          </p>
                        </div>
                      </div>

                      <div style={{ borderBottom: "1px solid gray" }} />
                      <div className="middle">
                        <p>Actually Arrived: ₹{items.amount}</p>
                        <p>Fees: ₹0.0</p>
                      </div>

                      <div className="bottom">
                        <p>{items.user_id}</p>
                        <p>{items.request_id}</p>
                      </div>
                    </div>
                  );
                })}
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
