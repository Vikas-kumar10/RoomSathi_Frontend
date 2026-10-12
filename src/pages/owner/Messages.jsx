import { useEffect, useState } from "react";
import {
  Search,
  Send,
  Phone,
  MoreVertical,
  Paperclip,
  Smile,
  CheckCheck,
} from "lucide-react";

import {
  getMyConversations,
  getConversationMessages,
  sendMessage,
} from "../../api/messageService";

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [messageLoading, setMessageLoading] =
    useState(false);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // =========================
  // GET CONVERSATIONS
  // =========================

  const fetchConversations = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getMyConversations();

      const data =
        response?.conversations || [];

      setConversations(data);

      if (data.length > 0) {
        setSelected(data[0]);
      }
    } catch (error) {
      console.error(
        "Failed to fetch conversations:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load conversations."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  // =========================
  // GET MESSAGES
  // =========================

  const fetchMessages = async (
    conversationId
  ) => {
    try {
      setMessageLoading(true);

      const response =
        await getConversationMessages(
          conversationId
        );

      setMessages(
        response?.messages || []
      );
    } catch (error) {
      console.error(
        "Failed to fetch messages:",
        error
      );
    } finally {
      setMessageLoading(false);
    }
  };

  useEffect(() => {
    if (selected?._id) {
      fetchMessages(selected._id);
    }
  }, [selected]);

  // =========================
  // SEND MESSAGE
  // =========================

  const handleSend = async () => {
    if (!message.trim() || !selected?._id) {
      return;
    }

    try {
      const text = message.trim();

      const response = await sendMessage(
        selected._id,
        text
      );

      const newMessage =
        response?.message;

      if (newMessage) {
        setMessages((prev) => [
          ...prev,
          newMessage,
        ]);
      }

      setMessage("");

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation._id === selected._id
            ? {
                ...conversation,
                lastMessage: text,
                lastMessageAt:
                  new Date().toISOString(),
              }
            : conversation
        )
      );
    } catch (error) {
      console.error(
        "Failed to send message:",
        error
      );
    }
  };

  // =========================
  // SEARCH
  // =========================

  const filteredConversations =
    conversations.filter((conversation) => {
      const studentName =
        conversation.student?.name || "";

      const ownerName =
        conversation.owner?.name || "";

      const roomName =
        conversation.room?.title || "";

      const searchText = search.toLowerCase();

      return (
        studentName
          .toLowerCase()
          .includes(searchText) ||
        ownerName
          .toLowerCase()
          .includes(searchText) ||
        roomName
          .toLowerCase()
          .includes(searchText)
      );
    });

  // =========================
  // HELPERS
  // =========================

  const getOtherUser = (conversation) => {
    // Current page owner ke liye
    // owner side user hoga.

    return conversation?.student;
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =========================
  // UI
  // =========================

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-semibold text-[#19CF37]">
            Communication
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Messages
          </h1>
        </div>

        <div className="grid min-h-600px overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-3">
          {/* ========================= */}
          {/* CONVERSATIONS */}
          {/* ========================= */}

          <aside className="border-b border-slate-200 lg:border-b-0 lg:border-r">
            <div className="border-b border-slate-100 p-4">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search students..."
                  className="w-full rounded-xl bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:ring-1 focus:ring-[#19CF37]"
                />
              </div>
            </div>

            {loading && (
              <div className="p-6 text-center text-sm text-slate-500">
                Loading conversations...
              </div>
            )}

            {!loading && error && (
              <div className="p-4">
                <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              </div>
            )}

            {!loading &&
              !error &&
              filteredConversations.length === 0 && (
                <div className="p-6 text-center">
                  <p className="text-sm font-semibold text-slate-700">
                    No conversations
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Your messages will appear here.
                  </p>
                </div>
              )}

            {!loading &&
              !error &&
              filteredConversations.length >
                0 && (
                <div>
                  {filteredConversations.map(
                    (conversation) => {
                      const student =
                        conversation.student;

                      return (
                        <button
                          key={conversation._id}
                          type="button"
                          onClick={() =>
                            setSelected(
                              conversation
                            )
                          }
                          className={`flex w-full gap-3 border-b border-slate-100 p-4 text-left ${
                            selected?._id ===
                            conversation._id
                              ? "bg-green-50"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink-50 font-bold text-[#FF3E9B]">
                            {getInitials(
                              student?.name
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex justify-between gap-2">
                              <p className="truncate text-sm font-semibold text-slate-900">
                                {student?.name ||
                                  "Student"}
                              </p>

                              <span className="text-xs text-slate-400">
                                {formatTime(
                                  conversation.lastMessageAt
                                )}
                              </span>
                            </div>

                            <p className="mt-1 truncate text-xs text-slate-500">
                              {conversation.lastMessage ||
                                "No messages yet"}
                            </p>

                            {conversation.ownerUnread >
                              0 && (
                              <span className="mt-2 inline-flex rounded-full bg-[#19CF37] px-2 py-0.5 text-[10px] font-bold text-white">
                                {
                                  conversation.ownerUnread
                                }
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    }
                  )}
                </div>
              )}
          </aside>

          {/* ========================= */}
          {/* CHAT */}
          {/* ========================= */}

          <section className="flex min-h-600px flex-col lg:col-span-2">
            {!selected ? (
              <div className="flex flex-1 items-center justify-center p-6 text-center">
                <div>
                  <h2 className="font-semibold text-slate-700">
                    Select a conversation
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Choose a student to start
                    messaging.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Chat Header */}

                <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-50 font-bold text-[#FF3E9B]">
                      {getInitials(
                        getOtherUser(selected)
                          ?.name
                      )}
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-900">
                        {
                          getOtherUser(selected)
                            ?.name
                        }
                      </h2>

                      <p className="text-xs text-slate-400">
                        Interested in{" "}
                        {
                          selected.room?.title
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <button
                      type="button"
                      className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
                    >
                      <Phone size={18} />
                    </button>

                    <button
                      type="button"
                      className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
                    >
                      <MoreVertical
                        size={18}
                      />
                    </button>
                  </div>
                </div>

                {/* Messages */}

                <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/60 p-5">
                  {messageLoading ? (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-sm text-slate-400">
                        Loading messages...
                      </p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-center">
                      <div>
                        <p className="font-semibold text-slate-700">
                          No messages yet
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Start the conversation.
                        </p>
                      </div>
                    </div>
                  ) : (
                    messages.map((item) => {
                      /*
                       * Owner dashboard:
                       * sender populated object
                       *
                       * Agar current logged-in user ka
                       * ID localStorage me available hai,
                       * usko yahan compare karna best hai.
                       */

                      const isOwner =
                        item.sender?.role ===
                        "owner";

                      return (
                        <div
                          key={item._id}
                          className={`flex ${
                            isOwner
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-md rounded-2xl px-4 py-3 ${
                              isOwner
                                ? "rounded-br-md bg-[#19CF37] text-white"
                                : "rounded-bl-md bg-white text-slate-700 shadow-sm"
                            }`}
                          >
                            <p className="text-sm leading-6">
                              {item.text}
                            </p>

                            <div className="mt-1 flex justify-end gap-1 text-[10px] opacity-70">
                              {formatTime(
                                item.createdAt
                              )}

                              {isOwner && (
                                <CheckCheck
                                  size={13}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Input */}

                <div className="border-t border-slate-100 p-4">
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-[#19CF37]">
                    <button
                      type="button"
                      className="rounded-xl p-2 text-slate-400"
                    >
                      <Paperclip size={18} />
                    </button>

                    <input
                      value={message}
                      onChange={(e) =>
                        setMessage(
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          !e.shiftKey
                        ) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="Type your message..."
                      className="flex-1 bg-transparent px-2 py-2 text-sm outline-none"
                    />

                    <button
                      type="button"
                      className="hidden p-2 text-slate-400 sm:block"
                    >
                      <Smile size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={handleSend}
                      disabled={!message.trim()}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#19CF37] text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Send size={17} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default Messages;