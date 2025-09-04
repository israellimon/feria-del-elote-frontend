import React from "react";
import Products from "../components/Products";
import Orders from "../components/Orders";

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a la Feria del Elote 🌽</h1>
      <Products />
      <Orders />
    </div>
  );
};

export default Home;
