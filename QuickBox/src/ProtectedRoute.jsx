import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {

    if (localStorage.getItem("isLoggedIn") !== "true") {
        return <Navigate to="/login" replace />;
    }
        
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !allowedRoles.includes(user.role)) {
        if (user.role === "Admin") {
            return <Navigate to="/admin" replace />;
        } else {
            return <Navigate to="/" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;