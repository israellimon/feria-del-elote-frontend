import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Login from "./components/Login";
import PhoneRegister from "./components/PhoneRegister";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import AdminPanel from "./components/AdminPanel";
import Cart from "./components/Cart";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/phone-register" element={<PhoneRegister />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminPanel />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
