import React, { useContext, useEffect, useState } from 'react';
import BottomNav from '../../../components/bottomNav/BottomNav';
import { Bot, avatar } from '../../../assets';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import ConfirmModal from '../../../components/modal/ConfirmModal';
import { AuthContext } from '../../../context/AuthContext';
import { dbObject } from '../../../helper/constant';
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
  const [showModal, setShowModal] = useState(false)
  const {user,setUser} = useContext(AuthContext)
  let navigate = useNavigate();

  const logout = async () => {
    try {
  
        const {data} = await dbObject.post("auth/logout")
        console.log(data);
        
        toast.success('Logged Out!', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        setUser(null)
    } catch (error) {
      console.log(error);
    }
  }
  return (<>

    {
      showModal && <ConfirmModal confirmFunc={logout} setFunc={setShowModal} text1={'Are you sure you want to logout?'} text2='Do you really want to logout?' />
    }

    <div className="container">
      <BottomNav />

      <div className="profile-container">
        <div className="uid-card">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <img style={{ width: '25%' }} src={avatar} alt="" />
            <div className="uid-detail">
              <p>UID: {user?.id || '0000000'}</p>
              <p>Phone: {user?.number}</p>
            </div>
          </div>

          <Link to="/update-profile">Edit</Link>
        </div>

        <div className="user-details">
          <UserDetailsItem
            navigateUrl='/game-history'
            title={'Game History'}
            desc="View your recent game details"
            icon={'fa-solid fa-clock-rotate-left'}
          />
          <UserDetailsItem
            title={'Recent Transactions'}
            desc={'View your recent transactions'}
            icon={'fa-solid fa-wallet'}
            navigateUrl="/recent-transaction"
          />
          <UserDetailsItem
            navigateUrl='/bank-details'
            title={'Bank Details'}
            desc={'Update your bank details for easy withdrawals'}
            icon={'fa-solid fa-building-columns'}
          />

          <h3>Others</h3>
          <UserDetailsItem
            navigateUrl='/about-us'
            title={'About Us'}
            icon={'fa-solid fa-circle-info'}
          />

          <UserDetailsItem navigateUrl={'/follow-us'} title={'Follow Us'} icon={'fa-brands fa-telegram'} />

          <div className="user-details-item">
            <div
              onClick={() => setShowModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.4rem',
                color: '#ffcdd5',
              }}
            >
              <div className="icon" style={{ background: '#ffcdd5' }}>
                <i className={'fa-solid fa-arrow-right-from-bracket'}></i>
              </div>
              <div>
                <h2>Logout</h2>
              </div>
            </div>

            <i
              style={{ cursor: 'pointer' }}
              className="fa-solid fa-chevron-right"
            ></i>
          </div>
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
  </>
  );
};

const UserDetailsItem = ({ title, desc, icon, navigateUrl }) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(navigateUrl)} className="user-details-item">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
        <div className="icon">
          <i className={icon}></i>
        </div>

        <div>
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>
      </div>

      <i style={{ cursor: 'pointer' }} className="fa-solid fa-chevron-right"></i>
    </div>
  );
}

export default Profile;
