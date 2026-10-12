// import { useEffect, useState } from "react";
// import {
//   Search,
//   MapPin,
//   Home,
//   ShieldCheck,
//   Users,
//   CheckCircle2,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// import { getAllRooms } from "../../api/room.api";

// function RoomSearchHero() {
//   const navigate = useNavigate();

//   const [rooms, setRooms] = useState([]);
//   const [location, setLocation] = useState("");
//   const [roomType, setRoomType] = useState("Any Type");
//   const [budget, setBudget] = useState("Any Budget");
//   const [loading, setLoading] = useState(false);

//   // Fetch all rooms from backend
//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         setLoading(true);

//         const response = await getAllRooms();

//         const roomData = response?.rooms || response || [];

//         setRooms(roomData);
//       } catch (error) {
//         console.error("Failed to fetch rooms:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRooms();
//   }, []);

//   // Search rooms
//   const handleSearch = () => {
//     let filteredRooms = [...rooms];

//     // Location filter
//     if (location.trim()) {
//       filteredRooms = filteredRooms.filter((room) =>
//         room.location
//           ?.toLowerCase()
//           .includes(location.trim().toLowerCase())
//       );
//     }

//     // Room type filter
//     if (roomType !== "Any Type") {
//       const typeMap = {
//         "Single Room": "single",
//         "Double Sharing": "shared",
//         "Triple Sharing": "shared",
//         PG: "pg",
//         Flat: "flat",
//       };

//       const selectedType = typeMap[roomType];

//       if (selectedType) {
//         filteredRooms = filteredRooms.filter(
//           (room) =>
//             room.type?.toLowerCase() ===
//             selectedType.toLowerCase()
//         );
//       }
//     }

//     // Budget filter
//     if (budget !== "Any Budget") {
//       filteredRooms = filteredRooms.filter((room) => {
//         const rent = Number(room.rent || 0);

//         if (budget === "Under ₹5,000") {
//           return rent < 5000;
//         }

//         if (budget === "₹5,000 - ₹10,000") {
//           return rent >= 5000 && rent <= 10000;
//         }

//         if (budget === "₹10,000 - ₹15,000") {
//           return rent > 10000 && rent <= 15000;
//         }

//         if (budget === "Above ₹15,000") {
//           return rent > 15000;
//         }

//         return true;
//       });
//     }

//     // Save filtered rooms temporarily
//     sessionStorage.setItem(
//       "roomSearchResults",
//       JSON.stringify(filteredRooms)
//     );

//     navigate("/rooms");
//   };

//   // Popular location search
//   const handlePopularSearch = (area) => {
//     setLocation(area);

//     const filteredRooms = rooms.filter((room) =>
//       room.location
//         ?.toLowerCase()
//         .includes(area.toLowerCase())
//     );

//     sessionStorage.setItem(
//       "roomSearchResults",
//       JSON.stringify(filteredRooms)
//     );

//     navigate("/rooms");
//   };

//   return (
//     <section className="relative overflow-hidden bg-[#BBE0EF] px-4 py-5 sm:px-6 sm:py-20 lg:px-8 lg:py-10">
//       {/* Decorative Background */}
//       <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white opacity-30"></div>

//       <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#FF3E9B] opacity-10"></div>

//       <div className="relative mx-auto max-w-7xl">
//         {/* Hero Content */}
//         <div className="mx-auto max-w-4xl text-center">
//           <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
//             Find a Room That
//             <span className="block text-[#FF3E9B]">
//               Feels Like Home
//             </span>
//           </h1>

//           <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
//             Discover comfortable rooms, PGs, and shared accommodations
//             that fit your
//             <span className="font-semibold text-gray-900">
//               {" "}
//               location, lifestyle, and budget.
//             </span>{" "}
//             Explore suitable options, compare what matters, and find a
//             place you’ll be happy to call home.
//           </p>
//         </div>

//         {/* Search Panel */}
//         <div className="mx-auto mt-10 max-w-6xl rounded-3xl border border-white bg-white p-4 shadow-2xl sm:p-5">
//           <div className="grid gap-3 lg:grid-cols-4">
//             {/* Location */}
//             <div className="group rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 transition hover:border-[#BBE0EF] hover:bg-white">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#BBE0EF] text-[#FF3E9B]">
//                   <MapPin size={21} />
//                 </div>

