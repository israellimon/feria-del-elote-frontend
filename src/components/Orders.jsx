import React, { useState, useEffect } from "react";
import api from "../api/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>Mis pedidos</h2>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>Pedido #{o.id} - {o.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
