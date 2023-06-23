import React from 'react';
import './UpdateProfile.css';
import HeaderSecondar from '../../../components/HeaderSecondar';
import { avatar } from '../../../assets';

const UpdateProfile = () => {
  return (
    <div className="container">
      <div className="update-profile-container">
        <div style={{width: '100%'}}>
          <h2>Update Profile</h2>

          <div className='profile-img'>
            <img src={avatar} alt="" />
          </div>

          <form action="">
            <div className='up-input-outer'>
              <label htmlFor="input1">Update Username</label>
              <input id='input1' type="text" placeholder="Enter name" />
            </div>

            <div className='up-input-outer'>
              <label htmlFor="input2">Update Password</label>
              <input id='input2' type="text" placeholder="Enter new password" />
            </div>
          </form>
        </div>

        <div style={{width: '100%'}}>
          <button className="btn">Update</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
