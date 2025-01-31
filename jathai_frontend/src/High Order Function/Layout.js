import { useEffect } from "react";
import Navbar from "../Component/navbar";
import Alert from "../Component/alert";
import { connect } from "react-redux";
import { verify, getUser, googleLogin } from "../reducer/Actions";
import { useLocation } from "react-router";
import queryString from "query-string";

const Layout = ({ message, googleLogin, verify, getUser, children }) => {
    let location = useLocation();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const code = values.code;
        if (code) {
            googleLogin(code);
        } else {
            verify();
            getUser();
        }
    }, [location, googleLogin, verify, getUser]);

    return (
        <div>
            <Navbar />
            {message ? <Alert message={message} /> : null}
            {children}
        </div>
    );
};

const mapStateToProps = (state) => ({
    message: state.AuthReducer.message,
    access: state.AuthReducer.access,
    refresh: state.AuthReducer.refresh,
    isAuthenticated: state.AuthReducer.isAuthenticated,
    user: state.AuthReducer.user
});

export default connect(mapStateToProps, { verify, getUser, googleLogin })(Layout);
