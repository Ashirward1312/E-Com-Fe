import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const CheckoutRoute = ({ children }) => {
   const { isAuthenticated, loading } = useContext(AuthContext);
   const location = useLocation();

   if (loading) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            Loading...
         </div>
      );
   }

   if (!isAuthenticated) {
      return (
         <Navigate
            to="/login"
            state={{ from: location.pathname }}
            replace
         />
      );
   }

   return children;
};

export default CheckoutRoute;