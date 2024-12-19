import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import './protectedRoute.css'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-190px)]">
                <div className="loader"></div>
            </div>

        )
    }
    if (user) {
        return children
    }
    return <Navigate to={'/sign-in'} state={location.pathname}></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.object
}

export default PrivateRoute;