import React, { useContext, useEffect, useState } from 'react';
import BottomNav from '../../../components/bottomNav/BottomNav';
import { Bot, avatar } from '../../../assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Profile.css';
import ConfirmModal from '../../../components/modal/ConfirmModal';
import { AuthContext } from '../../../context/AuthContext';
import { dbObject } from '../../../helper/constant';
import { ToastContainer, toast } from 'react-toastify';
import { Toast } from '../../../helper';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  let navigate = useNavigate();

  const logout = async () => {
    try {
      await dbObject.post('auth/logout');


      Toast('Logged Out!', '')

      setTimeout(() => {
        navigate('/login');
      }, 1000);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {showModal && (
        <ConfirmModal
          confirmFunc={logout}
          setFunc={setShowModal}
          text1={'Are you sure you want to logout?'}
          text2="Do you really want to logout?"
        />
      )}

      <div className="container">
        <BottomNav />

        <div className="App">
          <div className="app__responsive">
            <div>
              {/* Top Navbar */}
              <div className="app__top__nav">
                <div className="top__nav__cols">
                  <div className="top__nav__back__btn" onClick={() => navigate('/')}>
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
                <div className="top__nav__cols">
                  <center>
                    <div className="top__nav__title">Profile</div>
                  </center>
                </div>
                <div className="top__nav__cols"></div>
              </div>

              {/* User details */}
              <div className="user__details__section">
                <div className="user__pic">
                  <img
                    src="data:image/png;base64,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"
                    height="100%"
                    alt=""
                  />
                </div>
                <div className="user__details__section__right">
                  <div className="user__details__section__right__col">
                    <b>ID: 0QLSRILB</b>
                  </div>
                  <div className="user__details__section__right__col">
                    Phone: 7256820024
                  </div>
                  <div className="user__details__section__right__col">Name: </div>
                </div>
              </div>
              <div style={{height: 20, backgroundColor: '#0a2134ad'}}>

</div>
              

              {/* Game history */}
              <div className="profile__records__section">
                <div className="profile__records__section__col" onClick={() => navigate('/game-history')}>
                  <div className="profile__records__section__col__left">
                    <div className="profile__record__section__col__icon">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M15.5 11.5c0 2-2.5 3.5-2.5 5h-2c0-1.5-2.5-3-2.5-5C8.5 9.57 10.07 8 12 8s3.5 1.57 3.5 3.5zm-2.5 6h-2V19h2v-1.5zm9-5.5c0-2.76-1.12-5.26-2.93-7.07l-1.06 1.06A8.481 8.481 0 0120.5 12c0 2.34-.95 4.47-2.49 6.01l1.06 1.06A9.969 9.969 0 0022 12zM3.5 12c0-2.34.95-4.47 2.49-6.01L4.93 4.93A9.969 9.969 0 002 12c0 2.76 1.12 5.26 2.93 7.07l1.06-1.06A8.481 8.481 0 013.5 12zm14 0c0 1.52-.62 2.89-1.61 3.89l1.06 1.06A6.976 6.976 0 0019 12c0-1.93-.78-3.68-2.05-4.95l-1.06 1.06c.99 1 1.61 2.37 1.61 3.89zM7.05 16.95l1.06-1.06c-1-1-1.61-2.37-1.61-3.89s.62-2.89 1.61-3.89L7.05 7.05A6.976 6.976 0 005 12c0 1.93.78 3.68 2.05 4.95z"></path>
                      </svg>
                    </div>
                    <div className="profile__record__section__col__name">
                      Game History
                    </div>
                  </div>
                  <div className="profile__records__section__col__right">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
                    </svg>
                  </div>
                </div>

                {/* Recent Transaction */}
                <div className="profile__records__section__col" style={{ marginTop: 20 }} onClick={() => navigate('/recent-transaction')}>
                  <div className="profile__records__section__col__left">
                    <div className="profile__record__section__col__icon">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                      </svg>
                    </div>
                    <div className="profile__record__section__col__name">
                      Recent Transaction
                    </div>
                  </div>
                  

                  <div className="profile__records__section__col__right">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
                    </svg>
                  </div>

                </div>
              </div>

              <div style={{height: 20, backgroundColor: '#0a2134ad', marginTop: '20px'}}>
              </div>


              <div className="profile__records__section">
                {/* Follow us */}
                <div className="profile__records__section__col" onClick={() => navigate('/follow-us')}>
                  <div className="profile__records__section__col__left">
                    <div className="profile__record__section__col__icon">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 448 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path>
                      </svg>
                    </div>
                    <div className="profile__record__section__col__name">
                      Follow Us
                    </div>
                  </div>
                  <div className="profile__records__section__col__right">
                    <div>Happy Rupees</div>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Sign out */}
              <div className="profile__records__section">
                <div className="profile__records__section__col" onClick={() => setShowModal(true)}>
                  <div className="profile__records__section__col__left">
                    <div className="profile__record__section__col__icon">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                    </div>
                    <div className="profile__record__section__col__name">
                      Sign Out
                    </div>
                  </div>
                  <div className="profile__records__section__col__right">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="toastContainer top-center"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Profile;
