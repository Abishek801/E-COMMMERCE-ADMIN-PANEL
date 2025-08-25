import React, { useState } from "react";
import { Routes, Route, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  Plus,
  User,
  LogOut,
  ChevronUp,
  Store,
} from "lucide-react";

// Import user components
import UserProductList from "../UserComponents/UserProductList.jsx";
import UserOrderList from "../UserComponents/UserOrderList.jsx";
import PlaceOrder from "../UserComponents/PlaceOrder.jsx";
import Profile from "../components/Profile.jsx";

const UserDashboard = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: "/user/products", icon: Package, label: "Browse Products", end: true },
    { to: "/user/orders", icon: ShoppingCart, label: "My Orders" },
    { to: "/user/place-order", icon: Plus, label: "Place Order" },
  ];

  const user = {
    name: localStorage.getItem("userName") || "Customer",
    email: localStorage.getItem("userEmail") || "customer@example.com",
    role: localStorage.getItem("userRole") || "USER",
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#12121b] text-white flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-[#1f1f2e] text-white shadow-md">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-md shadow-md">
              <Store className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-white">ShopEasy Dashboard</h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center space-x-1 text-sm font-medium transition-all px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                        : "text-gray-300 hover:bg-[#2d2d44] hover:text-white"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 bg-[#2d2d44] px-3 py-2 rounded-md hover:bg-[#393963]"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block text-sm text-white">{user.name}</span>
              <ChevronUp
                className={`h-4 w-4 text-gray-300 transition-transform duration-200 ${
                  showProfileMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-[#2d2d44] text-white shadow-lg rounded-md z-50 ring-1 ring-blue-700 ring-opacity-30">
                <button
                  onClick={() => {
                    navigate("/user/profile");
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#393963]"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </button>
                <hr className="my-1 border-gray-600" />
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#393963]"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-[#12121b] text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
        <Routes>
          <Route path="products" element={<UserProductList />} />
          <Route path="orders" element={<UserOrderList />} />
          <Route path="place-order" element={<PlaceOrder />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

export default UserDashboard;
