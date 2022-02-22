import React, { useState } from "react";
import Feed from "../components/Feed";
import Modal from "../components/Modal";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import CreateTweetModal from "../components/CreateTweetModal";

const HomeScreen = () => {
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Feed />
      {location.pathname.split("/")[2] === "compose" && <CreateTweetModal />}
      {/* <Routes>
        <Route path='/compose' element={<CreateTweetModal />} />
      </Routes> */}
      {/* <Feed /> */}
    </>
  );
};

export default HomeScreen;
