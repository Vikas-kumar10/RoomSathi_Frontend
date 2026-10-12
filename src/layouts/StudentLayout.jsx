import { Outlet } from "react-router-dom";
import StudentNavbar from "../components/NavbarComponent/StudentNavbar";

function StudentLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <StudentNavbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;