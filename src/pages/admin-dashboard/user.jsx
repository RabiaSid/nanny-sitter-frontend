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
// import { MdPersonAdd } from "react-icons/md";

// const AllRequestCol = [
//   { heading: "Image", key: "image" },
//   { heading: "Name", key: "firstName" },
//   { heading: "Email", key: "email" },
//   { heading: "Role", key: "role" },
//   { heading: "Region", key: "region" },
//   { heading: "Detail", key: "detail" },
// ];

// export default function Users() {
//   const [allDatasource, setAllDatasource] = useState([]);
//   const [isSubModalOpen, setSubModalOpen] = useState(false);
//   const [filterList, setFilterList] = useState([]);

//   const getData = () => {
//     Get("/auth")
//       .then((res) => {
//         console.log(res?.data);
//         if (res?.data) {
//           const AllUserData = res?.data.map((item) => ({
//             image: (
//               <img
//                 src={
//                   item?.image ||
//                   "https://ghaliajewelry.com/wp-content/uploads/2016/08/dummy-prod-1.jpg"
//                 }
//                 className="h-[35px] w-[35px] rounded-full"
//               />
//             ),
//             firstName: item.firstName,
//             email: item.email,
//             role: item.role,
//             region: item.region,
//             detail: (
//               <button onClick={() => handleSubModel(item._id)}>
//                 <HiOutlineDotsVertical />
//               </button>
//             ),
//           }));
//           setAllDatasource(AllUserData);
//         }
//       })
//       .catch((err) => {
//         console.log("Error fetching data:", err);
//       });
//   };

//   const getDataById = (id) => {
//     // First, fetch the booking data
//     // Get(`/booking/${id}`)
//     //   .then((res) => {
//     //     if (res?.data) {
//     //       const booking = res?.data; // Save the booking data
//     //       // Now, fetch the user data using the userId from the booking
//     //       Get(`/auth/${booking.parentId}`)
//     //         .then((userRes) => {
//     //           const user = userRes?.data || {}; // Handle user data
//     //           setSingleBooking({
//     //             name: user.firstName,
//     //             email: user.email,
//     //             region: user.region,
//     //             status: booking.status,
//     //             message: booking.message,
//     //             childrenCount: booking.childrenCount,
//     //             childrenAges: booking.childrenAges,
//     //           });
//     //         })
//     //         .catch((err) => {
//     //           console.error("Error fetching user data:", err);
//     //         });
//     //     }
//     //   })
//     //   .catch((err) => {
//     //     console.error("Error fetching booking data:", err);
//     //   });
//   };

//   const handleSubModel = (id) => {
//     getDataById(id);
//     setSubModalOpen(true);
//   };

//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();

//     if (!query) {
//       // If the input is empty, clear the filterList to show banner and filter
//       setFilterList([]);
//       return;
//     }

//     const filtered = allDatasource.filter((x) => {
//       const firstNameMatch = x.firstName?.toLowerCase().includes(query);
//       const budgetMatch = x.budget?.toLowerCase().includes(query);
//       return firstNameMatch || budgetMatch;
//     });

//     setFilterList(filtered);
//   };

//   useEffect(() => {
//     // This effect will run when the component mounts and whenever the location changes
//     console.log("filterList updated:", filterList);
//   }, [filterList]);

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <section className="px-4">
//       <div className="flex gap-4 justify-between py-2">
//         <input
//           type="text"
//           placeholder="search"
//           className={`w-[280px] h-[40px] bg-white border p-2 rounded-lg outline-none `}
//           onChange={handleSearchChange}
//         />

//         <div className="flex items-center gap-2">
//           <select
//             name="serviceType"
//             // value={model.serviceType || ""}
//             // onChange={(e) => setModel("serviceType", e.target.value)} // Use the handler for select dropdown
//             className="bg-transparent px-8 py-2 rounded-[5px] border-gray-200 border text-gray-600 text-sm block w-full focus:outline-none"
//           >
//             <option value="">Role</option>
//             <option value="user">User</option>
//             <option value="nanny">Nanny</option>
//           </select>
//           <div>
//             <MdPersonAdd size={28} color="#d1d1d1" />
//           </div>
//         </div>
//       </div>
//       <div className="flex gap-4 pt-2 ">
//         <Table
//           tableClass="overflow-y-scroll  max-h-[420px] border w-full"
//           tableHeaderClass="bg-fuchsia-700 w-full text-white sticky top-0 capitalize font-montserrat"
//           datasource={allDatasource}
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
  { heading: "Image", key: "image" },
  { heading: "Name", key: "firstName" },
  { heading: "Email", key: "email" },
  { heading: "Role", key: "role" },
  { heading: "Region", key: "region" },
  { heading: "Detail", key: "detail" },
];

export default function Users() {
  const [allDatasource, setAllDatasource] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const getData = () => {
    Get("/auth")
      .then((res) => {
        if (res?.data) {
          const AllUserData = res?.data.map((item) => ({
            image: (
              <img
                src={
                  item?.image ||
                  "https://ghaliajewelry.com/wp-content/uploads/2016/08/dummy-prod-1.jpg"
                }
                className="h-[35px] w-[35px] rounded-full"
              />
            ),
            firstName: item.firstName,
            email: item.email,
            role: item.role,
            region: item.region || "N/A",
            detail: (
              <button onClick={() => handleSubModel(item._id)}>
                <HiOutlineDotsVertical />
              </button>
            ),
          }));
          setAllDatasource(AllUserData);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const handleSubModel = (id) => {
    console.log("Submodel clicked for ID:", id);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  // Filter logic
  useEffect(() => {
    let filteredData = [...allDatasource];

    if (searchQuery) {
      filteredData = filteredData.filter((item) =>
        item.firstName?.toLowerCase().includes(searchQuery)
      );
    }

    if (selectedRole) {
      filteredData = filteredData.filter((item) => item.role === selectedRole);
    }

    setFilterList(filteredData);
  }, [searchQuery, selectedRole, allDatasource]);

  useEffect(() => {
    getData();
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

        {/* Role Filter */}
        <div className="flex items-center gap-2">
          <select
            name="role"
            className="bg-transparent px-8 py-2 rounded-md border-gray-200 border text-gray-600 text-sm block w-full focus:outline-none"
            onChange={handleRoleChange}
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="nanny">Nanny</option>
          </select>
          <div>
            <MdPersonAdd size={28} color="#d1d1d1" />
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Table
          tableClass="overflow-y-scroll max-h-[420px] border w-full"
          tableHeaderClass="bg-fuchsia-700 w-full text-white sticky top-0 capitalize font-montserrat"
          datasource={filterList.length > 0 ? filterList : allDatasource}
          cols={AllRequestCol}
        />
      </div>
    </section>
  );
}
