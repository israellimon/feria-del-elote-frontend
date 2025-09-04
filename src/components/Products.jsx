import React, { useState, useEffect, useContext } from "react";
import api from "../api/api";
import { CartContext } from "../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const { addToCart, removeFromCart, getQuantity, cartItems, clearCart } = useContext(CartContext);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const payload = {
      items: cartItems.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    };

    try {
      await api.post("/orders", payload);
      clearCart();
      alert("Orden creada con éxito 🎉");
      setShowCartModal(false);
    } catch (err) {
      console.error("Error al crear orden", err);
      alert("Error al procesar la orden.");
    }
  };

  return (
    <div>
      {/* 🛒 Carrito en la parte superior */}
      <div className="cart-header">
        <button className="cart-icon-button" onClick={() => setShowCartModal(true)}>
          🛒 {cartItems.length > 0 && <span>({cartItems.length})</span>}
        </button>
      </div>

      <h2>Productos disponibles</h2>
      {products.map((p) => {
        const quantity = getQuantity(p.id);
        return (
          <div key={p.id} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <strong>{p.name}</strong> - ${p.price}
            <br />
            <img src={p.image_url} width="80" height="80" alt={p.name} />
            <br />
            <button onClick={() => removeFromCart(p.id)} disabled={quantity === 0}>
              -
            </button>
            <span style={{ margin: "0 10px" }}>{quantity}</span>
            <button onClick={() => addToCart(p, 1)}>+</button>
          </div>
        );
      })}

      {/* 🧊 Modal del carrito */}
      {showCartModal && (
        <div className="modal-overlay" onClick={() => setShowCartModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Botón (X) para cerrar */}
            <button className="modal-close" onClick={() => setShowCartModal(false)}>
              ×
            </button>

            <h3>Tu carrito</h3>

            {cartItems.length === 0 ? (
              <p>No hay productos.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.product.id} style={{ marginBottom: "10px" }}>
                    <strong>{item.product.name}</strong> - ${item.product.price} x {item.quantity}
                    <br />
                    Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                ))}
                <hr />
                <h4>Total: ${total.toFixed(2)}</h4>

                {/* Botón de confirmar centrado */}
                <div className="modal-actions">
                  <button className="confirm-btn" onClick={handleCheckout}>Confirmar compra</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Products;
