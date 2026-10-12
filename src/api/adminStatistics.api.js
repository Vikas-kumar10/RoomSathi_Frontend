import api from "./axios";

export const getPlatformStatistics = async () => {
  const response = await api.get("/admin/statistics");

  return response.data;
};