import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AppProvider } from "./context";
import { TailorDashboard } from "./components/TailorDashboard";
import { Checkout } from "./components/Checkout";
// import { Chat } from "./components/Chat";
import { CustomerDashboard } from "./components/CustomerDashboard";
import { TailorProfile } from "./components/TailorProfile";
import { BrowseTailors } from "./components/BrowseTailors";
import { Home } from "./components/Home";
import Login from "./auth/login";
import Register from "./auth/register";
import Shop from "./components/Shop";
import HeritagePage from "./components/heritageModal.jsx";

import Cart from "./components/cart";
import  ProductDetail  from "./components/productDetail";

import TailorOrderDetails from "./components/tailorOrderDetails";

import { UserProvider } from "./auth/userContext";
import { CartProvider } from "./context/cartContext";

import Chat from "./components/Chat";
import { ChatInbox } from "./components/chatInbox";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import FooterWrapper from "./layout/footerWrapper";
import ProfileHeader from "./components/profile";
import OrderDetails from "./components/orderDetails";

function App() {
  return (
    <UserProvider>
      {/* <Router> */}
        <AppProvider>
        <CartProvider>
          <Routes>
            <Route element={<MainLayout />}>

            <Route path="/heritage" element={<HeritagePage />} />

              <Route path="/browse" element={<BrowseTailors />} />
              <Route path="/tailor/:id" element={<TailorProfile />} />
              <Route
                path="/customer-dashboard"
                element={<CustomerDashboard />}
              />
              <Route path="/tailor-dashboard" element={<TailorDashboard />} />
              <Route path="/tailor/order/:id" element={<TailorOrderDetails />} />
              <Route path="/profile" element={<ProfileHeader />} />
              <Route path="/chat/:recipientId" element={<Chat />} />
             
              <Route path="/messages" element={<ChatInbox />} />

              
              <Route element={<FooterWrapper />}>
            <Route path="/" element={<Home />} />
              {/* <Route path="/chat" element={<Chat />} /> */}
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/design/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order/:id" element={<OrderDetails />} />


              </Route>
            </Route>

            {/* auth routes without chrome */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </CartProvider> 
        </AppProvider>
      {/* </Router> */}
    </UserProvider>
  );
}

export default App;
