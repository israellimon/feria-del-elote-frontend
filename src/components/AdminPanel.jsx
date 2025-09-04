import React, { useEffect, useState } from "react";
import api from "../api/api";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>Panel de administración</h2>
      <h3>Usuarios registrados</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} - {u.email} - Rol: {u.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
