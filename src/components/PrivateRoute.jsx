// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const PrivateRoute = ({ children, requirePhone = true }) => {
//   const { user, token } = useContext(AuthContext);

//   if (!user || !token) {
//     return <Navigate to="/login" replace />;
//   }

//   if (requirePhone && !user.phone) {
//     return <Navigate to="/phone-register" replace />;
//   }

//   return children;
// };

// export default PrivateRoute;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, requirePhone = true }) => {
  const { user, token, loading } = useContext(AuthContext);

  if (loading) return <div>Cargando...</div>;

  if (!user || !token) return <Navigate to="/login" replace />;

  if (requirePhone && !user.phone) return <Navigate to="/phone-register" replace />;

  return children;
};

export default PrivateRoute;
