import api from "./axios";

// ==========================================
// Student Visits
// ==========================================

export const getStudentVisits = async () => {
  const response = await api.get("/visits/student");

  return response.data;
};

// ==========================================
// Owner Visits
// ==========================================

export const getOwnerVisits = async () => {
  const response = await api.get("/visits/owner");

  return response.data;
};

// ==========================================
// Admin - All Visits
// ==========================================

export const getAllVisits = async () => {
  const response = await api.get("/visits/admin");

  return response.data;
};

// ==========================================
// Single Visit
// ==========================================

export const getSingleVisit = async (visitId) => {
  const response = await api.get(
    `/visits/${visitId}`,
  );

  return response.data;
};

// ==========================================
// Update Visit Status
// ==========================================

export const updateVisitStatus = async (
  visitId,
  status,
) => {
  const response = await api.put(
    `/visits/${visitId}/status`,
    {
      status,
    },
  );

  return response.data;
};