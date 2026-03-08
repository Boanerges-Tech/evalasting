import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Menu from "./pages/Menu.jsx";
import About from "./pages/About.jsx";
import Product from "./pages/Product.jsx";
import Checkout from "./pages/Checkout.jsx";
import CheckoutPayment from "./pages/CheckoutPayment.jsx";
import CheckoutReview from "./pages/CheckoutReview.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Reservations from "./pages/Reservations.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/payment" element={<CheckoutPayment />} />
        <Route path="/checkout/review" element={<CheckoutReview />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/reservations" element={<Reservations />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);