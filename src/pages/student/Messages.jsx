import { useState } from "react";
import {
  Search,
  Send,
  Phone,
  MoreVertical,
  Paperclip,
  Smile,
  CheckCheck,
  MapPin,
  ArrowLeft,
} from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Amit Kumar",
    role: "Room Owner",
    image: "/users/user1.jpg",
    room: "Comfortable Single Room",
    location: "Kankarbagh, Patna",
    lastMessage: "Yes, the room is still available.",
    time: "10:42 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Room Owner",
    image: "/users/user2.jpg",
    room: "Premium Student Room",
    location: "Boring Road, Patna",
    lastMessage: "You can visit the room tomorrow.",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Rahul Singh",
    role: "Room Owner",
    image: "/users/user3.jpg",
    room: "Affordable Shared Room",
    location: "Rajendra Nagar, Patna",
    lastMessage: "Thank you for contacting me.",
    time: "18 Sep",
    unread: 0,
    online: false,
  },
];

const messagesData = {
  1: [
    {
      id: 1,
      sender: "owner",
      message: "Hello! Thanks for yours interest in my room.",
      time: "10:35 AM",
    },
    {
      id: 2,
      sender: "student",
      message: "Hi Amit, is the room still available?",
      time: "10:38 AM",
      seen: true,
    },
    {
      id: 3,
      sender: "owner",
      message: "Yes, the room is still available.",
      time: "10:40 AM",
    },
    {
      id: 4,
      sender: "owner",
      message: "You can visit it today or tomorrow.",
      time: "10:42 AM",
    },
  ],

  2: [
    {
      id: 1,
      sender: "student",
      message: "Hi Priya, I wanted to know more about the room.",
      time: "Yesterday",
      seen: true,
    },
    {
      id: 2,
      sender: "owner",
      message: "Sure. The room is fully furnished and has Wi-Fi.",
      time: "Yesterday",
    },
    {
      id: 3,
      sender: "owner",
      message: "You can visit the room tomorrow.",
      time: "Yesterday",
    },
  ],

  3: [
    {
      id: 1,
      sender: "student",
      message: "Hello Rahul, is this shared room available?",
      time: "18 Sep",
      seen: true,
    },
    {
      id: 2,
      sender: "owner",
      message: "Yes, it is currently available.",
      time: "18 Sep",
    },
    {
      id: 3,
      sender: "owner",
      message: "Thank you for contacting me.",
      time: "18 Sep",
    },
  ],
};

function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0],
  );

  const [messages, setMessages] = useState(messagesData[conversations[0].id]);

  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleConversation = (conversation) => {
    setSelectedConversation(conversation);
    setMessages(messagesData[conversation.id] || []);
    setShowChat(true);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "student",
      message: message.trim(),
      time: "Just now",
      seen: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-semibold text-[#19CF37]">
                RoomSaathi Messages
              </p>

              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Messages
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Chat with room owners and discuss yours room details.
              </p>
            </div>

            <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              {conversations.length} Conversations
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="grid min-h-650px overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-12">
          {/* Conversations Sidebar */}
          <aside
            className={`border-slate-200 lg:col-span-4 lg:block lg:border-r ${
              showChat ? "hidden" : "block"
            }`}
          >
            {/* Search */}
            <div className="border-b border-slate-100 p-5">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#19CF37] focus:bg-white"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="divide-y divide-slate-100">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => handleConversation(conversation)}
                    className={`flex w-full gap-3 p-4 text-left transition hover:bg-slate-50 ${
                      selectedConversation.id === conversation.id
                        ? "bg-green-50/70"
                        : "bg-white"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                        <img
                          src={conversation.image}
                          alt={conversation.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />

                        <span className="absolute text-sm font-bold text-slate-500">
                          {conversation.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </span>
                      </div>

                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#19CF37]" />
                      )}
                    </div>

                    {/* Conversation Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate text-sm font-semibold text-slate-900">
                          {conversation.name}
                        </h3>

                        <span className="shrink-0 text-xs text-slate-400">
                          {conversation.time}
                        </span>
                      </div>

                      <p className="mt-0.5 text-xs text-[#19CF37]">
                        {conversation.role}
                      </p>

                      <p className="mt-1 truncate text-sm text-slate-500">
                        {conversation.lastMessage}
                      </p>

                      {conversation.unread > 0 && (
                        <span className="mt-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[#19CF37] px-1.5 py-0.5 text-xs font-bold text-white">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-6 py-12 text-center">
                  <Search size={30} className="mx-auto mb-3 text-slate-300" />

                  <p className="font-medium text-slate-700">
                    No conversations found
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Try another search.
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* Chat Area */}
          <section
            className={`flex flex-col lg:col-span-8 ${
              showChat ? "flex" : "hidden lg:flex"
            }`}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-4 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  onClick={() => setShowChat(false)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                >
                  <ArrowLeft size={20} />
                </button>

                <div className="relative shrink-0">
                  <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                    <img
                      src={selectedConversation.image}
                      alt={selectedConversation.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    <span className="absolute text-sm font-bold text-slate-500">
                      {selectedConversation.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </span>
                  </div>

                  {selectedConversation.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#19CF37]" />
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                    {selectedConversation.name}
                  </h2>

                  <p className="truncate text-xs text-slate-500">
                    {selectedConversation.online
                      ? "Online"
                      : selectedConversation.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-[#19CF37]"
                  title="Call owner"
                >
                  <Phone size={19} />
                </button>

                <button
                  className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100"
                  title="More options"
                >
                  <MoreVertical size={19} />
                </button>
              </div>
            </div>

            {/* Room Info */}
            <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-3 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-400">
                    Discussing room
                  </p>

                  <p className="truncate text-sm font-semibold text-slate-800">
                    {selectedConversation.room}
                  </p>

                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin size={13} />
                    <span>{selectedConversation.location}</span>
                  </div>
                </div>

                <button className="hidden shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#19CF37] hover:text-[#19CF37] sm:block">
                  View Room
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/40 p-4 sm:p-6">
              <div className="flex justify-center">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-400 shadow-sm">
                  Today
                </span>
              </div>

              {messages.map((item) => {
                const isStudent = item.sender === "student";

                return (
                  <div
                    key={item.id}
                    className={`flex ${
                      isStudent ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[65%] ${
                        isStudent
                          ? "rounded-br-md bg-[#19CF37] text-white"
                          : "rounded-bl-md border border-slate-100 bg-white text-slate-700"
                      }`}
                    >
                      <p className="text-sm leading-6">{item.message}</p>

                      <div
                        className={`mt-1 flex items-center justify-end gap-1 text-[11px] ${
                          isStudent ? "text-white/80" : "text-slate-400"
                        }`}
                      >
                        <span>{item.time}</span>

                        {isStudent && item.seen && <CheckCheck size={14} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <div className="border-t border-slate-100 bg-white p-4 sm:p-5">
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-[#19CF37] focus-within:bg-white">
                <button
                  className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#19CF37]"
                  title="Attach file"
                >
                  <Paperclip size={19} />
                </button>

                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type yours message..."
                  className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />

                <button
                  className="hidden rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#FF3E9B] sm:block"
                  title="Add emoji"
                >
                  <Smile size={19} />
                </button>

                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#19CF37] text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-40"
                  title="Send message"
                >
                  <Send size={18} />
                </button>
              </div>

              <p className="mt-2 text-center text-xs text-slate-400">
                Press Enter to send yours message
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Messages;
