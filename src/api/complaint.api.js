import api from "./axios";

// Create Complaint
export const createComplaint = async (complaintData) => {
  const response = await api.post("/complaints", complaintData);
  return response.data;
};

// Get Logged-in User Complaints
export const getMyComplaints = async () => {
  const response = await api.get("/complaints/my");
  return response.data;
};

// Get All Complaints - Admin
export const getAllComplaints = async () => {
  const response = await api.get("/complaints/admin");
  return response.data;
};

// Get Single Complaint
export const getSingleComplaint = async (complaintId) => {
  const response = await api.get(`/complaints/${complaintId}`);
  return response.data;
};

// Update Complaint Status
export const updateComplaintStatus = async (
  complaintId,
  status,
  adminNote = ""
) => {
  const response = await api.put(`/complaints/${complaintId}/status`, {
    status,
    adminNote,
  });

  return response.data;
};

// Delete Complaint
export const deleteComplaint = async (complaintId) => {
  const response = await api.delete(`/complaints/${complaintId}`);
  return response.data;
};