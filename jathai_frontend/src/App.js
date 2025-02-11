import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./Pages/HomePage/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ChangePassword from "./Pages/ChangePassword";
import ResetPassword from "./Pages/ResetPassword";
import ResetPasswordConfirm from "./Pages/ResetPasswordConfirm";
import EmailVerification from "./Pages/EmailVerification";
import Layout from "./High Order Function/Layout";
import "./css/main.css";
import { Provider } from "react-redux";
import Store from "./Store";
import Boards from "./Pages/Dashboards/Pages";
import ListPages from "./Pages/Dashboards/Boards/Lists/ListPages";
import Docs from "./Pages/Docs";
import Settings from "./Pages/Settings/Settings";

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Routes>
          {/* Routes ที่มี Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="login/" element={<Layout><Login /></Layout>} />
          <Route path="signup/" element={<Layout><Signup /></Layout>} />
          <Route path="change/password/" element={<Layout><ChangePassword /></Layout>} />
          <Route path="reset/password/" element={<Layout><ResetPassword /></Layout>} />
          <Route path="dj-rest-auth/registration/account-confirm-email/:key/" element={<Layout><EmailVerification /></Layout>} />
          <Route path="reset/password/confirm/:uid/:token" element={<Layout><ResetPasswordConfirm /></Layout>} />
          <Route path="/dashboard" element={<Layout><Boards /></Layout>} />
          <Route path="docs/" element={<Layout><Docs /></Layout>} />
          <Route path="settings/" element={<Layout><Settings /></Layout>} />
          {/* Route สำหรับ /list โดยไม่ใช้ Layout */}
          <Route path="/lists/:boardId" element={<ListPages />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
