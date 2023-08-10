import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  About,
  AddBank,
  Agent,
  BankDetails,
  CheckIn,
  CommisionHistory,
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
  Privilege,
  Profile,
  Ranking,
  Recharge,
  Register,
  Rewards,
  UpdateProfile,
  Withdraw,
} from './screens';

import WheelComponent from './components/WheelComponent';
import RechargeHistory from './screens/recharge-history/RechargeHistory';
import WithdrawHistory from './screens/withdraw-history/WithdrawHistory';
import RecentTransaction from './screens/recent-transaction/RecentTransaction';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import Loading from './components/loading/Loading';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Redirect>
              <Home />
            </Redirect>
          }
        />
        <Route
          path="/invite"
          element={
            <Redirect>
              <Invite />
            </Redirect>
          }
        />
        <Route
          path="/profile"
          element={
            <Redirect>
              <Profile />
            </Redirect>
          }
        />
        <Route
          path="/recent-transaction"
          element={
            <Redirect>
              <RecentTransaction />
            </Redirect>
          }
        />
        <Route
          path="/update-profile"
          element={
            <Redirect>
              <UpdateProfile />
            </Redirect>
          }
        />
        <Route
          path="/game/fortune-wheel"
          element={
            <Redirect>
              <LuckyWheel />
            </Redirect>
          }
        />
        <Route
          path="/game/minesweeper"
          element={
            <Redirect>
              <Minesweeper />
            </Redirect>
          }
        />
        <Route
          path="/game/fast-parity"
          element={
            <Redirect>
              <FastParity />
            </Redirect>
          }
        />
        <Route
          path="/game/full-parity"
          element={
            <Redirect>
              <FullParity />
            </Redirect>
          }
        />
        <Route
          path="/withdraw"
          element={
            <Redirect>
              <Withdraw />
            </Redirect>
          }
        />
        <Route
          path="/withdraw-history"
          element={
            <Redirect>
              <WithdrawHistory />
            </Redirect>
          }
        />
        <Route
          path="/recharge"
          element={
            <Redirect>
              <Recharge />
            </Redirect>
          }
        />
        <Route
          path="/recharge-history"
          element={
            <Redirect>
              <RechargeHistory />
            </Redirect>
          }
        />
        <Route
          path="/rewards"
          element={
            <Redirect>
              <Rewards />
            </Redirect>
          }
        />
        <Route
          path="/check-in"
          element={
            <Redirect>
              <CheckIn />
            </Redirect>
          }
        />
        <Route
          path="/about-us"
          element={
            <Redirect>
              <About />
            </Redirect>
          }
        />
        <Route
          path="/follow-us"
          element={
            <Redirect>
              <Follow />
            </Redirect>
          }
        />
        <Route
          path="/bank-details"
          element={
            <Redirect>
              <BankDetails />
            </Redirect>
          }
        />
        <Route
          path="/add-bank"
          element={
            <Redirect>
              <AddBank />
            </Redirect>
          }
        />
        <Route
          path="/game-history"
          element={
            <Redirect>
              <GameHistory />
            </Redirect>
          }
        />
        <Route
          path="/agent"
          element={
            <Redirect>
              <Agent />
            </Redirect>
          }
        />
        <Route
          path="/privilege"
          element={
            <Redirect>
              <Privilege />
            </Redirect>
          }
        />
        <Route
          path="/ranking"
          element={
            <Redirect>
              <Ranking />
            </Redirect>
          }
        />
        <Route
          path="/commission-history"
          element={
            <Redirect>
              <CommisionHistory />
            </Redirect>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

const Redirect = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) return navigate('/login', { state: { from: location.pathname } });
  }, []);

  if (loading) return <Loading />;
  else return <>{children}</>;
  
};

export default App;
