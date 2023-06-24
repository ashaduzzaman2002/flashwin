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

import WheelComponent from './components/WheelComponent';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/test"
          element={
            <WheelComponent
              segments={['Segment 1', 'Segment 2', 'Segment 3', 'Segment 4', 'Segment 5', 'Segment 6', 'Segment 7', 'Segment 8', 'Segment 9', 'Segment 10']} // Replace with your own segments array
              segColors={['#f6aa32', '#ec463f', '#f6aa32', '#ec463f', '#f0cf50', '#815cd1', '#f0cf50', '#815cd1', '#3da5e0', '#4ca350']} // Replace with your own segColors array
              winningSegment="Segment 4"
              onFinished={(segment) =>
                console.log('Finished spinning:', segment)
              }
              primaryColor="black"
              contrastColor="white"
              buttonText="Spin"
              isOnlyOnce={true}
              size={290}
              upDuration={100}
              downDuration={1000}
              fontFamily="proxima-nova"
            />
          }
        />
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
