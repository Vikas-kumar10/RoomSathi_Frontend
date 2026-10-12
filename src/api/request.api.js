import api from "./axios";

// ==========================================
// Create Visit Request
// ==========================================

export const createVisitRequest = async (
  requestData
) => {
  const response = await api.post(
    "/requests",
    requestData
  );

  return response.data;
};

// ==========================================
// Get Student Requests
// ==========================================

export const getStudentRequests = async () => {
  const response = await api.get(
    "/requests/student"
  );

  return response.data;
};

// ==========================================
// Get Owner Requests
// ==========================================

export const getOwnerRequests = async () => {
  const response = await api.get(
    "/requests/owner"
  );

  return response.data;
};

// ==========================================
// Get All Requests - Admin
// ==========================================

export const getAllRequests = async () => {
  const response = await api.get(
    "/requests/admin"
  );

  return response.data;
};

// ==========================================
// Update Request Status
// ==========================================

export const updateRequestStatus = async (
  requestId,
  status
) => {
  const response = await api.put(
    `/requests/${requestId}/status`,
    {
      status,
    }
  );

  return response.data;
};

// ==========================================
// Delete Request
// ==========================================

export const deleteRequest = async (
  requestId
) => {
  const response = await api.delete(
    `/requests/${requestId}`
  );

  return response.data;
};