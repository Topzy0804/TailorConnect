import { AppProvider } from "./context";
import { TailorDashboard } from "./components/TailorDashboard";
import { Checkout } from "./components/Checkout";
import { Chat } from "./components/Chat";
import { CustomerDashboard } from "./components/CustomerDashboard";
import { TailorProfile } from "./components/TailorProfile";
import { BrowseTailors } from "./components/BrowseTailors";
import {Home} from "./components/Home";
import {Navbar} from "./components/Navbar";
import Login from "./auth/login";
import Register from "./auth/register";
import Footer from "./components/footer";


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseTailors />} />
          <Route path="/tailor/:id" element={<TailorProfile />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/tailor-dashboard" element={<TailorDashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
}

export default App;
