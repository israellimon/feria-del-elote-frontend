import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError("El carrito está vacío.");
      return;
    }

    setLoading(true);
    setError("");

    const payload = {
      items: cartItems.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await api.post("/orders", payload);
      clearCart();
      alert("Orden creada con éxito 🎉");
      navigate("/"); // redirigir a home o a /orders si tienes esa ruta
    } catch (err) {
      console.error(err);
      setError("Error al procesar la orden.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Tu carrito</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.product.id} style={{ marginBottom: "10px" }}>
              <strong>{item.product.name}</strong> - ${item.product.price} x {item.quantity}
              <br />
              Subtotal: ${item.product.price * item.quantity}
              <br />
              <button onClick={() => removeFromCart(item.product.id)}>Eliminar</button>
            </div>
          ))}
          <hr />
          <h3>Total: ${total.toFixed(2)}</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={handleCheckout} disabled={loading}>
            {loading ? "Procesando..." : "Confirmar compra"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
