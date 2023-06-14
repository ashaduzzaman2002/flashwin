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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/game/fortune-wheel" element={<LuckyWheel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/check-in" element={<CheckIn />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
