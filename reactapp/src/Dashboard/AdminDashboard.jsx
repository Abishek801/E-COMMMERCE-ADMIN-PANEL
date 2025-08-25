import React, { useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import {
  Package,
  Plus,
  ShoppingCart,
  FileText,
  BarChart3,
  Store,
  User,
  LogOut,
  ChevronUp,
  Users,
} from "lucide-react";

// Import your actual components
import ProductList from "../components/ProductList.jsx";
import ProductForm from "../components/ProductForm.jsx";
import OrderList from "../components/OrderList.jsx";
import CreateOrder from "../components/CreateOrder.jsx";
import OrderDetails from "../components/OrderDetails.jsx";
import Analytics from "../components/Analytics.jsx";
import Profile from "../components/Profile.jsx";
import UserList from "../components/UserList.jsx";
import UserDetails from "../components/UserDetails.jsx";

const AdminDashboard = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: "/admin/products", icon: Package, label: "Products", end: true },
    { to: "/admin/products/new", icon: Plus, label: "Add Product" },
    { to: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { to: "/admin/orders/new", icon: FileText, label: "Create Order" },
    { to: "/admin/users", icon: Users, label: "Users" },
    { to: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  ];

  const user = {
    name: localStorage.getItem("userName") || "Admin User",
    email: localStorage.getItem("userEmail") || "admin@example.com",
    role: localStorage.getItem("userRole") || "ADMIN",
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-gray-900 text-white shadow-md">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-1 rounded-md shadow-md">
              <Store className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
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
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
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
              className="flex items-center space-x-2 hover:bg-gray-800 px-3 py-2 rounded-md"
            >
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block text-sm">{user.name}</span>
              <ChevronUp
                className={`h-4 w-4 transition-transform duration-200 ${
                  showProfileMenu ? "rotate-180" : ""
                }`}
              />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md z-50">
                <button
                  onClick={() => {
                    navigate("/admin/profile");
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </button>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
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
      <main className="flex-1 p-6">
        <Routes>
          {/* Products */}
          <Route path="products" element={<ProductList />} />
          <Route path="products/new" element={<ProductForm />} />

          {/* Orders */}
          <Route path="orders">
            <Route index element={<OrderList />} />
            <Route path=":id" element={<OrderDetails />} />
            <Route path="new" element={<CreateOrder />} />
          </Route>

          {/* Users */}
          <Route path="users">
            <Route index element={<UserList />} />
            <Route path=":id" element={<UserDetails />} />
          </Route>

          {/* Analytics */}
          <Route path="analytics" element={<Analytics />} />

          {/* Profile */}
          <Route path="profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
