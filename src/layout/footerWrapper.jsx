import { Outlet } from "react-router-dom";
import Footer from "../components/footer";

function FooterWrapper() {
  return (
    <>
      {/* Renders the actual page content (Home, Shop, Cart, etc.) */}
      <Outlet /> 
      {/* Appends the Footer to the bottom of the page */}
      <Footer /> 
    </>
  );
}

export default FooterWrapper;