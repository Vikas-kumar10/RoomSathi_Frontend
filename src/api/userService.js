import api from "./axios";

export const getUsers = async (role) => {
  const response = await api.get(`/users?role=${role}`);
  return response.data;
};

export const updateUserStatus = async (userId, status) => {
  const response = await api.patch(`/users/${userId}/status`, {
    status,
  });

  return response.data;
};