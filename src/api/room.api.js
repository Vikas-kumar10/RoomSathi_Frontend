// import api from "./axios";

// // Add Room
// export const addRoom = async (roomData) => {
//   const response = await api.post("/rooms", roomData);

//   return response.data;
// };

// // Get All Rooms
// export const getAllRooms = async () => {
//   const response = await api.get("/rooms");

//   return response.data;
// };

// // seperate owner data fetch
// export const getMyRooms = async () => {
//   const response = await api.get("/rooms/my-rooms");
//   return response.data;
// };

// // Get Single Room
// export const getSingleRoom = async (roomId) => {
//   const response = await api.get(`/rooms/${roomId}`);

//   return response.data;
// };

// // Update Room
// // export const updateRoom = async (roomId, roomData) => {
// //   const response = await api.put(
// //     `/rooms/${roomId}`,
// //     roomData
// //   );

// //   return response.data;
// // };


// export const updateRoom = async (roomId, roomData) => {
//   const response = await api.put(`/rooms/${roomId}`, roomData);
//   return response.data;
// };

 

// // Delete Room
// export const deleteRoom = async (roomId) => {
//   const response = await api.delete(
//     `/rooms/${roomId}`
//   );

//   return response.data;
// };



// // Existing functions...

// export const getAdminRooms = async () => {
//   const response = await api.get("/rooms/admin");

//   return response.data;
// };

// export const updateRoomApprovalStatus = async (
//   roomId,
//   approvalStatus
// ) => {
//   const response = await api.patch(
//     `/rooms/admin/${roomId}/approval`,
//     {
//       approvalStatus,
//     }
//   );

//   return response.data;
// };

// export const deleteAdminRoom = async (roomId) => {
//   const response = await api.delete(
//     `/rooms/admin/${roomId}`
//   );

//   return response.data;
// };




import api from "./axios";

// Add Room
export const addRoom = async (roomData) => {
  const response = await api.post("/api/rooms", roomData);
  return response.data;
};

// Get All Rooms
export const getAllRooms = async () => {
  const response = await api.get("/api/rooms");
  return response.data;
};

// Get Owner's Rooms
export const getMyRooms = async () => {
  const response = await api.get("/api/rooms/my-rooms");
  return response.data;
};

// Get Single Room
export const getSingleRoom = async (roomId) => {
  const response = await api.get(`/api/rooms/${roomId}`);
  return response.data;
};

// Update Room
export const updateRoom = async (roomId, roomData) => {
  const response = await api.put(
    `/api/rooms/${roomId}`,
    roomData
  );
  return response.data;
};

// Delete Room
export const deleteRoom = async (roomId) => {
  const response = await api.delete(`/api/rooms/${roomId}`);
  return response.data;
};

// Get All Admin Rooms
export const getAdminRooms = async () => {
  const response = await api.get("/api/rooms/admin");
  return response.data;
};

// Update Room Approval Status
export const updateRoomApprovalStatus = async (
  roomId,
  approvalStatus
) => {
  const response = await api.patch(
    `/api/rooms/admin/${roomId}/approval`,
    { approvalStatus }
  );
  return response.data;
};

// Delete Admin Room
export const deleteAdminRoom = async (roomId) => {
  const response = await api.delete(
    `/api/rooms/admin/${roomId}`
  );
  return response.data;
};
