import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import Welcome from "./ContenHome/Welcome";
import About from "./ContenHome/About";
import Service from "./ContenHome/Service";
import Technology from "./ContenHome/Technology";
import TimeLine from "./ContenHome/TimeLine";

import Footer from "../../Component/Footer";


function Home({ isAuthenticated }) {
  // ถ้า isAuthenticated เป็น true, redirect ไปยัง /dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Welcome />
      <About />
      <div className="container-fluid bg-light">
        <Service />
      </div>
      <Technology />
      <div className="container-fluid bg-light">
        <TimeLine />
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Home);
