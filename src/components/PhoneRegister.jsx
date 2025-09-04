// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import api from "../api/api";
// import { useNavigate } from "react-router-dom";


// const PhoneRegister = () => {
//   const [phone, setPhone] = useState("");
//   const { user, login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {        
//         console.log(phone)      
//       const res = await api.post("/auth/phone", { phone });
//       login({ ...user, phone }, localStorage.getItem("token"));
//       navigate("/");
//     } catch (error) {
//       console.error("Error registrando teléfono:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Registra tu número de celular</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Número de celular"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           required
//         />
//         <button type="submit">Guardar</button>
//       </form>
//     </div>
//   );
// };

// export default PhoneRegister;

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const PhoneRegister = () => {
  const [phone, setPhone] = useState("");
  const { user, login, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/phone", { phone });

      login({ ...user, phone }, token);

      navigate("/");
    } catch (error) {
      console.error("Error registrando teléfono:", error);
    }
  };

  return (
    <div>
      <h2>Registra tu número de celular</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Número de celular"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default PhoneRegister;
