import React from 'react';
import BottomNav from '../../components/bottomNav/BottomNav';
import './home.css';
import { Money, bomb, check, dice, fortuneWheel, reward, rocket, vault } from '../../assets';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{backgroundColor: '#08224e', minHeight: '100vh', marginBottom: '-30px', marginTop: '-2rem'}}>
    <div className="container">
      <BottomNav backgroundColor={'transparent'} />

      <div className="home-container">
        <div className="home-top">
          <h4 style={{paddingTop: '2rem'}}>Points</h4>

          <div className="home-top-item">
            <div>
              <p>
                INR <span>0.0</span>
              </p>
              <p>UID: 0</p>
            </div>

            <div className="home-profile"></div>
          </div>

          <div className="home-card1-group">
            <Card1 url='/withdraw' icon={Money} text="withdraw" />
            <Card1 url='/recharge' icon={vault} text="recharge" />
            <Card1 url='/check-in' icon={check} text="Check in" />
            <Card1 url={'/rewards'} icon={reward} text="Reward" />
          </div>

          <div className="home-card2-group">
            <Card2 url={'/game/minesweeper'} icon={bomb} text={"Minesweeper"} />
            <Card2 url={'/game/fortune-wheel'} icon={fortuneWheel} text={"Circle"} />
            <Card2 url={'/game/fast-parity'} icon={rocket} text={'Fast Parity'} />
            <Card2 url={'/game/full-parity'} icon={dice} text={"Parity"} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

const Card1 = ({ icon, text, url }) =>{ 
  const naivgate = useNavigate()
  return(
  <div onClick={() => naivgate(url)}>
    <img src={icon} alt="" />
    <p>{text}</p>
  </div>
);}

const Card2 = ({ icon, text, url  }) => {
  const navigate = useNavigate()
  return (
  <div onClick={() => navigate(url)} >
    <img src={icon} alt="" />
    <p>{text}</p>
  </div>
);}

export default Home;
