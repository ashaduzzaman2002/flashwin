import { Route, Routes } from 'react-router-dom';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Home from './screens/Home';
import Invite from './screens/Invite';
import Profile from './screens/Profile';
import LuckyWheel from './screens/LuckyWheel';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="profile" element={<Profile />} />
        <Route path="try-luck" element={<LuckyWheel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
