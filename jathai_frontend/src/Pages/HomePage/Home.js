import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import Welcome from "./ContenHome/Welcome";

function Home({  isAuthenticated }) {
  // ถ้า isAuthenticated เป็น true, redirect ไปยัง /dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
     <Welcome  />  {/* ใช้ Welcome component */}
    </>

  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Home);
