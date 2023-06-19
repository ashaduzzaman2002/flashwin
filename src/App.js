import { Route, Routes } from 'react-router-dom';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Home from './screens/Home';
import Invite from './screens/Invite';
import Profile from './screens/Profile';
import LuckyWheel from './screens/LuckyWheel';
import ForgotPass from './screens/auth/ForgotPass';
import Withdraw from './screens/Withdraw';
import Recharge from './screens/Recharge';
import CheckIn from './screens/CheckIn';
import Rewards from './screens/Rewards';
import Minesweeper from './screens/Minesweeper';
import UpdateProfile from './screens/UpdateProfile';
import About from './screens/About';
import Follow from './screens/Follow';
import BankDetails from './screens/BankDetails';
import AddBank from './screens/AddBank';
import GameHistory from './screens/GameHistory';
import FastParity from './screens/parity/FastParity';
import FullParity from './screens/parity/FullParity';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/game/fortune-wheel" element={<LuckyWheel />} />
        <Route path="/game/minesweeper" element={<Minesweeper />} />
        <Route path="/game/fast-parity" element={<FastParity />} />
        <Route path="/game/full-parity" element={<FullParity />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/follow-us" element={<Follow />} />
        <Route path="/bank-details" element={<BankDetails />} />
        <Route path="/add-bank" element={<AddBank />} />
        <Route path="/game-history" element={<GameHistory />} />


        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
