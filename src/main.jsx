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
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import Orders from "./pages/Orders.jsx";
import Addresses from "./pages/Addresses.jsx";
import PaymentMethods from "./pages/PaymentMethods.jsx";
import AccountSettings from "./pages/AccountSettings.jsx";
import Support from "./pages/support.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminRoute from "./components/admin/AdminRoute.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import AdminCustomers from "./pages/AdminCustomers.jsx";
import AdminAddProduct from "./pages/AdminAddProduct.jsx";
import AdminCatering from "./pages/AdminCatering.jsx";
import AdminSalesReport from "./pages/AdminSalesReport.jsx";
import AdminProducts from "./pages/AdminProducts"
import AdminSettings from "./pages/AdminSettings"
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
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
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>

<Route
path="/admin/settings"
element={
<AdminRoute>
<AdminSettings/>
</AdminRoute>
}
/>

<Route
  path="/Addresses"
  element={
    <ProtectedRoute>
      <Addresses />
    </ProtectedRoute>
  }
/>

<Route
path="/admin/reports"
element={
<AdminRoute>
<AdminSalesReport/>
</AdminRoute>
}
/>

<Route
path="/admin/products"
element={
<AdminRoute>
<AdminProducts/>
</AdminRoute>
}
/>
<Route
  path="/admin/orders"
  element={
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  }
/>

<Route
  path="/admin/add-product"
  element={
    <AdminRoute>
      <AdminAddProduct />
    </AdminRoute>
  }
/>
<Route
  path="/payment-methods"
  element={
    <ProtectedRoute>
      <PaymentMethods />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
<Route
  path="/admin/customers"
  element={
    <AdminRoute>
      <AdminCustomers />
    </AdminRoute>
  }
/>
<Route
  path="/account-settings"
  element={
    <ProtectedRoute>
      <AccountSettings />
    </ProtectedRoute>
  }
/>

<Route
  path="/support"
  element={
    <ProtectedRoute>
      <Support />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/catering"
  element={
    <AdminRoute>
      <AdminCatering />
    </AdminRoute>
  }
/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);