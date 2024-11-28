// import React, { useState, useRef, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Logo } from "@/assets";
// import { Font1 } from "@/config/typography";
// import IconHeader1 from "@/assets/dashboard/header-icon/icon-1.png";
// import IconHeader2 from "@/assets/dashboard/header-icon/icon-2.png";
// import IconHeader3 from "@/assets/dashboard/header-icon/icon-3.png";
// import IconHeader4 from "@/assets/dashboard/header-icon/icon-4.png";
// import profileIcon from "@/assets/dashboard/header-icon/user-icon.png";
// import upload from "@/assets/dashboard/header-icon/upload.png";
// import edit from "@/assets/dashboard/header-icon/edit.png";
// import { removeData } from "@/config/helper";
// import InputField from "@/component/common/input";
// import FileUpload from "@/component/common/upload";
// import TextArea from "@/component/common/textarea";
// import { Close } from "@/config/app-constant";
// import { Put, Get } from "@/config/api-method";
// import Table from "@/component/common/table";
// import { HiOutlineDotsVertical } from "react-icons/hi";

// const AllRequestCol = [
//   { heading: "Sno", key: "Sno" },
//   { heading: "Region", key: "region" },
//   { heading: "Name", key: "firstName" },
//   { heading: "email", key: "email" },
//   { heading: "Status", key: "status" },
//   { heading: "Detail", key: "detail" },
// ];

// export default function Bookings() {
//   const [allDatasource, setAllDatasource] = useState([]);
//   const [userDatasource, setUserDatasource] = useState([]);
//   const [filterList, setFilterList] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRole, setSelectedRole] = useState("");
//   const [singleBooking, setSingleBooking] = useState({});

//   const getAllData = () => {
//     Get("/booking/All")
//       .then((res) => {
//         if (res?.data) {
//           const bookingPromises2 = res.data.map((item, index) =>
//             Get(`/auth/${item.parentId}`).then((res) => {
//               const user = res?.data || {};
//               return {
//                 Sno: index + 1,
//                 location: item.location,
//                 childrenCount: item.childrenCount,
//                 childrenAges: item.childrenAges.join(", "),
//                 schedule: item.schedule,
//                 status: (
//                   <span
//                     className={`font-bold capitalize ${
//                       item.status === "approved"
//                         ? "text-sky-800"
//                         : item.status === "pending"
//                         ? "text-green-800"
//                         : "text-red-800"
//                     }`}
//                   >
//                     {item.status}
//                   </span>
//                 ),
//                 detail: (
//                   <button onClick={() => handleSubModel(item._id)}>
//                     <HiOutlineDotsVertical />
//                   </button>
//                 ),
//                 firstName: user.firstName,
//                 email: user.email,
//                 region: user.region,
//               };
//             })
//           );

//           // Resolve all booking promises
//           Promise.all(bookingPromises2)
//             .then((userData) => {
//               setAllDatasource(userData);
//             })
//             .catch((err) => {
//               console.error("Error resolving booking details:", err);
//             });
//         } else {
//           console.log("No bookings data found.");
//           setUserDatasource([]); // Set empty array if no data is returned
//         }
//         // if (res?.data) {
//         //   const AllUserData = res?.data.map((item, index) => ({
//         //     Sno: index + 1,
//         //     name: item.name,
//         //     email: item.email,
//         //     region: item.region,
//         //     location: item.location,
//         //     childrenCount: item.childrenCount,
//         //     childrenAges: item.childrenAges.join(", "), // Assuming `childrenAges` is an array
//         //     schedule: item.schedule,
//         //     status: (
//         //       <span
//         //         className={`font-bold ${
//         //           item.status === "approved"
//         //             ? "text-sky-800"
//         //             : item.status === "pending"
//         //             ? "text-green-800"
//         //             : "text-red-800"
//         //         }`}
//         //       >
//         //         {item.status}
//         //       </span>
//         //     ),
//         //     detail: (
//         //       <button onClick={() => handleSubModel(item._id)}>
//         //         <HiOutlineDotsVertical />
//         //       </button>
//         //     ),
//         //   }
//         // ));
//         //   setAllDatasource(AllUserData);
//         // }
//       })
//       .catch((err) => {
//         console.log("Error fetching data:", err);
//       });
//   };

//   const getDataById = (id) => {
//     // First, fetch the booking data
//     Get(`/booking/${id}`)
//       .then((res) => {
//         if (res?.data) {
//           const booking = res?.data; // Save the booking data

//           // Now, fetch the user data using the userId from the booking
//           Get(`/auth/${booking.parentId}`)
//             .then((userRes) => {
//               const user = userRes?.data || {}; // Handle user data

//               setSingleBooking({
//                 name: user.firstName,
//                 email: user.email,
//                 region: user.region,
//                 status: booking.status,
//                 message: booking.message,
//                 childrenCount: booking.childrenCount,
//                 childrenAges: booking.childrenAges,
//               });
//             })
//             .catch((err) => {
//               console.error("Error fetching user data:", err);
//             });
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching booking data:", err);
//       });
//   };

//   // const handleSubModel = (id) => {
//   //   getDataById(id);
//   //   setSubModalOpen(true);
//   // };

