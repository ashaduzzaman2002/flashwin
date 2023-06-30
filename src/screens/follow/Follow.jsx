import React, { useContext, useEffect, useState } from 'react';
import './Follow.css';
import {telegram} from '../../assets'
import axios from 'axios';
import {baseURL} from '../../helper/constant'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Follow = () => {
  const {name} = useContext(AuthContext)
  const [data, setData] = useState([])
  const getFollowLinks =  async () => {
    try {
      const {data} = await axios(`${baseURL}/more/support`)
      console.log(data);
      setData(data);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFollowLinks()
    console.log(name);
  }, [])

  return (
    <div className="container">
      <div className="follow-container">
        <h2>Follow Us</h2>

        <div className='follow-cards'>
          {
           <>
            <Card1 url = {data.telegram_channel} imgUrl = {telegram} title='Telegram Channel' />
            <Card1 url = {data.telegram_group} imgUrl = {telegram} title='Telegram Bot' />
            </>
          }
            
        </div>
      </div>
    </div>
  );
};


const Card1 = ({imgUrl, title, url}) => {
  const navigate = useNavigate()
  return (
    <a href={url} target='blank' className='follow-card'>
        <img src={imgUrl} alt="" />
        <h2>{title}</h2>
    </a>
)}

export default Follow;
