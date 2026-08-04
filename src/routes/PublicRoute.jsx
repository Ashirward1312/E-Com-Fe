// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import AuthContext from "../context/AuthContext";

// const PublicRoute = ({ children }) => {

//    const { user, loading } = useContext(AuthContext);

//    if (loading) {
//       return <div>Loading...</div>;
//    }

//    if (user) {

//       if (user.is_staff || user.is_superuser) {
//          return <Navigate to="/admin" replace />;
//       }

//       return <Navigate to="/account" replace />;
//    }

//    return children;
// };

// export default PublicRoute;

import { useContext } from "react";
import {
   Navigate,
   useLocation,
} from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PublicRoute = ({ children }) => {

   const { user, loading } = useContext(AuthContext);

   const location = useLocation();

   if (loading) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            Loading...
         </div>
      );
   }

   if (user) {

      const redirectTo =
         location.state?.from ||
         (user.is_staff || user.is_superuser
            ? "/admin"
            : "/account");

      return (
         <Navigate
            to={redirectTo}
            replace
         />
      );
   }

   return children;
};

export default PublicRoute;