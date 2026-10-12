// import { Routes, Route } from "react-router-dom";

// import AdminLayout from "./AdminLayout";

// import AdminDashboard from "./pages/AdminDashboard";
// import ManageStudents from "./pages/ManageStudents";
// import ManageOwners from "./pages/ManageOwners";
// import ManageRooms from "./pages/ManageRooms";
// import ManageRequests from "./pages/ManageRequests";
// import ManageVisits from "./pages/ManageVisits";
// import ManageReports from "./pages/ManageReports";
// import ManageComplaints from "./pages/ManageComplaints";
// import PlatformStatistics from "./pages/PlatformStatistics";
// import AdminRoomDetails from "./pages/AdminRoomDetails";

// function AdminRoutes() {
//   return (
//     <Routes>
//       <Route path="/admin" element={<AdminLayout />}>
//         <Route index element={<AdminDashboard />} />

//         <Route path="students" element={<ManageStudents />} />

//         <Route path="owners" element={<ManageOwners />} />

//         <Route path="rooms" element={<ManageRooms />} />

//         <Route path="requests" element={<ManageRequests />} />

//         <Route path="visits" element={<ManageVisits />} />

//         <Route path="reports" element={<ManageReports />} />

//         <Route path="complaints" element={<ManageComplaints />} />

//         <Route path="statistics" element={<PlatformStatistics />} />

//         <Route path="/admin/rooms/:roomId" element={<AdminRoomDetails />} />
//       </Route>
//     </Routes>
//   );
// }

// export default AdminRoutes;




import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./AdminLayout";
import AdminLogin from "./pages/AdminLogin";

import AdminDashboard from "./pages/AdminDashboard";
import ManageStudents from "./pages/ManageStudents";
import ManageOwners from "./pages/ManageOwners";
import ManageRooms from "./pages/ManageRooms";
import ManageRequests from "./pages/ManageRequests";
import ManageVisits from "./pages/ManageVisits";
import ManageReports from "./pages/ManageReports";
import ManageComplaints from "./pages/ManageComplaints";
import PlatformStatistics from "./pages/PlatformStatistics";
import AdminRoomDetails from "./pages/AdminRoomDetails";

function RequireAdmin({ children }) {
  const isLoggedIn =
    sessionStorage.getItem("roomsaathiAdminLoggedIn") === "true";

  return isLoggedIn ? children : <Navigate to="/admin/login" replace />;
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<ManageStudents />} />
        <Route path="owners" element={<ManageOwners />} />
        <Route path="rooms" element={<ManageRooms />} />
        <Route path="rooms/:roomId" element={<AdminRoomDetails />} />
        <Route path="requests" element={<ManageRequests />} />
        <Route path="visits" element={<ManageVisits />} />
        <Route path="reports" element={<ManageReports />} />
        <Route path="complaints" element={<ManageComplaints />} />
        <Route path="statistics" element={<PlatformStatistics />} />
      </Route>

      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}

export default AdminRoutes;