//                 <div className="min-w-0 flex-1">
//                   <label className="block text-xs font-bold uppercase tracking-wide text-gray-500">
//                     Location
//                   </label>

//                   <input
//                     type="text"
//                     value={location}
//                     onChange={(e) =>
//                       setLocation(e.target.value)
//                     }
//                     placeholder="Where do you want to stay?"
//                     className="mt-1 w-full bg-transparent text-sm font-semibold text-gray-900 outline-none placeholder:font-medium placeholder:text-gray-400"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Room Type */}
//             <div className="group rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 transition hover:border-[#BBE0EF] hover:bg-white">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#BBE0EF] text-[#FF3E9B]">
//                   <Home size={21} />
//                 </div>

//                 <div className="min-w-0 flex-1">
//                   <label className="block text-xs font-bold uppercase tracking-wide text-gray-500">
//                     Room Type
//                   </label>

//                   <select
//                     value={roomType}
//                     onChange={(e) =>
//                       setRoomType(e.target.value)
//                     }
//                     className="mt-1 w-full cursor-pointer bg-transparent text-sm font-semibold text-gray-900 outline-none"
//                   >
//                     <option>Any Type</option>
//                     <option>Single Room</option>
//                     <option>Double Sharing</option>
//                     <option>Triple Sharing</option>
//                     <option>PG</option>
//                     <option>Flat</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Budget */}
//             <div className="group rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 transition hover:border-[#BBE0EF] hover:bg-white">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#BBE0EF] text-[#FF3E9B]">
//                   <span className="text-lg font-bold">₹</span>
//                 </div>

//                 <div className="min-w-0 flex-1">
//                   <label className="block text-xs font-bold uppercase tracking-wide text-gray-500">
//                     Monthly Budget
//                   </label>

//                   <select
//                     value={budget}
//                     onChange={(e) =>
//                       setBudget(e.target.value)
//                     }
//                     className="mt-1 w-full cursor-pointer bg-transparent text-sm font-semibold text-gray-900 outline-none"
//                   >
//                     <option>Any Budget</option>
//                     <option>Under ₹5,000</option>
//                     <option>₹5,000 - ₹10,000</option>
//                     <option>₹10,000 - ₹15,000</option>
//                     <option>Above ₹15,000</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Search Button */}
//             <button
//               type="button"
//               onClick={handleSearch}
//               disabled={loading}
//               className="flex min-h-20 items-center justify-center gap-2 rounded-2xl bg-[#19CF37] px-6 text-sm font-bold text-white shadow-md transition duration-300 hover:bg-[#FF3E9B] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               <Search size={20} />

//               {loading ? "Loading..." : "Search Rooms"}
//             </button>
//           </div>

//           {/* Quick Search */}
//           <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center">
//             <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
//               Popular:
//             </span>

//             <div className="flex flex-wrap gap-2">
//               {[
//                 "Kankarbagh",
//                 "Boring Road",
//                 "Rajendra Nagar",
//                 "Patliputra Colony",
//               ].map((area) => (
//                 <button
//                   key={area}
//                   type="button"
//                   onClick={() =>
//                     handlePopularSearch(area)
//                   }
//                   className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-[#FF3E9B] hover:text-[#FF3E9B]"
//                 >
//                   {area}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Trust Indicators */}
//         <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
//           {/* Item 1 */}
//           <div className="flex items-center justify-center gap-3 rounded-2xl bg-white bg-opacity-70 px-4 py-4 shadow-sm backdrop-blur-sm">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#19CF37] text-white">
//               <ShieldCheck size={20} />
//             </div>

//             <div className="text-left">
//               <p className="text-sm font-bold text-gray-900">
//                 Trusted Listings
//               </p>

//               <p className="text-xs text-gray-500">
//                 Quality-focused properties
//               </p>
//             </div>
//           </div>

//           {/* Item 2 */}
//           <div className="flex items-center justify-center gap-3 rounded-2xl bg-white bg-opacity-70 px-4 py-4 shadow-sm backdrop-blur-sm">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF3E9B] text-white">
//               <Users size={20} />
//             </div>

