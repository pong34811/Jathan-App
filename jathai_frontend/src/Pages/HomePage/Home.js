import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import Welcome from "./ContenHome/Welcome";
import About from "./ContenHome/About";
import Service from "./ContenHome/Service";
import Technology from "./ContenHome/Technology";
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
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Home);
