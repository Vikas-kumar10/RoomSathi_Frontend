import api from "./axios";

// Fetch admin dashboard statistics and recent rooms
export const getAdminDashboard = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

