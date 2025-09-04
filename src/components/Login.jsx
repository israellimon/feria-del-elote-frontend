// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//     const navigate = useNavigate();    

//   const handleSuccess = async (credentialResponse) => {

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/google", {
//         token: credentialResponse.credential,
//       });

//       localStorage.setItem("token", res.data.token);
//       console.log("Usuario logueado:", res.data.user);
//       navigate("/phone-register");   
//     } catch (err) {
//       console.error("Error autenticando:", err);
//     }
//   };

//   return (
//     <div>
//       <h2>Inicia sesión con Google</h2>
//       <GoogleLogin
//         onSuccess={handleSuccess}
//         onError={() => console.log("Login fallido")}
//       />
//     </div>
//   );
// }

// export default Login;

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (user && user.phone) return navigate("/");

  if (user && !user.phone) return navigate("/phone-register");

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: credentialResponse.credential,
      });

      login(res.data.user, res.data.token);

      if (res.data.user.phone) {
        navigate("/");
      } else {
        navigate("/phone-register");
      }
    } catch (err) {
      console.error("Error autenticando:", err);
    }
  };

  return (
    <div>
      <h2>Inicia sesión con Google</h2>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login fallido")}
      />
    </div>
  );
}

export default Login;
