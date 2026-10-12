import api from "./axios";

// Get all conversations
export const getMyConversations = async () => {
  const response = await api.get("/conversations");

  return response.data;
};

// Create or get conversation
export const createOrGetConversation = async (
  roomId
) => {
  const response = await api.post(
    "/conversations",
    {
      roomId,
    }
  );

  return response.data;
};

// Get messages
export const getConversationMessages = async (
  conversationId
) => {
  const response = await api.get(
    `/messages/${conversationId}`
  );

  return response.data;
};

// Send message
export const sendMessage = async (
  conversationId,
  text
) => {
  const response = await api.post(
    "/messages",
    {
      conversationId,
      text,
    }
  );

  return response.data;
};