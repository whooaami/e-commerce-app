import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetail from "./pages/ProductDetail"; 

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login/" element={<Login />} />
      <Route path="/register/" element={<Registration />} />
      <Route path="/category/:category_pk/products" element={<CategoryProducts />} />
      <Route path="/category/:category_pk/products/:pk" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;
