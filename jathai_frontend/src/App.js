import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./Pages/Home";
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

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="change/password/" element={<ChangePassword />} />
            <Route path="reset/password/" element={<ResetPassword />} />
            <Route
              path="dj-rest-auth/registration/account-confirm-email/:key/"
              element={<EmailVerification />}
            />
            <Route
              path="reset/password/confirm/:uid/:token"
              element={<ResetPasswordConfirm />}
            />
            <Route path="/dashboard" element={<Boards />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
