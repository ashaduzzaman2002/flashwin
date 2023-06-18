import React from 'react';

const OtherUsers = () => {
  return (
    <>
      <div className="lucky-wheel-btn-group">
        <button style={{ background: '#69efb0', color: 'black' }}>
          Other Players
        </button>
        <button>My Orders</button>
      </div>
      <div className="luckyWheel-others">
        <div>
          <p>Period</p>
          <small>18:54</small>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p>User</p>
          <small>****18787</small>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p>Select</p>
          <small>2x2</small>
        </div>

        <div style={{ textAlign: 'right' }}>
          <p>Point</p>
          <small>₹ 90</small>
        </div>
      </div>
    </>
  );
};

export default OtherUsers;
