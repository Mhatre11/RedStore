import React from "react";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Navbar from "./components/pages/Navbar";
import Products from "./components/pages/Products";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Cart from "./components/pages/Cart";

function App() {
  return (
    <>
      <div className="App">
        <Router>
        <Navbar />
        <Routes>
          <Route path="/products" element={<Products/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/cart" element={<Cart/>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
