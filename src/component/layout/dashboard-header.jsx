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
import { add } from "@/redux/reducers/userSlice";
import Toast from "@/component/common/toast";
import Table from "@/component/common/table";
import { CgClose } from "react-icons/cg";
import { HiOutlineDotsVertical } from "react-icons/hi";

const cols = [
  { heading: "Sno", key: "Sno" },
  { heading: "Location", key: "location" },
  { heading: "Children Count", key: "childrenCount" },
  { heading: "Children Ages", key: "childrenAges" },
  { heading: "Schedule", key: "schedule" },
  { heading: "Status", key: "status" },
  { heading: "Detail", key: "detail" },
];
// const datasource = [
//   {
//     id: 1,
//     nannyName: "John Doe",
//     email: "john@example.com",
//     serviceType: "full-time",
//     status: <span className="text-green-800 font-bold">pending</span>,
//   },
//   {
//     id: 2,
//     nannyName: "Jane Smith",
//     email: "jane@example.com",
//     serviceType: "full-time",
//     status: <span className="text-green-800 font-bold">pending</span>,
//   },
//   {
//     id: 3,
//     nannyName: "Sam Brown",
//     email: "sam@example.com",
//     serviceType: "full-time",
//     status: <span className="text-sky-800 font-bold">Approved</span>,
//   },
//   {
//     id: 4,
//     nannyName: "Lisa White",
//     email: "lisa@example.com",
//     serviceType: "full-time",
//     status: <span className="text-red-800 font-bold">Rejected</span>,
//   },
// ];

