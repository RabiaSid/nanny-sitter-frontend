import React, { useState, useEffect, useRef } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdAddCircleOutline } from "react-icons/md";
import { Get, Put, Delete } from "@/config/api-method";
import Table from "@/component/common/table";
import { Close } from "@/config/app-constant";
import edit from "@/assets/dashboard/header-icon/edit.png";
import Toast from "@/component/common/toast";
import InputField from "@/component/common/input";
import TextArea from "@/component/common/textarea";
import { MdOutlineDeleteSweep } from "react-icons/md";

const AllRequestCol = [
  { heading: "Sno", key: "Sno" },
  { heading: "Region", key: "region" },
  { heading: "Name", key: "firstName" },
  { heading: "Email", key: "email" },
  { heading: "Status", key: "status" },
  { heading: "Detail", key: "detail" },
  { heading: "Remove", key: "remove" },
];

export default function Bookings() {
  const [allDatasource, setAllDatasource] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [model, setModel] = useState({});
  const [isReject, setIsReject] = useState(false);
  const [singleBooking, setSingleBooking] = useState({});
  const [singleBookingId, setSingleBookingId] = useState();
  const modalRef = useRef(null);
  const [isBookingModal, setBookingModal] = useState(false);
  const BookingmodalRef = useRef(null);
  const [loading, setLoading] = useState(true);
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
                rawStatus: item.status,
                remove: (
                  <button onClick={() => DeleteBooking(item._id)}>
                    <MdOutlineDeleteSweep
                      size={24}
                      className="text-red-700/55"
                    />
                  </button>
                ),
              };
            })
          );
          // Resolve all promises and update the state
          Promise.all(bookingPromises)
            .then((userData) => {
              setAllDatasource(userData);
              setLoading(false);
            })
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
                id: user._id,
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

  const DeleteBooking = (id) => {
    if (!id) {
      console.error("Invalid ID provided for deletion");
      return;
    }
    console.log("Deleting Booking with ID:", id);
    Delete(`/booking/${id}`)
      .then((res) => {
        showToast("Booking Removed Successfully", "success");
      })
      .catch((err) => {
        console.error("Error while deleting Booking:", err);
      });
  };

  const handleSubModel = (id) => {
    setSingleBookingId(id);
    getDataById(id);
    setModalOpen(true);
  };

  console.log(singleBooking);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status); // Update selected status
  };

  const approvedBooking = () => {
    Put(
      "booking",
      {
        status: "approved",
      },
      singleBookingId
    )
      .then((res) => {
        showToast("Profile Update Successfully", "success");
        setModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RejectBooking = () => {
    Put(
      "booking",
      {
        ...model,
        status: "reject",
      },
      singleBookingId
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        BookingmodalRef.current &&
        !BookingmodalRef.current.contains(event.target)
      ) {
        setBookingModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
            <button onClick={() => setBookingModal(true)}>
              <MdAddCircleOutline size={28} color="#d1d1d1" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-4 pt-2">
        <Table
          tableClass="overflow-y-scroll max-h-[420px] border w-full"
          tableHeaderClass="bg-sky-700 w-full text-white sticky top-0 capitalize font-montserrat"
          datasource={filterList.length > 0 ? filterList : allDatasource}
          cols={AllRequestCol}
          loading={loading}
          loaderColor="text-sky-700"
        />
      </div>
      {isModalOpen && singleBooking && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0 flex justify-center items-center w-full h-full bg-slate-50 bg-opacity-5 backdrop-blur-lg"
        >
          <div
            className="p-4 w-full max-w-[55%] max-h-full rounded-md"
            ref={modalRef}
          >
            <div className="bg-white px-8 rounded-md shadow-md border py-10 z-0 flex flex-col justify-center relative">
              <div className="absolute top-6 right-6"></div>
              <div className="mt-8">
                <h2 className="absolute font-bold text-lg top-3 left-[30%] right-[30%] text-center">
                  Booking Detail
                </h2>
                <div className="mb-2">
                  <p
                    className={`italic absolute top-3 text-sm left-auto right-3 capitalize
                  ${singleBooking?.status === "pending" && "text-green-800"}
                  ${singleBooking?.status === "approved" && "text-blue-800"}
                  ${singleBooking?.status === "reject" && "text-red-800"}
                  `}
                  >
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
                    <button
                      className={`rounded-md px-6 py-1  text-white ${
                        isReject ? "bg-gray-600/85" : "bg-red-600/85"
                      }`}
                      onClick={() => setIsReject(!isReject)}
                    >
                      {isReject ? "cancel" : "Reject"}
                    </button>
                  </div>
                  {isReject && (
                    <>
                      <div className="my-4">
                        <TextArea
                          type="text"
                          label="Reason"
                          rows={3}
                          className=""
                          value={model.rejectReason}
                          onChange={(e) =>
                            fillModel("rejectReason", e.target.value)
                          }
                        />
                      </div>
                      <button
                        className="rounded-md border px-4 py-1 bg-gray-950/85  text-white w-[250px]"
                        onClick={RejectBooking}
                      >
                        Submit
                      </button>
                    </>
                  )}
                </div>
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

      {isBookingModal && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0 flex justify-center items-center w-full h-full bg-slate-50 bg-opacity-5 backdrop-blur-lg"
        >
          <div
            className="p-4 w-full max-w-[45%] max-h-full rounded-md"
            ref={BookingmodalRef}
          >
            <div className="bg-white px-8 rounded-md shadow-md border py-10 z-0 flex flex-col justify-center relative">
              <button
                onClick={() => setBookingModal(false)}
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
