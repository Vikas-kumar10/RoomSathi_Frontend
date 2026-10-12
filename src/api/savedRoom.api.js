import api from "./axios";

// Get logged-in student's saved rooms
export const getSavedRooms = async () => {
  const response = await api.get("/saved-rooms");

  return response.data;
};

// Save room
export const saveRoom = async (roomId) => {
  const response = await api.post(
    `/saved-rooms/${roomId}`
  );

  return response.data;
};

// Remove saved room
export const removeSavedRoom = async (roomId) => {
  const response = await api.delete(
    `/saved-rooms/${roomId}`
  );

  return response.data;
};

// Check saved room
export const checkSavedRoom = async (roomId) => {
  const response = await api.get(
    `/saved-rooms/check/${roomId}`
  );

  return response.data;
};