import api from "./axios";

// Create Report
export const createReport = async (reportData) => {
  const response = await api.post("/reports", reportData);
  return response.data;
};

// Get Logged-in User Reports
export const getMyReports = async () => {
  const response = await api.get("/reports/my");
  return response.data;
};

// Get All Reports - Admin
export const getAllReports = async () => {
  const response = await api.get("/reports/admin");
  return response.data;
};

// Get Single Report
export const getSingleReport = async (reportId) => {
  const response = await api.get(`/reports/${reportId}`);
  return response.data;
};

// Update Report Status
export const updateReportStatus = async (reportId, status, adminNote = "") => {
  const response = await api.put(`/reports/${reportId}/status`, {
    status,
    adminNote,
  });

  return response.data;
};

// Delete Report
export const deleteReport = async (reportId) => {
  const response = await api.delete(`/reports/${reportId}`);
  return response.data;
};