import React from 'react';
import BottomNav from '../components/BottomNav';
import { Bot } from '../assets';
import { Link } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  return (
    <div className="container">
      <BottomNav />

      <div className="profile-container">
        <div className="uid-card">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <img src={Bot} alt="" />
            <div className="uid-detail">
              <p>UID: 43</p>
              <p>Phone: 9382756748</p>
            </div>
          </div>

          <Link to="/edit">Edit</Link>
        </div>

        <div className="user-details">
          <UserDetailsItem
            title={'Game History'}
            desc="View your recent game details"
            icon={'fa-solid fa-clock-rotate-left'}
          />
          <UserDetailsItem
            title={'Recent Transactions'}
            desc={'View your recent transactions'}
            icon={'fa-solid fa-wallet'}
          />
          <UserDetailsItem
            title={'Bank Details'}
            desc={'Update your bank details for easy withdrawals'}
            icon={'fa-solid fa-building-columns'}
          />

          <h3>Others</h3>
          <UserDetailsItem
            title={'About Us'}
            icon={'fa-solid fa-circle-info'}
          />
          <UserDetailsItem title={'Support'} icon={'fa-solid fa-headset'} />
          <UserDetailsItem title={'Follow Us'} icon={'fa-brands fa-telegram'} />

          <div className="user-details-item">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.4rem',
                color: '#ffcdd5',
              }}
            >
              <div className="icon" style={{ background: '#ffcdd5' }}>
                <i class={'fa-solid fa-arrow-right-from-bracket'}></i>
              </div>
              <div>
                <h2>Logout</h2>
              </div>
            </div>

            <i
              style={{ cursor: 'pointer' }}
              class="fa-solid fa-chevron-right"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserDetailsItem = ({ title, desc, icon }) => (
  <div className="user-details-item">
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
      <div className="icon">
        <i class={icon}></i>
      </div>

      <div>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
    </div>

    <i style={{ cursor: 'pointer' }} class="fa-solid fa-chevron-right"></i>
  </div>
);

export default Profile;
