import { Outlet } from "react-router-dom";
import OwnerNavbar from "../components/NavbarComponent/OwnerNavbar";
import Footer from "../components/Footer";

function OwnerLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <OwnerNavbar />

      <Outlet />
       <Footer />
    </div>
  );
}

export default OwnerLayout;