//             <div className="text-left">
//               <p className="text-sm font-bold text-gray-900">
//                 Student Friendly
//               </p>

//               <p className="text-xs text-gray-500">
//                 Options for every budget
//               </p>
//             </div>
//           </div>

//           {/* Item 3 */}
//           <div className="flex items-center justify-center gap-3 rounded-2xl bg-white bg-opacity-70 px-4 py-4 shadow-sm backdrop-blur-sm">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#19CF37] text-white">
//               <CheckCircle2 size={20} />
//             </div>

//             <div className="text-left">
//               <p className="text-sm font-bold text-gray-900">
//                 Easy to Explore
//               </p>

//               <p className="text-xs text-gray-500">
//                 Search, compare and connect
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default RoomSearchHero;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllRooms } from "../../api/room.api";

import RoomSearchContent from "../RoomSearchHeroComponnent/RoomSearchContent";
import RoomSearchForm from "../RoomSearchHeroComponnent/RoomSearchForm";
import RoomSearchTrust from "../RoomSearchHeroComponnent/RoomSearchTrust";
import CustomCursor from "../CustomCursor";

function RoomSearchHero() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [location, setLocation] = useState("");
  const [roomType, setRoomType] = useState("Any Type");
  const [budget, setBudget] = useState("Any Budget");
  const [loading, setLoading] = useState(false);

  // Fetch rooms from backend
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);

        const response = await getAllRooms();
        const roomData = response?.rooms || response || [];

        setRooms(Array.isArray(roomData) ? roomData : []);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Filter rooms using selected criteria
  const handleSearch = () => {
    let filteredRooms = [...rooms];

    // Location filter
    if (location.trim()) {
      filteredRooms = filteredRooms.filter((room) =>
        room.location
          ?.toLowerCase()
          .includes(location.trim().toLowerCase())
      );
    }

    // Room type filter
    if (roomType !== "Any Type") {
      const typeMap = {
        "Single Room": "single",
        "Double Sharing": "shared",
        "Triple Sharing": "shared",
        PG: "pg",
        Flat: "flat",
      };

      const selectedType = typeMap[roomType];

      if (selectedType) {
        filteredRooms = filteredRooms.filter(
          (room) =>
            room.type?.toLowerCase() === selectedType
        );
      }
    }

    // Budget filter
    if (budget !== "Any Budget") {
      filteredRooms = filteredRooms.filter((room) => {
        const rent = Number(room.rent || 0);

        switch (budget) {
          case "Under ₹5,000":
            return rent < 5000;

          case "₹5,000 - ₹10,000":
            return rent >= 5000 && rent <= 10000;

          case "₹10,000 - ₹15,000":
            return rent > 10000 && rent <= 15000;

          case "Above ₹15,000":
            return rent > 15000;

          default:
            return true;
        }
      });
    }

    sessionStorage.setItem(
      "roomSearchResults",
      JSON.stringify(filteredRooms)
    );

    navigate("/rooms");
  };

  // Popular location search
  const handlePopularSearch = (area) => {
    setLocation(area);

    const filteredRooms = rooms.filter((room) =>
      room.location
        ?.toLowerCase()
        .includes(area.toLowerCase())
    );

    sessionStorage.setItem(
      "roomSearchResults",
      JSON.stringify(filteredRooms)
    );

    navigate("/rooms");
  };

  return (
    <section className="relative overflow-hidden bg-[#BBE0EF] px-4 py-5 sm:px-6 sm:py-20 lg:px-8 lg:py-10">
      {/* Decorative Background */}
      <CustomCursor/>
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white opacity-30" />

      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#FF3E9B] opacity-10" />

      <div className="relative mx-auto max-w-7xl">
        <RoomSearchContent />

        <RoomSearchForm
          location={location}
          setLocation={setLocation}
          roomType={roomType}
          setRoomType={setRoomType}
          budget={budget}
          setBudget={setBudget}
          loading={loading}
          onSearch={handleSearch}
          onPopularSearch={handlePopularSearch}
        />

        <RoomSearchTrust />
      </div>
    </section>
  );
}

export default RoomSearchHero;