import React, { useState, useRef, useEffect } from "react";
import DashboardHeader from "@/component/layout/dashboard-header";
import Alert from "@/component/dashboard/alert";
import Hero from "@/component/dashboard/hero";
import Filter from "@/component/dashboard/filter";
import List from "@/component/dashboard/list";
import ChatBot from "@/component/dashboard/chat-bot";
import { Get } from "@/config/api-method";
import { useNavigate, useLocation } from "react-router-dom";
import { Close } from "@/config/app-constant";
import { Post } from "@/config/api-method";
import Toast from "@/component/common/toast";
import icon1 from "@/assets/dashboard/model-icon/1.png";
import icon2 from "@/assets/dashboard/model-icon/2.png";
import icon3 from "@/assets/dashboard/model-icon/3.png";
import icon4 from "@/assets/dashboard/model-icon/4.png";
import icon5 from "@/assets/dashboard/model-icon/5.png";
import icon6 from "@/assets/dashboard/model-icon/6.png";
import icon7 from "@/assets/dashboard/model-icon/7.png";
import icon8 from "@/assets/dashboard/model-icon/8.png";
import icon9 from "@/assets/dashboard/model-icon/9.png";
import icon10 from "@/assets/dashboard/model-icon/10.png";
import icon11 from "@/assets/dashboard/model-icon/11.png";
import icon12 from "@/assets/dashboard/model-icon/12.png";
import icon13 from "@/assets/dashboard/model-icon/13.png";
import icon15 from "@/assets/dashboard/model-icon/15.png";
import icon16 from "@/assets/dashboard/model-icon/16.png";
import icon17 from "@/assets/dashboard/model-icon/17.png";
import icon18 from "@/assets/dashboard/model-icon/18.png";
import icon19 from "@/assets/dashboard/model-icon/19.png";
import icon20 from "@/assets/dashboard/model-icon/20.png";
import icon21 from "@/assets/dashboard/model-icon/21.png";
import icon22 from "@/assets/dashboard/model-icon/22.png";
import icon23 from "@/assets/dashboard/model-icon/23.png";
import TextArea from "@/component/common/textarea";
import profile from "@/assets/dashboard/list/profile.png";
import { H1, H5, Font2 } from "@/config/typography";
import FormatLastSeen from "../../component/common/date-format";
import { useSelector } from "react-redux";

