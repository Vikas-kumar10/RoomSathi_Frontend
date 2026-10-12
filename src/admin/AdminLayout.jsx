import { Outlet } from "react-router-dom";

import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="min-h-screen lg:ml-64">
        <AdminHeader />

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;