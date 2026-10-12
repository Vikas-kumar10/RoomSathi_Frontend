import api from "./axios";

export const getOwnerDashboardStats = async () => {
  const response = await api.get("/owner/dashboard/stats");
  return response.data;
};