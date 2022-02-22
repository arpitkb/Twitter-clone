import Feed from "./components/Feed";
import SideBar from "./components/SideBar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import SigninScreen from "./Screens/SigninScreen";
import HomeScreen from "./Screens/HomeScreen";
import StatusScreen from "./Screens/StatusScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import OpeningScreen from "./Screens/OpeningScreen";

function App() {
  const location = useLocation();
  // console.log(location);
  const qrs = location.search.split("?")[1];
  return (
    <div className='b min-h-screen flex max-w-1500 mx-auto'>
      {location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/" && <SideBar />}

      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<SigninScreen />} />
        <Route path='/' element={<OpeningScreen />} />
        <Route path='/home' element={<HomeScreen />} />
        <Route path='/home/compose' element={<HomeScreen />} />
        <Route path='/:userId' element={<ProfileScreen />} />
        <Route path='/:userId/with_replies' element={<ProfileScreen />} />
        <Route path='/:userId/media' element={<ProfileScreen />} />
        <Route path='/:userId/likes' element={<ProfileScreen />} />
        <Route path='/:userId/status/:tweetId' element={<StatusScreen />} />
      </Routes>
    </div>
  );
}

export default App;