export default function ForFamily() {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to track changes
  const [listData, setListData] = useState([]);
  const [modalData, setModalData] = useState({});
  const [filterList, setFilterList] = useState([]);
  const [nannyId, setNannyId] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const modalRef = useRef(null);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const [childCount, setChildCount] = useState(null);
  const [booking, setBooking] = useState({
    parentId: userData?._id,
    nannyId: modalData._id,
    location: userData?.region,
    message: "",
    childrenCount: "",
    childrenAges: [],
    budget: "",
    status: "pending",
    schedule: "", // Single string that will contain combined days and timing, like "Monday Wednesday Friday Evening (4 PM - 8 PM)"
    timing: "", // Timing selected from dropdown
    selectedDays: [],
    // budget: userData?.budget,
    // startTime: null,
    // endTime: null,
  });

  const fillModel = (key, val) => {
    setBooking({ ...booking, [key]: val });
  };

  const getData = () => {
    Get("/auth")
      .then((res) => {
        const nannies =
          res?.data?.filter((user) => user.role === "nanny") || [];
        setListData(nannies);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  console.log(listData);

  const getDataById = (id) => {
    Get(`/auth/${id}`)
      .then((res) => {
        console.log("Fetched nanny data:", res?.data); // Debugging line
        setModalData(res?.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // This effect will run when the component mounts and whenever the location changes
    // console.log("filterList updated:", filterList);
  }, [filterList, location]); // Include location in the dependency array

  const [isVisible, setIsVisible] = useState(false);

  const toggleInput = () => {
    setIsVisible((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();

    if (!query) {
      // If the input is empty, clear the filterList to show banner and filter
      setFilterList([]);
      return;
    }

    const filtered = listData.filter((x) => {
      const firstNameMatch = x.firstName?.toLowerCase().includes(query);
      const budgetMatch = x.budget?.toLowerCase().includes(query);
      return firstNameMatch || budgetMatch;
    });

    setFilterList(filtered);
  };

  const handleOpenModal = (id) => {
    getDataById(id);
    setModalOpen(true);
    setNannyId(id);
  };

  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   if (modalData._id) {
  //     setBooking((prevBooking) => ({
  //       ...prevBooking,
  //       nannyId: modalData._id, // Set nannyId when modalData is available
  //     }));
  //   }
  // }, [modalData]);

  const showToast = (message, type) => {
    setToast({ isVisible: true, message, type });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToast({ ...toast, isVisible: false });
    }, 3000);
  };

  useEffect(() => {
    if (modalData._id) {
      setBooking((prevBooking) => ({
        ...prevBooking,
        nannyId: modalData._id,
      }));
    }
  }, [modalData]);

  const AddBooking = () => {
    setShowBooking(true);
  };

  const newBooking = () => {
    booking.status = "pending";
    console.log("Booking data:", booking);
    Post("booking", booking)
      .then((res) => {
        console.log(res?.data);
        if (res?.data) {
          showToast("Booking is Success", "success");
          setModalOpen(false);
          setBooking({
            parentId: userData?._id,
            nannyId: modalData._id,
            location: userData?.region,
            message: "",
            childrenCount: "",
            childrenAges: [],
            budget: "",
            status: "pending",
            schedule: "",
            timing: "",
            selectedDays: [],
          });
        } else {
          showToast("Unexpected response format.", "error");
        }
      })
      .catch((err) => {
        console.log(err);
        showToast("Login failed. Please check your credentials.", "error");
      });
  };

  const handleChildCountChange = (e) => {
    const newCount = parseInt(e.target.value) || 0;
    setChildCount(newCount);
    setBooking((prevBooking) => ({
      ...prevBooking,
      childrenCount: newCount,
      childrenAges: new Array(newCount).fill(""),
    }));
  };

  const handleAgeChange = (index, value) => {
    const newAges = [...booking.childrenAges];
    newAges[index] = value;
    setBooking({ ...booking, childrenAges: newAges });
  };

  // Handle day selection
  const handleDaySelection = (day) => {
    // Check if the timing is selected
    if (!booking.timing) {
      alert("Please select a timing first.");
      return;
    }

    // Toggle day selection
    let updatedDays = [...booking.selectedDays];
    if (updatedDays.includes(day)) {
      // Remove the day if it's already selected
      updatedDays = updatedDays.filter((item) => item !== day);
    } else {
      // Add the day if it's not selected
      updatedDays.push(day);
    }

    // Update the selectedDays array
    setBooking({
      ...booking,
      selectedDays: updatedDays,
    });
  };

  // Handle timing selection
  const handleTimingSelection = (e) => {
    const selectedTiming = e.target.value;

    // Update the timing in booking
    setBooking({ ...booking, timing: selectedTiming });
  };

  // Generate the schedule string
  const generateSchedule = () => {
    if (booking.selectedDays.length === 0 || !booking.timing) {
      return "";
    }

    // Create the schedule string: "Monday Wednesday Friday Evening (4 PM - 8 PM)"
    return `${booking.selectedDays.join(" ")} ${booking.timing}`;
  };

  // Use the generated schedule
  const schedule = generateSchedule();

  booking.schedule = schedule;

  return (
    <>
      <DashboardHeader onClickSearch={toggleInput}>
        <div
          className={`overflow-hidden transition-all rounded-8 border-b-2 border-red-300 duration-300 absolute left-[30%] right-[30%] w-[40%] ${
            isVisible ? "max-h-40 block" : "max-h-0 hidden"
          }`}
        >
          <input
            type="text"
            placeholder="search"
            className={`w-full h-[60px] bg-white p-2 rounded-8 transition-transform transform outline-none shadow-2xl ${
              isVisible ? "translate-y-0" : "-translate-y-10"
            }`}
            onChange={handleSearchChange}
          />
        </div>
      </DashboardHeader>
      {filterList.length > 0 ? null : (
        <>
          <Alert />
          <Hero />
          <Filter />
        </>
      )}
      <div className="pb-[70px] py-[30px]">
        <div className="container mx-auto ">
          <div className="grid grid-cols-3 rounded-md gap-8">
            {filterList.length > 0
              ? filterList.map((x, i) => (
                  <List
                    key={x._id}
                    image={x.image || profile}
                    firstName={x.firstName}
                    email={x.email}
                    budget={`${x?.budget} | 3 years experience`}
                    getDataById={getDataById}
                    modalData={modalData}
                  >
                    <button
                      onClick={() => handleOpenModal(x._id)}
                      className="mb-4 mt-2 underline decoration-black font-normal"
                    >
                      <H5>view profile</H5>
                    </button>
                  </List>
                ))
              : listData.map((x, i) => (
                  <List
                    key={x._id}
                    image={x.image || profile}
                    firstName={x.firstName}
                    email={x.email}
                    budget={`${x?.budget} | 3 years experience`}
                    getDataById={getDataById}
                    modalData={modalData}
                  >
                    <button
                      onClick={() => handleOpenModal(x._id)}
                      className="mb-4 mt-2 underline decoration-black font-normal"
                    >
                      <H5>view profile</H5>
                    </button>
                  </List>
                ))}
          </div>
        </div>
      </div>
      {/* <List data={listData} getDataById={getDataById} modalData={modalData} /> */}
      <ChatBot />

      {isModalOpen && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0  flex justify-center items-center w-full h-full bg-black-50 bg-opacity-5 backdrop-blur-lg"
        >
          <div
            className="p-4 w-full max-h-full rounded-md relative  max-w-[550px]"
            ref={modalRef}
          >
            <div className="bg-white p-4 rounded-md shadow-md border overflow-y-scroll  h-[90vh] z-0 relative">
              <div className="flex flex-col items-center mb-2 text-center">
                <div className="h-[95px] w-[95px] relative">
                  <img src={profile} alt="Profile" />
                  <div className="h-[30px] w-[30px] absolute top-[70%] left-[70%] z-10">
                    <img src={icon1} alt="Profile" />
                  </div>
                </div>
                <H5 className="my-2 font-normal">
                  {modalData?.firstName || "Max"}
                </H5>
              </div>
              <div className="flex items-center pb-2 border-b">
                <img src={icon1} className="h-[30px] w-[30px]" />
                <h3 className="text-base font-semibold ms-4">
                  Featured Profile with PLUS
                </h3>
              </div>
              {showBooking === true ? (
                <>
                  <h3 className="text-lg font-bold mt-4 ">Booking</h3>
                  {/* <div className="mt-6 mb-4 grid grid-cols-2 gap-8">
                    <div className="flex flex-col border px-3 py-2 rounded-md relative">
                      <label className="w-[50px] font-semibold italic h-[25px] text-center absolute top-[-15px] bg-white">
                        Start
                      </label>
                      <input
                        aria-label="Date"
                        type="date"
                        placeholder="Start Time"
                        value={booking.startTime || ""}
                        onChange={(e) => fillModel("startTime", e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col border px-3 py-2 rounded-md relative">
                      <label className="w-[50px] font-semibold italic h-[25px] text-center absolute top-[-15px] bg-white">
                        End
                      </label>
                      <input
                        aria-label="Date"
                        type="date"
                        placeholder="Start Time"
                        value={booking.endTime || ""}
                        onChange={(e) => fillModel("endTime", e.target.value)}
                      />
                    </div>
                  </div> */}

                  {/* Day Selection Buttons */}
                  <div className="flex flex-wrap gap-1 my-2">
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day, index) => (
                      <span
                        key={index}
                        onClick={() => handleDaySelection(day)}
                        className={`py-1 px-3 border rounded-full text-gray-700 cursor-pointer text-sm ${
                          booking.selectedDays.includes(day)
                            ? "border-red-600 text-red-800"
                            : ""
                        }`}
                      >
                        {day}
                      </span>
                    ))}
                  </div>

                  {/* Timing Selection Dropdown */}
                  <select
                    value={booking.timing}
                    onChange={handleTimingSelection}
                    className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
                  >
                    <option value="">Select Timing</option>
                    <option value="Morning (8 AM - 12 PM)">
                      Morning (8 AM - 12 PM)
                    </option>
                    <option value="Afternoon (12 PM - 4 PM)">
                      Afternoon (12 PM - 4 PM)
                    </option>
                    <option value="Evening (4 PM - 8 PM)">
                      Evening (4 PM - 8 PM)
                    </option>
                    <option value="Night (8 PM - 12 AM)">
                      Night (8 PM - 12 AM)
                    </option>
                  </select>

                  <div>
                    <h3 className="text-sm font-semibold">
                      Selected Schedule:
                    </h3>
                    <p className="text-sm">
                      {schedule ? schedule : "No schedule selected"}
                    </p>
                  </div>
                  <div className="my-2">
                    <input
                      type="text"
                      disabled={userData?.budget ? true : false}
                      placeholder={
                        userData?.budget
                          ? userData?.budget
                          : "Enter Your budget"
                      }
                      value={
                        userData?.budget ? userData?.budget : booking.budget
                      }
                      onChange={(e) =>
                        setBooking({ ...booking, budget: e.target.value })
                      }
                      className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="">
                    <h3 className="text-sm font-semibold">
                      Number of children
                    </h3>
                    <input
                      type="number"
                      placeholder="Number of children"
                      value={booking.childrenCount || ""}
                      onChange={handleChildCountChange}
                      className="flex mt-2 h-10 w-full border-[1px] rounded-md px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>

                  <div className=" flex gap-2">
                    {Array.from({ length: booking.childrenCount }).map(
                      (_, index) => (
                        <div key={index} className="mt-2 max-w-[150px]">
                          <input
                            type="number"
                            value={booking.childrenAges[index] || ""}
                            onChange={(e) =>
                              handleAgeChange(index, e.target.value)
                            }
                            placeholder={`Age of Child ${index + 1}`}
                            className="flex h-10 w-full px-3 py-2 text-sm border-[1px] rounded-sm focus:outline-none"
                          />
                        </div>
                      )
                    )}
                  </div>

                  {/* <div className="border-[1px] border-[#e5e7eb] flex  rounded-md">
                    <input
                      type="number"
                      placeholder="Number of children"
                      value={booking.childrenCount}
                      onChange={(e) =>
                        fillModel({
                          ...booking,
                          childrenCount: e.target.value,
                        })
                      }
                      className="flex h-10 w-full px-3 py-2 text-sm"
                    />
                    <button className="px-4 bg-red-500  rounded-r-sm text-white">
                      Add
                    </button>
                  </div>

                  <div className="border-[1px] flex  ">
                    {Array.from({ length: booking.childrenCount }).map(
                      (_, index) => (
                        <div key={index} className="my-2">
                          <input
                            type="number"
                            value={booking.childrenAges[index] || ""}
                            onChange={(e) => {
                              const newAges = [...booking.childrenAges];
                              newAges[index] = e.target.value;
                              setBooking({ ...booking, childrenAges: newAges });
                            }}
                            placeholder={`Age of Child ${index + 1}`}
                            className="flex h-10 w-full px-3 py-2 text-sm"
                          />
                        </div>
                      )
                    )}
                  </div> */}
                  <div className="my-4">
                    <TextArea
                      type="text"
                      label="Message"
                      value={booking.message || ""}
                      onChange={(e) => fillModel("message", e.target.value)}
                      rows={5}
                      className=""
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center pt-3">
                      <img src={icon2} className="h-[18px]" />
                      <p className="ml-2 text-gray-600">
                        <FormatLastSeen date={modalData?.lastSeen} />
                      </p>
                    </div>
                    <div className="flex items-center pt-3">
                      <img src={icon3} className="h-[18px]" />
                      <p className="ml-2 text-gray-600">
                        Responds within a day
                      </p>
                    </div>
                    <div className="flex items-center pt-3">
                      <img src={icon4} className="h-[18px]" />
                      <p className="ml-2 text-gray-600">{modalData?.region}</p>
                    </div>
                    <div className="flex items-center pb-3">
                      <img src={icon23} className="h-[18px]" />
                      <p className="ml-2 text-gray-600">{modalData?.budget}</p>
                    </div>
                    <div className="flex items-center pb-3">
                      <img src={icon9} className="h-[18px]" />
                      <p className="ml-2 text-gray-600">
                        {modalData?.childAgeGroup}
                      </p>
                    </div>
                    <div className="flex items-center pb-3">
                      <img src={icon10} className="h-[18px]" />
                      <p className="ml-2 text-gray-600">
                        specail child:
                        <strong>
                          {modalData?.careSpecialChild === true ? "yes" : "no"}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold ">
                    A little bit about us...
                  </h3>
                  <p className="text-gray-800 my-2">
                    {modalData?.aboutYourself}
                  </p>
                  <h3 className="text-lg font-bold border-t pt-3">
                    Looking For
                  </h3>
                  <p className="text-gray-800 my-1 font-semibold">
                    Availability
                  </p>
                  <div className="flex justify-between pe-3">
                    <div className="flex items-center">
                      <img src={icon5} className="h-[16px]" />
                      <p className="text-gray-600 ml-1">Start: ASAP</p>
                    </div>
                    <div className="flex items-center">
                      <img src={icon6} className="h-[16px]" />
                      <p className="text-gray-600 ml-1">
                        {modalData?.availability?.length > 0
                          ? modalData?.availability.join(", ")
                          : "any-time"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <img src={icon7} className="h-[16px]" />
                      <p className="text-gray-600 ml-1">
                        {modalData?.isLiven === true ? "Live In" : "Live Out"}
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
                      <img src={icon8} className="h-[16px]" />
                      <p className="text-gray-600 ml-1">
                        {modalData?.serviceType}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mt-2">Requirments</h3>
                  <div>
                    <p className="text-gray-800 my-1 font-semibold">
                      Certification
                    </p>
                    <div className="flex justify-start">
                      {modalData?.isDrivingLicense && (
                        <div className="flex items-center ">
                          <img src={icon18} className="h-[22px]" />
                          <p className="text-gray-600 ml-1">Driver’s License</p>
                        </div>
                      )}
                      {modalData?.isCPRcertificate && (
                        <div className="flex items-center ml-6">
                          <img src={icon16} className="h-[22px]" />
                          <p className="text-gray-600 ml-1">CPR certificate</p>
                        </div>
                      )}
                      {modalData?.isAIDcertificate && (
                        <div className="flex items-center ml-6">
                          <img src={icon17} className="h-[22px]" />
                          <p className="text-gray-600 ml-1">First Aid Kit</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-800 my-1 font-semibold">
                      Fluent Languages
                    </p>
                    <div className="flex justify-start">
                      <div className="flex items-center ">
                        <img src={icon15} className="h-[22px]" />
                        <p className="text-gray-600 ml-1 capitalize">
                          {modalData?.Language}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-800 my-1 font-semibold">Other</p>
                  <div className="flex justify-start gap-4">
                    <div className="flex items-center ">
                      <img src={icon20} className="h-[22px]" />
                      <p className="text-gray-600 ml-1">
                        Do HouseKeeping:
                        <strong>
                          {modalData?.doHouseKeeping === true ? "yes" : "no"}
                        </strong>
                      </p>
                    </div>
                    <div className="flex items-center ">
                      <img src={icon19} className="h-[22px]" />
                      <p className="text-gray-600 ml-1">
                        Do Meal Preparing:
                        <strong>
                          {modalData?.doHouseKeeping === true ? "yes" : "no"}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800 mt-2 mb-1 font-semibold">
                    Start Experience From
                  </p>
                  <div className="flex justify-start">
                    <div className="flex items-center ">
                      <img src={icon15} className="h-[22px]" />
                      <p className="text-gray-600 ml-1 capitalize">
                        {modalData?.experience}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {showBooking === false ? (
                <div className="py-2 absolute top-0 right-0">
                  <button
                    className="px-4 py-2 border-none text-white rounded-[5px] me-2 flex bg-emerald-900/60 text-sm"
                    onClick={AddBooking}
                    // onClick={newBooking}
                  >
                    Add Booking
                  </button>
                </div>
              ) : (
                <div className="py-2 absolute top-0 right-0">
                  <button
                    className="px-4 py-2 border-none text-white rounded-[5px] me-2 flex bg-cyan-900/80 text-sm"
                    onClick={newBooking}
                  >
                    Book Now
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={handleCloseModal}
              className="absolute top-[-5px] left-[-5px] "
            >
              <Close />
            </button>
          </div>
        </div>
      )}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
  );
}
