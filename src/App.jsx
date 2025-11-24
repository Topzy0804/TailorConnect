import { AppProvider } from "./context";
import { TailorDashboard } from "./components/TailorDashboard";
import { Checkout } from "./components/Checkout";
import { Chat } from "./components/Chat";
import { CustomerDashboard } from "./components/CustomerDashboard";
import { TailorProfile } from "./components/TailorProfile";
import { BrowseTailors } from "./components/BrowseTailors";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Login from "./auth/login";
import Register from "./auth/register";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { UserProvider } from "./auth/userContext";
import { useState } from "react";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((s) => !s);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="flex-1">
          {/* child routes will render here */}
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

function AuthLayout() {
  // simple layout for auth pages (no navbar / sidebar)
  return <Outlet />;
}

function AppContent() {
  return (
    <Routes>
      {/* main app routes with chrome */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowseTailors />} />
        <Route path="/tailor/:id" element={<TailorProfile />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/tailor-dashboard" element={<TailorDashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      {/* auth routes without chrome */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <UserProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
