import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AppProvider } from "./context";
import { TailorDashboard } from "./components/TailorDashboard";
import { Checkout } from "./components/Checkout";
import { Chat } from "./components/Chat";
import { CustomerDashboard } from "./components/CustomerDashboard";
import { TailorProfile } from "./components/TailorProfile";
import { BrowseTailors } from "./components/BrowseTailors";
import { Home } from "./components/Home";
import Login from "./auth/login";
import Register from "./auth/register";

import { UserProvider } from "./auth/userContext";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";

function App() {
  return (
    <UserProvider>
      <Router>
        <AppProvider>
          <Routes>
            {/* main app routes with chrome */}
            <Route path="/" element={<Home />} />
            <Route element={<MainLayout />}>
              <Route path="/browse" element={<BrowseTailors />} />
              <Route path="/tailor/:id" element={<TailorProfile />} />
              <Route
                path="/customer-dashboard"
                element={<CustomerDashboard />}
              />
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
        </AppProvider>
      </Router>
    </UserProvider>
  );
}

export default App;