export default function DashboardHeader({ children, onClickSearch }) {
  const [datasource, setDatasource] = useState([]);
  const [requestModelOpen, setRequestModelOpen] = useState(false);
  const requestModalRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dropdownRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [isSubModalOpen, setSubModalOpen] = useState(false);
  const subModalRef = useRef(null);
  const [serviceTypedropdown, setServiceTypeDropdown] = useState(false);
  const serviceTypedropdownRef = useRef(null);
  const [shareNannydropdown, setshareNannyDropdown] = useState(false);
  const shareNannydropdownRef = useRef(null);
  const [regiondropdown, setRegionDropdown] = useState(false);
  const regiondropdownRef = useRef(null);
  const userData = useSelector((state) => state.user);
  // console.log("User logged in: 22222", userData);
  const dispatch = useDispatch();
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  const showToast = (message, type) => {
    setToast({ isVisible: true, message, type });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToast({ ...toast, isVisible: false });
    }, 3000);
  };
  const [imageUri, setImageUri] = useState();
  // const [imageUri, setImageUri] = useState(
  //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAMFBMVEXk5ueutLff4uOnrrHn6eqrsbTZ3N25vsHHy82zuLvr7e7c3+DV2NnQ09W8wcPMz9FRQ01gAAADeUlEQVR4nO2b23LjIAxAuYibMfj//3ZxkqZJmtggWyKzw3no9PGMEAJLRIjBYDAYDAaDwWAwGAwGg4EQACBUjFFd/vsGANScXbiS/Sy6awFYH7SRd4zWLqmuXmCdfDC6eRmZ+2kVJf1q9BOvTlog/N8o/WrJ1MEKbPistKIzv1PaNLoGKzI7LR+y6RnLuYTgt5fuHixGK0hVcbrEis1prlUqseJyEnVrd5Xi2oOuQUoaz5FWsLQ4lXrFUturk/yGo1eqrQa/mEQuZRuVVqjXrz1Qa6iorVozaoU4q1q33i1UxCezQzhR16qIcSpMlFIJs3qlgFKuH2SclFkI12/COZVjmVAKMAVhhbIoWGSkZFBkTi23uxfoMh1XOlcIyyfm4LtJ0d3V/zep+RulCCP1lYmOPPokZUkQ8xcWT9y9c4XymJmwUpQH8hRwTqRXT+z2I6wIAn1N0LTfWLgPh0x6RwePChTdIXORipj9F0idcPuPvkWFKOqaWEkgUp2hlwe2NatIz70bU1PLsywe5YfoHdWU6yaQ1qgfGlr7K0wDmqmho6BntkFItRVPF/3GzqzvHidOJ6GqtiBrnFYqVpDdaf8bsMsUGebNxDIu9pi3b43bjVw6GF2YbNbvtIz0PR9xgPLhOVzGyLD0fu8Cwi7ZaK2NWf+GvNjveBlULOycUppjcfwKo6I0PdI3TtenXDYtPjt3uc6E4HL2yxzV+ryrg9Gk5iJTsnzlMc9Lahnpsk8RJkYxEDF5qZ9k/paF4paXqFgiBlP0Tm76PBaskBO1VomRN2/r5YaYzpawlAKkN6/dKrRM8ESVAkqQ0C3PEi6Ce/H2Y7caLZlPfrdUjrjGTHqHdmdqQaq8k+9QonVWboEN2P7rXy1zToXA9ck+a7nj9QHiOSv3YHX4lQmkY3vuvZY/5uRPy6YnK3ekO4R8hrBvJfGJ1diJagJbss5O8ScM7rOQMk4riFgBtZM0zdmOHxfX09rzx0+LGzCuaQFx0452q7ZeEXLY2GzVkOwTQ0JdCfVSzUMFNPULCJnLqVBZF2BmC1T90BQ7UkdaVYUK0M80cFJ1WUV1X/lA1eRNsSqVD6+a2zH+5Q8St5/qE+rlwREqUh24naTc7zJgfi5wjP39x3JneZHa/b0Px+Xulf2iwHnu/bAnpYLmZ3f2rTqw5zQYDAaDwaAD/wANKir9WY4qAQAAAABJRU5ErkJggg=="
  // );

  const [model, setModel] = useState({
    // DateofBirth: JSON.parse(JSON.stringify(new Date())),
    imageUrl: imageUri,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUri(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleServiceTypeDropdown = () => {
    setServiceTypeDropdown(!serviceTypedropdown);
  };

  const toggleshareNannyDropdown = () => {
    setshareNannyDropdown(!shareNannydropdown);
  };

  const toggleRegionDropdown = () => {
    setRegionDropdown(!regiondropdown);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        requestModalRef.current &&
        !requestModalRef.current.contains(event.target)
      ) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        serviceTypedropdownRef.current &&
        !serviceTypedropdownRef.current.contains(event.target)
      ) {
        setServiceTypeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareNannydropdownRef.current &&
        !shareNannydropdownRef.current.contains(event.target)
      ) {
        setshareNannyDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        regiondropdownRef.current &&
        !regiondropdownRef.current.contains(event.target)
      ) {
        setRegionDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    removeData("token");
    window.location.href = "/";
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  // const getData = () => {
  //   console.log("123456789");
  //   Get("/booking/all")
  //     .then((res) => {
  //       console.log(res?.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching data:", err);
  //     });
  // };

  // console.log(listData);

  // const getDataById = (id) => {
  //   Get(`/auth/${id}`)
  //     .then((res) => {
  //       console.log("Fetched nanny data:", res?.data); // Debugging line
  //       setModalData(res?.data);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching user data:", err);
  //     });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const save = () => {
    Put(
      "auth",
      {
        userData,
        ...model,
      },
      userData?._id
    )
      .then((res) => {
        showToast("Profile Update Successfully", "success");
        dispatch(add({ ...res.data?.data }));
        setModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRequestModal = () => {
    setRequestModelOpen(true);
  };

  const getData = () => {
    Get("/booking/all")
      .then((res) => {
        if (res?.data) {
          // Format the data as needed for the table
          const formattedData = res?.data.map((item, index) => ({
            Sno: index + 1,
            location: item.location,
            childrenCount: item.childrenCount,
            childrenAges: item.childrenAges.join(", "), // Assuming `childrenAges` is an array
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
          }));
          setDatasource(formattedData);
        }
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  };

  const getDataById = (id) => {
    Get(`/booking/${id}`)
      .then((res) => {
        console.log("Fetched nanny data: 123", res?.data); // Debugging line
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubModel = (id) => {
    getDataById(id);
    setSubModalOpen(true);
  };

  return (
    <>
      <header>
        <nav className="px-4 lg:px-6 py-2.5 bg-white shadow-lg my-2">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-2  relative ">
            <a href="https://flowbite.com" className="flex items-center ">
              <img src={Logo} className="mr-3 h-12 sm:h-14" alt="Nanny Logo" />
            </a>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto "
              id="mobile-menu-2"
            >
              <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                {userData.role === "nanny" ? (
                  <li className="underline-animation">
                    <Font1>For Families</Font1>
                  </li>
                ) : (
                  <li className="underline-animation">
                    <Font1>For Nannies</Font1>
                  </li>
                )}
              </ul>
            </div>
            <div className="flex items-center">
              <button
                className="text-black mx-4 flex flex-col items-center 
              text-center"
                onClick={onClickSearch}
              >
                <img
                  src={IconHeader1}
                  width="20px"
                  height="20px"
                  className="mb-1"
                />
                <span className="hidden sm:block">Search</span>
              </button>
              {children}
              <button className="text-black mx-4 flex flex-col items-center text-center">
                <img
                  src={IconHeader2}
                  width="20px"
                  height="20px"
                  className="mb-1"
                />
                <span className="hidden sm:block">Conversations</span>
              </button>
              <button
                className="text-black mx-4 flex flex-col items-center text-center"
                onClick={handleRequestModal}
              >
                <img
                  src={IconHeader3}
                  width="20px"
                  height="20px"
                  className="mb-1"
                />
                <span className="hidden sm:block">Request</span>
              </button>
              <button
                className="text-black mx-4 flex flex-col items-center text-center relative"
                onClick={toggleDropdown}
                ref={dropdownRef} // Attach the ref here
              >
                <img
                  src={IconHeader4}
                  width="20px"
                  height="20px"
                  className="mb-1"
                />
                <span className="hidden sm:block">Profile</span>
                {dropdownOpen && (
                  <div
                    className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg min-w-[250px] flex flex-col justify-end mt-16 transition-all duration-500 ease-in-out h-[150px] right-0`}
                  >
                    <ul className="text-sm text-gray-700 ">
                      <li>
                        <button
                          className=" mb-8 mx-3 flex justify-start items-center text-black text-lg font-semibold capitalize underline hover:no-underline"
                          onClick={() => handleOpenModal()}
                        >
                          <img src={profileIcon} className="pe-4" /> view
                          profile
                        </button>
                      </li>
                      <li onClick={logout}>
                        <a
                          href="/"
                          className="block px-4 py-2 mb-4 mx-3 bg-red-400 hover:bg-red-500 text-white hover:shadow"
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>
      {isModalOpen && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0  flex justify-center items-center w-full h-full bg-slate-50 bg-opacity-5 backdrop-blur-lg"
        >
          <div
            className="p-4 w-full max-w-[55%] max-h-full rounded-md"
            ref={modalRef}
          >
            <div className="bg-white px-8 rounded-md shadow-md border h-[750px] z-0 flex flex-col justify-center relative">
              <div className="absolute top-6 right-6">
                {isEdit ? (
                  <button>
                    <button
                      className="px-8 py-2 bg-red-500 text-white font-medium rounded-md  hover:bg-red-600"
                      onClick={save}
                    >
                      Save
                    </button>
                  </button>
                ) : (
                  <button
                    className="border border-red-500 rounded-md px-8 py-2 flex text-lg font-semibold"
                    onClick={handleEdit}
                  >
                    Edit <img src={edit} className="ps-4" />
                  </button>
                )}
                {/*  */}
              </div>

              <div className="gap-4 grid grid-cols-12 ">
                <div className="col-span-4 flex justify-center items-center">
                  <FileUpload
                    disabled={isEdit ? false : true}
                    onChange={handleImageChange}
                    className="bg-transparent mt-2 mb-4 rounded-full border-gray-200 border h-[180px] w-[180px]
                     text-[#666666] text-sm flex justify-center items-start
                      focus:outline-none "
                  >
                    <img src={upload} className="w-full h-full" />
                  </FileUpload>
                </div>
                <div className="col-span-8 flex flex-col justify-center">
                  <span
                    //   className="flex justify-center items-center bg-green-500
                    // rounded-sm w-[95px] h-[30px] opacity-50 text-lime-950 font-semibold border-lime-950 border-2 my-2 text-md"
                    className="text-lg font-semibold text-teal-700 italic font-lato"
                  >
                    Active--
                  </span>
                  <h4 className="text-xl font-medium font-lato">
                    <span>{userData?.firstName}</span>
                    <span>{userData?.lastName}</span>
                  </h4>
                  <h4 className="text-xl font-medium font-lato">
                    {userData?.email}
                  </h4>
                </div>
              </div>
              <div className="gap-4 grid grid-cols-3">
                <div>
                  <span className="text-xl font-medium font-lato">
                    First Name
                  </span>
                  <InputField
                    disabled={isEdit ? false : true}
                    type="text"
                    value={model.firstName}
                    onChange={(e) =>
                      setModel({ ...model, firstName: e.target.value })
                    }
                    con
                    placeholder={userData?.firstName}
                    inputClass="bg-transparent mt-0 mb-3 px-6 py-4 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                  />
                </div>
                <div>
                  <span className="text-xl font-medium font-lato">
                    Last Name
                  </span>
                  <InputField
                    disabled={isEdit ? false : true}
                    type="text"
                    value={model.lastName}
                    onChange={(e) =>
                      setModel({ ...model, lastName: e.target.value })
                    }
                    placeholder={userData?.lastName}
                    inputClass="bg-transparent mt-0 mb-3 px-6 py-4 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                  />
                </div>

                <div>
                  <span className="text-xl font-medium font-lato">
                    Service Type
                  </span>
                  <button
                    className="bg-transparent mt-0 mb-3 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none relative"
                    onClick={toggleServiceTypeDropdown}
                    disabled={isEdit ? false : true}
                    ref={serviceTypedropdownRef} // Attach the ref here
                  >
                    <span className="flex justify-between p-4">
                      {userData?.serviceType}
                      <svg
                        className={`w-3 h-3 ms-3 mt-1 ${
                          serviceTypedropdown ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                <div>
                  <span className="text-xl font-medium font-lato">Regoin</span>
                  <button
                    className="bg-transparent mt-0 mb-3 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none relative"
                    onClick={toggleRegionDropdown}
                    disabled={isEdit ? false : true}
                    ref={regiondropdownRef} // Attach the ref here
                  >
                    <span className="flex justify-between p-4">
                      Regoin
                      <svg
                        className={`w-3 h-3 ms-3 mt-1 ${
                          regiondropdown ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </span>
                    {regiondropdown && (
                      <div
                        className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-b-lg w-full 
                           transition-all duration-500 ease-in-out left-0
                           border-t-0 border-2 right-0`}
                      >
                        <ul className="text-sm text-gray-700 ">
                          <li className="py-2 hover:bg-red-300 hover:text-white">
                            usa
                          </li>
                          <li className="py-2 hover:bg-red-300 hover:text-white">
                            canada
                          </li>
                        </ul>
                      </div>
                    )}
                  </button>
                </div>
                <div>
                  <span className="text-xl font-medium font-lato">
                    Zip Code
                  </span>
                  <InputField
                    disabled={isEdit ? false : true}
                    type="text"
                    placeholder="Zip Code"
                    inputClass="bg-transparent mt-0 mb-3 px-6 py-4 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                  />
                </div>
                <div>
                  <span className="text-xl font-medium font-lato">
                    Share Nannny
                  </span>
                  <button
                    className="bg-transparent mt-0 mb-3 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none relative"
                    disabled={isEdit ? false : true}
                    onClick={toggleshareNannyDropdown}
                    ref={shareNannydropdownRef} // Attach the ref here
                  >
                    <span className="flex justify-between p-4">
                      Share Nannny
                      <svg
                        className={`w-3 h-3 ms-3 mt-1 ${
                          shareNannydropdown ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </span>
                    {shareNannydropdown && (
                      <div
                        className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-b-lg w-full 
                           transition-all duration-500 ease-in-out left-0
                           border-t-0 border-2 right-0`}
                      >
                        <ul className="text-sm text-gray-700 ">
                          <li className="py-2 hover:bg-red-300 hover:text-white">
                            Yes
                          </li>
                          <li className="py-2 hover:bg-red-300 hover:text-white">
                            No
                          </li>
                        </ul>
                      </div>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <span className="text-xl font-medium font-lato">
                  Job Describtion
                </span>
                <TextArea
                  disabled={isEdit ? false : true}
                  placeholder="message"
                  className="bg-transparent mt-0 mb-3 px-6 py-4 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                />
              </div>
              <button
                onClick={handleCloseModal}
                className="absolute top-[-15px] left-[-15px]"
              >
                <Close />
              </button>
            </div>
          </div>
        </div>
      )}

      {requestModelOpen && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0  flex justify-center items-center w-full h-full bg-slate-50 bg-opacity-5 backdrop-blur-lg "
        >
          <div className="p-4 rounded-md relative" ref={requestModalRef}>
            <Table datasource={datasource} cols={cols} />
            <div className="absolute top-[-3px] right-[-3px] bg-gray-950 rounded-full p-2">
              <CgClose
                size={24}
                color="#fff"
                onClick={() => {
                  setRequestModelOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {isSubModalOpen && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0  flex justify-center items-center w-full h-full bg-slate-50 bg-opacity-5 backdrop-blur-lg"
        >
          <div
            className="p-4 w-full max-w-[55%] max-h-full rounded-md"
            ref={subModalRef}
          >
            <div className="bg-white px-8 rounded-md shadow-md border h-[750px] z-0 flex flex-col justify-center relative">
              <button
                onClick={() => setSubModalOpen(false)}
                className="absolute top-[-25px] left-[-25px]"
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
    </>
  );
}
