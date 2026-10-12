import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout.jsx";
import StudentLayout from "./layouts/StudentLayout.jsx";
import OwnerLayout from "./layouts/OwnerLayout.jsx";


// Public Pages
import Home from "./pages/Home.jsx";
import RegisterPage from "./pages/registerpage.jsx";
import LoginPage from "./pages/loginpage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import FindRooms from "./pages/FindRooms.jsx";
import RoomDetails from "./pages/student/RoomDetails.jsx";
import ReportPage from "./pages/ReportPage.jsx";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import MyRequests from "./pages/student/MyRequests.jsx";
import SavedRooms from "./pages/student/SavedRooms.jsx";
import StudentMessages from "./pages/student/Messages.jsx";
import StudentProfile from "./pages/student/StudentProfile.jsx";

// Owner Pages
import OwnerDashboard from "./pages/owner/OwnerDashboard.jsx";
import MyRooms from "./pages/owner/MyRooms.jsx";
import AddRoom from "./pages/owner/AddRoom.jsx";
import Requests from "./pages/owner/Requests.jsx";
import Visits from "./pages/owner/Visits.jsx";
import OwnerMessages from "./pages/student/Messages.jsx";
import OwnerProfile from "./pages/owner/OwnerProfile.jsx";
import EditRoom from "./pages/owner/EditRoom.jsx";
import ViewRoom from "./pages/owner/ViewRoom.jsx";
import OwnerBlocked from "./pages/owner/OwnerBlocked.jsx";

// Admin page
import AdminRoutes from "./admin/admin.routes.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* ================= PUBLIC ROUTES ================= */}

        <Route element={<MainLayout />}>
        
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/rooms" element={<FindRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/report/:roomId" element={<ReportPage />} />
        </Route>

        {/* ================= STUDENT ROUTES ================= */}

        <Route element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />

          <Route path="/student/requests" element={<MyRequests />} />

          <Route path="/student/saved-rooms" element={<SavedRooms />} />

          <Route path="/student/messages" element={<StudentMessages />} />
          <Route path="/student/profile" element={<StudentProfile />} />
        </Route>

        {/* ================= OWNER ROUTES ================= */}

        <Route element={<OwnerLayout />}>
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />

          <Route path="/owner/my-rooms" element={<MyRooms />} />

          <Route path="/owner/add-room" element={<AddRoom />} />

          <Route path="/owner/requests" element={<Requests />} />

          <Route path="/owner/visits" element={<Visits />} />
          <Route path="/owner/messages" element={<OwnerMessages />} />
          <Route path="/owner/profile" element={<OwnerProfile />} />
          <Route path="/owner/edit-room/:id" element={<EditRoom />} />
          <Route path="/owner/rooms/:id" element={<ViewRoom />} />
          <Route path="/owner/blocked" element={<OwnerBlocked />} />
        </Route>

        {/* ================= Admin ROUTES ================= */}
        <Route path="/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
