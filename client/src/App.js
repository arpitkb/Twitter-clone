import Feed from "./components/Feed";
import SideBar from "./components/SideBar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import SigninScreen from "./Screens/SigninScreen";
import HomeScreen from "./Screens/HomeScreen";

function App() {
  const location = useLocation();
  // console.log(location);
  return (
    <div className='b min-h-screen flex max-w-1500 mx-auto'>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <SideBar />
      )}
      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<SigninScreen />} />
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<HomeScreen />} />
      </Routes>
    </div>
  );
}

export default App;
