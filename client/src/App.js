import Feed from "./components/Feed";
import React, { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import SigninScreen from "./Screens/SigninScreen";
import HomeScreen from "./Screens/HomeScreen";
import StatusScreen from "./Screens/StatusScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import OpeningScreen from "./Screens/OpeningScreen";
import PrivateRoute from "./components/Routing/PrivateRoute";
import { Cookies } from "react-cookie";
import { logoutUser, loadUser } from "./redux/actions/auth";
import { useDispatch } from "react-redux";
import Widgets from "./components/Widgets";

function App() {
  const cookies = new Cookies();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cookies.get("_token")) {
      logoutUser();
    }
    dispatch(loadUser());
  }, []);

  const location = useLocation();
  // console.log(location);
  const qrs = location.search.split("?")[1];
  return (
    <div className='min-h-screen flex max-w-screen justify-center'>
      {location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/" && <SideBar />}

      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<SigninScreen />} />
        <Route path='/' element={<OpeningScreen />} />
        <Route
          path='/home'
          element={<PrivateRoute component={<HomeScreen />} />}
        />
        <Route
          path='/home/compose'
          element={<PrivateRoute component={<HomeScreen />} />}
        />
        <Route
          path='/:username'
          element={<PrivateRoute component={<ProfileScreen />} />}
        />
        <Route
          path='/:username/with_replies'
          element={<PrivateRoute component={<ProfileScreen />} />}
        />
        <Route
          path='/:username/media'
          element={<PrivateRoute component={<ProfileScreen />} />}
        />
        <Route
          path='/:username/likes'
          element={<PrivateRoute component={<ProfileScreen />} />}
        />
        <Route
          path='/:username/status/:tweetId'
          element={<PrivateRoute component={<StatusScreen />} />}
        />
      </Routes>
      {location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/" && <Widgets />}
    </div>
  );
}

export default App;
