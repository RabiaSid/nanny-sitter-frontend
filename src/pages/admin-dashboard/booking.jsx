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
//   //   setModalOpen(true);
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

import React, { useState, useEffect, useRef } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdPersonAdd } from "react-icons/md";
import { Get, Put } from "@/config/api-method";
import Table from "@/component/common/table";
import { Close } from "@/config/app-constant";
import edit from "@/assets/dashboard/header-icon/edit.png";
import Toast from "@/component/common/toast";
import InputField from "@/component/common/input";
import TextArea from "@/component/common/textarea";

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [model, setModel] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  // const [user, setUser] = useState({});
  const [singleBooking, setSingleBooking] = useState({});
  const ModalRef = useRef(null);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  const fillModel = (key, val) => {
    setModel((prevModel) => ({
      ...prevModel,
      [key]: val,
    }));
  };

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

  const getDataById = (id) => {
    // First, fetch the booking data
    Get(`/booking/${id}`)
      .then((res) => {
        if (res?.data) {
          const booking = res?.data; // Save the booking data

          // Now, fetch the user data using the userId from the booking
          Get(`/auth/${booking.parentId}`)
            .then((userRes) => {
              const user = userRes?.data || {}; // Handle user data

              setSingleBooking({
                name: user.firstName,
                email: user.email,
                region: user.region,
                status: booking.status,
                message: booking.message,
                childrenCount: booking.childrenCount,
                childrenAges: booking.childrenAges,
              });
            })
            .catch((err) => {
              console.error("Error fetching user data:", err);
            });
        }
      })
      .catch((err) => {
        console.error("Error fetching booking data:", err);
      });
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSubModel = (id) => {
    console.log("Submodel clicked for ID:", id);
    getDataById(id);
    approvedBooking(id);
    setModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status); // Update selected status
  };

  // const save = () => {
  //   Put(
  //     "booking",
  //     {
  //       singleBooking,
  //       ...model,
  //     },
  //     singleBooking?._id
  //   )
  //     .then((res) => {
  //       showToast("Profile Update Successfully", "success");
  //       setModalOpen(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const approvedBooking = (id) => {
    console.log("singleBooking?._id", singleBooking?._id);
    console.log("id", id);
    Put(
      "booking/",
      {
        status: "approved",
      },
      id
    )
      .then((res) => {
        showToast("Booking Update Successfully", "success");
        isModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
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

  const showToast = (message, type) => {
    setToast({ isVisible: true, message, type });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToast({ ...toast, isVisible: false });
    }, 3000);
  };

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
      {isModalOpen && singleBooking && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0 flex justify-center items-center w-full h-full bg-slate-50 bg-opacity-5 backdrop-blur-lg"
        >
          <div
            className="p-4 w-full max-w-[55%] max-h-full rounded-md"
            ref={ModalRef}
          >
            <div className="bg-white px-8 rounded-md shadow-md border py-10 z-0 flex flex-col justify-center relative">
              <div className="absolute top-6 right-6"></div>
              <div className="mt-8">
                <h2 className="absolute font-bold text-lg top-3 left-[30%] right-[30%] text-center">
                  Booking Detail
                </h2>
                <div className="mb-2">
                  <p className="text-green-800 italic absolute top-3 left-auto right-3">
                    {singleBooking?.status || "Status not available"}
                  </p>
                </div>
                <div className="grid grid-cols-3 my-2">
                  <div className="flex flex-col rounded-md">
                    <h3 className="text-md font-semibold">Name:</h3>
                    <p className="text-sm text-gray-800">
                      {singleBooking?.name || "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col rounded-md">
                    <h3 className="text-md font-semibold">Email:</h3>
                    <p className="text-sm text-gray-800">
                      {singleBooking?.email || "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col rounded-md">
                    <h3 className="text-md font-semibold">Region:</h3>
                    <p className="text-sm text-gray-800">
                      {singleBooking?.region || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="mb-1 flex items-center">
                  <h3 className="text-md font-semibold">Parent Message:</h3>
                  <p className="text-sm text-gray-800 italic ps-2">
                    {singleBooking?.message || "No message available."}
                  </p>
                </div>
                <div className="flex items-center">
                  <h3 className="text-md font-semibold">Total Child:</h3>
                  <p className="text-sm text-gray-800 ps-2">
                    {singleBooking?.childrenCount || "No message available."}
                  </p>
                </div>
                <div className=" flex flex-wrap gap-2 mb-2">
                  {singleBooking?.childrenAges?.length > 0 ? (
                    singleBooking.childrenAges.map((age, index) => (
                      <div key={index} className="flex items-center">
                        <h3 className="text-sm font-semibold">
                          Child {index + 1} :
                        </h3>
                        <p className="text-sm text-gray-600 ps-2">{age}</p>
                      </div>
                    ))
                  ) : (
                    <li>No message available.</li>
                  )}
                </div>
                <div className="">
                  <h3 className="text-sm font-semibold">
                    Please update this booking status?
                  </h3>
                  <div className="flex my-2 gap-4">
                    <button
                      className="rounded-md px-6 py-1 bg-blue-500/85 text-white"
                      onClick={approvedBooking}
                    >
                      Accept
                    </button>
                    <button className="rounded-md px-6 py-1 bg-red-600/85  text-white">
                      Reject
                    </button>
                  </div>
                  <div className="my-4">
                    <TextArea
                      type="text"
                      label="Reason"
                      rows={3}
                      className=""
                    />
                  </div>
                  <button className="rounded-md border px-4 py-1 bg-gray-950/85  text-white w-[250px]">
                    Submit
                  </button>
                </div>
                {/* <div>
                  <span className="text-sm font-medium font-lato">
                    First Name
                  </span>
                  <InputField
                    disabled={isEdit ? false : true}
                    type="text"
                    value={model.firstName}
                    onChange={(e) => fillModel("firstName", e.target.value)}
                    placeholder={singleBooking?.firstName}
                    inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                  />
                </div>
                <div>
                  <span className="text-sm font-medium font-lato pb-2">
                    Last Name
                  </span>
                  <InputField
                    disabled={isEdit ? false : true}
                    type="text"
                    value={model.lastName}
                    onChange={(e) => fillModel("lastName", e.target.value)}
                    placeholder={singleBooking?.lastName}
                    inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                  />
                </div> */}

                {/* Service Type */}
                {/* <div>
                  <span className="text-sm font-medium font-lato pb-2">
                    Service Type
                  </span>
                  <select
                    name="status"
                    disabled={isEdit ? false : true}
                    value={model.serviceType || ""}
                    onChange={(e) => fillModel("serviceType", e.target.value)}
                    className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
                  >
                    <option value="">Status</option>
                    <option value="pending">pending</option>
                    <option value="accept">accept</option>
                    <option value="reject">reject</option>
                  </select>
                </div> */}

                {/* Region */}
                {/* <div>
                  <span className="text-sm font-medium font-lato pb-2">
                    Region
                  </span>
                  <select
                    name="region"
                    disabled={isEdit ? false : true}
                    value={model.region || ""}
                    onChange={(e) => fillModel("region", e.target.value)}
                    className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
                  >
                    <option value="">Select Region</option>
                    <option value="usa">USA</option>
                    <option value="canada">Canada</option>
                  </select>
                </div> */}

                {/* <div>
                  <span className="text-sm font-medium font-lato pb-2">
                    Zip Code
                  </span>
                  <InputField
                    disabled={isEdit ? false : true}
                    type="text"
                    value={model.zipCode}
                    onChange={(e) => fillModel("zipCode", e.target.value)}
                    placeholder={singleBooking?.zipCode}
                    inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                  />
                </div> */}
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-[-20px] right-[-20px]"
              >
                <Close />
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </section>
  );
}
