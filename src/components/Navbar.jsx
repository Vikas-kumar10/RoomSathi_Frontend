
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import PublicNavbar from "./NavbarComponent/PublicNavbar.jsx";
import StudentNavbar from "./NavbarComponent/StudentNavbar.jsx";
import OwnerNavbar from "./NavbarComponent/OwnerNavbar.jsx";

function Navbar() {
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid user data:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  // User is not logged in
  if (!user) {
    return <PublicNavbar />;
  }

  // Student
  if (user.role === "student") {
    return <StudentNavbar />;
  }

  // Owner
  if (user.role === "owner") {
    return <OwnerNavbar />;
  }

  // Fallback
  return <PublicNavbar />;
}

export default Navbar;