//   const handleSubModel = (id) => {
//     console.log("Submodel clicked for ID:", id);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const handleRoleChange = (e) => {
//     setSelectedRole(e.target.value);
//   };

//   // Filter logic
//   useEffect(() => {
//     let filteredData = [...allDatasource];

//     if (searchQuery) {
//       filteredData = filteredData.filter((item) =>
//         item.firstName?.toLowerCase().includes(searchQuery)
//       );
//     }

//     if (selectedRole) {
//       filteredData = filteredData.filter((item) => item.role === selectedRole);
//     }

//     setFilterList(filteredData);
//   }, [searchQuery, selectedRole, allDatasource]);

//   useEffect(() => {
//     getAllData();
//   }, []);

//   return (
//     <section className="px-4">
//       <div className="flex gap-4 justify-between py-2">
//         {/* Search Input */}
//         <input
//           type="text"
//           placeholder="Search by name"
//           className="w-[280px] h-[40px] bg-white border p-2 rounded-md outline-none"
//           onChange={handleSearchChange}
//         />

//         {/* Role Filter */}
//         <div className="flex items-center gap-2">
//           <select
//             name="role"
//             className="bg-transparent px-8 py-2 rounded-md border-gray-200 border text-gray-600 text-sm block w-full focus:outline-none"
//             onChange={handleRoleChange}
//           >
//             <option value="">Status</option>
//             <option value="pending">Pending</option>
//             <option value="approved">Approved</option>
//             <option value="reject">Reject</option>
//           </select>
//           <div>
//             <MdPersonAdd size={28} color="#d1d1d1" />
//           </div>
//         </div>
//       </div>
//       <div className="flex gap-4 py-6 ">
//         <Table
//           tableClass="overflow-y-scroll  max-h-[420px] border w-full"
//           tableHeaderClass="bg-sky-700 w-full text-white sticky top-0 capitalize font-montserrat"
//           datasource={filterList.length > 0 ? filterList : allDatasource}
//           cols={AllRequestCol}
//         />
//       </div>
//     </section>
//   );
// }

import React, { useState, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdPersonAdd } from "react-icons/md";
import { Get } from "@/config/api-method";
import Table from "@/component/common/table";

const AllRequestCol = [
  { heading: "Sno", key: "Sno" },
  { heading: "Region", key: "region" },
  { heading: "Name", key: "firstName" },
  { heading: "Email", key: "email" },
  { heading: "Status", key: "status" },
  { heading: "Detail", key: "detail" },
];

export default function Bookings() {
  const [allDatasource, setAllDatasource] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // Status filter

  // Fetch all booking data
  const getAllData = () => {
    Get("/booking/All")
      .then((res) => {
        if (res?.data) {
          const bookingPromises = res.data.map((item, index) =>
            Get(`/auth/${item.parentId}`).then((res) => {
              const user = res?.data || {};
              return {
                Sno: index + 1,
                location: item.location,
                childrenCount: item.childrenCount,
                childrenAges: item.childrenAges.join(", "),
                schedule: item.schedule,
                status: (
                  <span
                    className={`font-bold capitalize ${
                      item.status === "approved"
                        ? "text-sky-800"
                        : item.status === "pending"
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                ),
                detail: (
                  <button onClick={() => handleSubModel(item._id)}>
                    <HiOutlineDotsVertical />
                  </button>
                ),
                firstName: user.firstName,
                email: user.email,
                region: user.region,
                rawStatus: item.status, // Store raw status for filtering
              };
            })
          );

          // Resolve all promises and update the state
          Promise.all(bookingPromises)
            .then((userData) => setAllDatasource(userData))
            .catch((err) =>
              console.error("Error resolving booking details:", err)
            );
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  };

  const handleSubModel = (id) => {
    console.log("Submodel clicked for ID:", id);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status); // Update selected status
  };

  // Apply search and status filter
  useEffect(() => {
    let filteredData = [...allDatasource];

    if (searchQuery) {
      filteredData = filteredData.filter((item) =>
        item.firstName?.toLowerCase().includes(searchQuery)
      );
    }

    if (selectedStatus) {
      filteredData = filteredData.filter(
        (item) => item.rawStatus === selectedStatus
      );
    }

    setFilterList(filteredData);
  }, [searchQuery, selectedStatus, allDatasource]);

  // Fetch data on component mount
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <section className="px-4">
      <div className="flex gap-4 justify-between py-2">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name"
          className="w-[280px] h-[40px] bg-white border p-2 rounded-md outline-none"
          onChange={handleSearchChange}
        />

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <select
            name="status"
            className="bg-transparent px-8 py-2 rounded-md border-gray-200 border text-gray-600 text-sm block w-full focus:outline-none"
            value={selectedStatus} // Bind the value to maintain selected option
            onChange={handleStatusChange}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="reject">Reject</option>
          </select>
          <div>
            <MdPersonAdd size={28} color="#d1d1d1" />
          </div>
        </div>
      </div>
      <div className="flex gap-4 pt-2">
        <Table
          tableClass="overflow-y-scroll max-h-[420px] border w-full"
          tableHeaderClass="bg-sky-700 w-full text-white sticky top-0 capitalize font-montserrat"
          datasource={filterList.length > 0 ? filterList : allDatasource}
          cols={AllRequestCol}
        />
      </div>
    </section>
  );
}
