import React, { useContext, useEffect, useState } from 'react';
import './Follow.css';
import {telegram} from '../../assets'
import axios from 'axios';
import {baseURL} from '../../helper/constant'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

const Follow = () => {
  const [data, setData] = useState([])
  const getFollowLinks =  async () => {
    try {
      const {data} = await axios(`${baseURL}/more/support`)
      setData(data);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFollowLinks()
  }, [])

  return (
    <div className="container">
      <div className="follow-container">
        <Header title={'Follow Us'} path={'/profile'} />

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
