import React from 'react';

const HeaderSecondar = ({ title }) => {
  return (
    <div className="header-secondary">
      <h1>{title}</h1>

      <div className='header-secondary-card'>
        <div>
          <p>Total Blance Available</p>
          <p>₹ 0.0</p>
        </div>

        <button>
          <i className="fa-solid fa-clock-rotate-left"></i> History
        </button>
      </div>
    </div>
  );
};

export default HeaderSecondar;
