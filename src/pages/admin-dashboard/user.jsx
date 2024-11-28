import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "@/assets";
import { Font1 } from "@/config/typography";
import IconHeader1 from "@/assets/dashboard/header-icon/icon-1.png";
import IconHeader2 from "@/assets/dashboard/header-icon/icon-2.png";
import IconHeader3 from "@/assets/dashboard/header-icon/icon-3.png";
import IconHeader4 from "@/assets/dashboard/header-icon/icon-4.png";
import profileIcon from "@/assets/dashboard/header-icon/user-icon.png";
import upload from "@/assets/dashboard/header-icon/upload.png";
import edit from "@/assets/dashboard/header-icon/edit.png";
import { removeData } from "@/config/helper";
import InputField from "@/component/common/input";
import FileUpload from "@/component/common/upload";
import TextArea from "@/component/common/textarea";
import { Close } from "@/config/app-constant";
import { Put, Get } from "@/config/api-method";
import Table from "@/component/common/table";
import { HiOutlineDotsVertical } from "react-icons/hi";

const AllRequestCol = [
  { heading: "Sno", key: "Sno" },
  { heading: "Region", key: "region" },
  { heading: "Name", key: "firstName" },
  { heading: "email", key: "email" },
  // { heading: "Location", key: "location" },
  // { heading: "Children Count", key: "childrenCount" },
  // { heading: "Children Ages", key: "childrenAges" },
  { heading: "Status", key: "status" },
  { heading: "Detail", key: "detail" },
];

export default function Users() {
  const [allDatasource, setAllDatasource] = useState([]);
  const [userDatasource, setUserDatasource] = useState([]);
  const [requestModelOpen, setRequestModelOpen] = useState(false);
  const [isSubModalOpen, setSubModalOpen] = useState(false);
  const [singleBooking, setSingleBooking] = useState({});

  const getAllData = () => {
    Get("/booking/All")
      .then((res) => {
        if (res?.data) {
          const bookingPromises2 = res.data.map((item, index) =>
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
                    className={`font-bold ${
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
              };
            })
          );

          // Resolve all booking promises
          Promise.all(bookingPromises2)
            .then((userData) => {
              setAllDatasource(userData);
            })
            .catch((err) => {
              console.error("Error resolving booking details:", err);
            });
        } else {
          console.log("No bookings data found.");
          setUserDatasource([]); // Set empty array if no data is returned
        }
        // if (res?.data) {
        //   const AllUserData = res?.data.map((item, index) => ({
        //     Sno: index + 1,
        //     name: item.name,
        //     email: item.email,
        //     region: item.region,
        //     location: item.location,
        //     childrenCount: item.childrenCount,
        //     childrenAges: item.childrenAges.join(", "), // Assuming `childrenAges` is an array
        //     schedule: item.schedule,
        //     status: (
        //       <span
        //         className={`font-bold ${
        //           item.status === "approved"
        //             ? "text-sky-800"
        //             : item.status === "pending"
        //             ? "text-green-800"
        //             : "text-red-800"
        //         }`}
        //       >
        //         {item.status}
        //       </span>
        //     ),
        //     detail: (
        //       <button onClick={() => handleSubModel(item._id)}>
        //         <HiOutlineDotsVertical />
        //       </button>
        //     ),
        //   }
        // ));
        //   setAllDatasource(AllUserData);
        // }
      })
      .catch((err) => {
        // console.log("Error fetching data:", err);
      });
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

  const handleSubModel = (id) => {
    getDataById(id);
    setSubModalOpen(true);
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <section className="px-4">
      <div className="flex gap-4 py-6 ">
        <Table
          tableHeaderClass="bg-gray-950 text-white sticky top-0"
          datasource={allDatasource}
          cols={AllRequestCol}
        />
      </div>
    </section>
  );
}
