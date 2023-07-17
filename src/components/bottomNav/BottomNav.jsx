import React from 'react';
import './bottomNav.css';
import { Link } from 'react-router-dom';

const BottomNav = () => {
  const { pathname } = window.location;
  return (
    <div className="bottom-nav">
      <ul className='container'>
        <li className={`nav-link ${pathname === '/' ? 'active-link' : ''}`}>
          <Link to={'/'}>
            <i className="fa-solid fa-house"></i>
            <p>Home</p>
          </Link>
        </li>
        <li
          className={`nav-link ${pathname === '/invite' ? 'active-link' : ''}`}
        >
          <Link to={'/invite'}>
            <i className="fa-solid fa-people-line"></i>
            <p>Invite</p>
          </Link>
        </li>
        <li
          className={`nav-link ${
            pathname === '/recharge' ? 'active-link' : ''
          }`}
        >
          <Link to={'/recharge'}>
            <i className="fa-solid fa-bolt-lightning"></i>
            <p>Recharge</p>
          </Link>
        </li>
        <li
          className={`nav-link ${pathname === '/profile' ? 'active-link' : ''}`}
        >
          <Link to={'/profile'}>
            <i className="fa-solid fa-user"></i>
            <p>Profile</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BottomNav;
