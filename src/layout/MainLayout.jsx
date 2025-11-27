import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../auth/userContext";
import Sidebar from "../components/sidebar";
import { Navbar } from "../components";
import Footer from "../components/footer";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((s) => !s);
  const {user} = useUser();

  return (
    <>
    {
      user == null ? (<Navigate to="/login" replace />) : ( <div className="min-h-screen bg-gray-50">
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-0"} transition-all `}>
          {/* child routes will render here */}
          <Outlet />
        </main>
      </div>
      {/* <Footer /> */}
    </div>)
    }
   </>
  );
}

export default MainLayout