import React from 'react';
import '../styles/bottomNav.css';
import { Link } from 'react-router-dom';

const BottomNav = ({backgroundColor}) => {
  const { pathname } = window.location;
  return (
    <div className="container bottom-nav" style={{backgroundColor}}>
      <ul>
        <li className={`nav-link ${pathname === '/' ? 'active-link' : ''}`}>
          <Link to={'/'}>
            <i class="fa-solid fa-house"></i>
            <p>Home</p>
          </Link>
        </li>
        <li
          className={`nav-link ${pathname === '/invite' ? 'active-link' : ''}`}
        >
          <Link to={'/invite'}>
            <i class="fa-solid fa-people-line"></i>
            <p>Invite</p>
          </Link>
        </li>
        <li
          className={`nav-link ${
            pathname === '/recharge' ? 'active-link' : ''
          }`}
        >
          <Link to={'/recharge'}>
            <i class="fa-solid fa-bolt-lightning"></i>
            <p>Recharge</p>
          </Link>
        </li>
        <li
          className={`nav-link ${pathname === '/profile' ? 'active-link' : ''}`}
        >
          <Link to={'/profile'}>
            <i class="fa-solid fa-user"></i>
            <p>Profile</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BottomNav;
