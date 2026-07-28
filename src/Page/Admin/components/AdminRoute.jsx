import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

const AdminRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!user || !user.is_staff) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;