import {
  Home,
  Users,
  CalendarCheck,
  CheckCircle2,
} from "lucide-react";

export const stats = [
  {
    title: "Total Rooms",
    value: "8",
    description: "Rooms listed",
    icon: Home,
    iconBg: "bg-green-50",
    iconColor: "text-[#19CF37]",
  },
  {
    title: "Available Rooms",
    value: "5",
    description: "Currently available",
    icon: CheckCircle2,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Room Requests",
    value: "12",
    description: "New requests",
    icon: Users,
    iconBg: "bg-pink-50",
    iconColor: "text-[#FF3E9B]",
  },
  {
    title: "Upcoming Visits",
    value: "4",
    description: "Scheduled visits",
    icon: CalendarCheck,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

export const rooms = [
  {
    id: 1,
    title: "Comfortable Single Room",
    location: "Kankarbagh, Patna",
    rent: 7500,
    type: "Single Room",
    status: "available",
    requests: 4,
    image: "/rooms/room1.jpg",
  },
  {
    id: 2,
    title: "Premium Student Room",
    location: "Boring Road, Patna",
    rent: 9000,
    type: "Single Room",
    status: "available",
    requests: 3,
    image: "/rooms/room2.jpg",
  },
  {
    id: 3,
    title: "Affordable Shared Room",
    location: "Rajendra Nagar, Patna",
    rent: 4500,
    type: "Shared",
    status: "rented",
    requests: 5,
    image: "/rooms/room3.jpg",
  },
];

export const recentRequests = [
  {
    id: 1,
    student: "Rahul Kumar",
    room: "Comfortable Single Room",
    location: "Kankarbagh, Patna",
    date: "Today",
    status: "pending",
  },
  {
    id: 2,
    student: "Priya Singh",
    room: "Premium Student Room",
    location: "Boring Road, Patna",
    date: "Yesterday",
    status: "pending",
  },
  {
    id: 3,
    student: "Ankit Verma",
    room: "Affordable Shared Room",
    location: "Rajendra Nagar, Patna",
    date: "18 Sep",
    status: "accepted",
  },
];

export const upcomingVisits = [
  {
    id: 1,
    student: "Aman Kumar",
    room: "Comfortable Single Room",
    date: "24 September 2026",
    time: "11:00 AM",
  },
  {
    id: 2,
    student: "Neha Singh",
    room: "Premium Student Room",
    date: "25 September 2026",
    time: "03:30 PM",
  },
];