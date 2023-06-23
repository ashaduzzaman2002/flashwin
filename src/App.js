import { Route, Routes } from 'react-router-dom';
import {
  About,
  AddBank,
  BankDetails,
  CheckIn,
  FastParity,
  Follow,
  ForgotPass,
  FullParity,
  GameHistory,
  Home,
  Invite,
  Login,
  LuckyWheel,
  Minesweeper,
  Profile,
  Recharge,
  Register,
  Rewards,
  UpdateProfile,
  Withdraw,
} from './screens';

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
