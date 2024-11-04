import React, { useState, useRef, useEffect } from "react";
import DashboardHeader from "@/component/layout/dashboard-header";
import Alert from "@/component/dashboard/alert";
import Hero from "@/component/dashboard/hero";
import Filter from "@/component/dashboard/filter";
import List from "@/component/dashboard/list";
import ChatBot from "../../component/dashboard/chat-bot";
import { Get } from "../../config/api-method";
import { useNavigate, useLocation } from "react-router-dom";
import { Close } from "../../config/app-constant";
import icon1 from "../../assets/dashboard/model-icon/1.png";
import icon2 from "../../assets/dashboard/model-icon/2.png";
import icon3 from "../../assets/dashboard/model-icon/3.png";
import icon4 from "../../assets/dashboard/model-icon/4.png";
import icon5 from "../../assets/dashboard/model-icon/5.png";
import icon6 from "../../assets/dashboard/model-icon/6.png";
import icon7 from "../../assets/dashboard/model-icon/7.png";
import icon8 from "../../assets/dashboard/model-icon/8.png";
import icon9 from "../../assets/dashboard/model-icon/9.png";
import icon10 from "../../assets/dashboard/model-icon/10.png";
import icon11 from "../../assets/dashboard/model-icon/11.png";
import icon12 from "../../assets/dashboard/model-icon/12.png";
import icon13 from "../../assets/dashboard/model-icon/13.png";
import icon15 from "../../assets/dashboard/model-icon/15.png";
import icon16 from "../../assets/dashboard/model-icon/16.png";
import icon17 from "../../assets/dashboard/model-icon/17.png";
import icon18 from "../../assets/dashboard/model-icon/18.png";
import icon19 from "../../assets/dashboard/model-icon/19.png";
import icon20 from "../../assets/dashboard/model-icon/20.png";
import icon21 from "../../assets/dashboard/model-icon/21.png";
import icon22 from "../../assets/dashboard/model-icon/22.png";
import TextArea from "../../component/common/textarea";
import profile from "@/assets/dashboard/list/profile.png";
import { H1, H5, Font2 } from "@/config/typography";

export default function ForNanny() {
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to track changes
  const [listData, setListData] = useState([]);
  const [modalData, setModalData] = useState({});
  const [filterList, setFilterList] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  const getData = () => {
    Get("/auth")
      .then((res) => {
        const nannies = res?.data?.filter((user) => user.role === "user") || [];
        setListData(nannies);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const getDataById = (id) => {
    Get(`/auth/${id}`)
      .then((res) => {
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
    console.log("filterList updated:", filterList);
  }, [filterList, location]); // Include location in the dependency array

  const [isVisible, setIsVisible] = useState(false);

  const toggleInput = () => {
    setIsVisible((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
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
      <Hero />
      <Filter />
      <div className="pb-[70px] py-[30px]">
        <div className="container mx-auto ">
          <div className="grid grid-cols-3 rounded-md gap-8">
            {filterList.length > 0
              ? filterList.map((x, i) => (
                  <List
                    key={x._id}
                    firstName={x.firstName}
                    email={x.email}
                    budget={x.budget}
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
              : // <TaskCard
                //   key={i}
                //   title={x.name}
                //   description={x.description}
                //   image2={ImageDesign}
                // />
                listData.map((x, i) => (
                  <List
                    key={x._id}
                    firstName={x.firstName}
                    email={x.email}
                    budget={x.budget}
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
          className="fixed top-0 right-0 left-0  flex justify-center items-center w-full h-full bg-slate-50 bg-opacity-5 backdrop-blur-lg"
        >
          <div
            className="p-4 w-full max-w-2xl max-h-full rounded-md relative"
            ref={modalRef}
          >
            <div className="bg-white p-4 rounded-md shadow-md border   overflow-y-scroll  h-[750px] z-0">
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
                  {" "}
                  Featured Profile with PLUS
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center pt-3">
                  <img src={icon2} className="h-[18px]" />
                  <p className="ml-2 text-gray-600">Active a day ago</p>
                </div>
                <div className="flex items-center pt-3">
                  <img src={icon3} className="h-[18px]" />
                  <p className="ml-2 text-gray-600">Responds within a day</p>
                </div>
                <div className="flex items-center pt-3">
                  <img src={icon4} className="h-[18px]" />
                  <p className="ml-2 text-gray-600">Denver</p>
                </div>
                <div className="flex items-center pb-3">
                  <img src={icon2} className="h-[18px]" />
                  <p className="ml-2 text-gray-600">Active a day ago</p>
                </div>
                <div className="flex items-center pb-3">
                  <img src={icon3} className="h-[18px]" />
                  <p className="ml-2 text-gray-600">Responds within a day</p>
                </div>
                <div className="flex items-center pb-3">
                  <img src={icon4} className="h-[18px]" />
                  <p className="ml-2 text-gray-600">Denver</p>
                </div>
              </div>

              <h3 className="text-lg font-bold "> A little bit about us...</h3>
              <p className="text-gray-800 my-2">
                I am a very active gram to 7. Last yr was aid on school bus.
                This yr an Education Aid (paraprofessional) at a middle n
                elementary schools in the same district.
              </p>
              <p className="text-gray-600 mb-4 pb-2 border-b">
                I am crazy about children and understand the need for calm help
                in this crazy hectic world we live in. Excellent cook, baker,
                cleaner and "let's go to the park" person. Love animals.
              </p>
              <h3 className="text-lg font-bold ">Looking For</h3>
              <p className="text-gray-800 my-2">Availability</p>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <img src={icon5} className="h-[16px]" />
                  <p className="text-gray-600 ml-1">Start: ASAP</p>
                </div>
                <div className="flex items-center">
                  <img src={icon6} className="h-[16px]" />
                  <p className="text-gray-600 ml-1">
                    Weekdays 08:00AM - 5:00 PM
                  </p>
                </div>
                <div className="flex items-center">
                  <img src={icon7} className="h-[16px]" />
                  <p className="text-gray-600 ml-1">Live Out</p>
                </div>
                <div className="flex items-center">
                  <img src={icon8} className="h-[16px]" />
                  <p className="text-gray-600 ml-1">Full Time (nanny)</p>
                </div>
              </div>

              <p className="text-gray-800 my-2">Availability</p>
              <div className="flex justify-between border-b pb-2">
                <div className="flex items-center">
                  <img src={icon9} className="h-[16px]" />
                  <p className="text-gray-600 ml-1">Infants</p>
                </div>
                <div className="flex items-center">
                  <img src={icon10} className="h-[16px]" />
                  <p className="text-gray-600 ml-1">Toddlers</p>
                </div>
                <div className="flex items-center">
                  <img src={icon11} className="h-[16px]" />
                  <p className="text-gray-600 ml-1">Preschoolers</p>
                </div>
                <div className="flex items-center">
                  <img src={icon12} className="h-[16px]" />
                  <p className="text-gray-600 ml-1">Grade-schoolers</p>
                </div>
              </div>

              <h3 className="text-lg font-bold mt-4">Qualifications</h3>
              <p className="text-gray-800 my-2">Certification</p>
              <div className="flex justify-start">
                <div className="flex items-center ">
                  <img src={icon13} className="h-[16px]" />
                  <p className="text-gray-600 ml-1">Driver’s License</p>
                </div>
                <div className="flex items-center ml-6">
                  <img src={icon15} className="h-[16px]" />
                  <p className="text-gray-600 ml-1">CPR</p>
                </div>
                <div className="flex items-center ml-6">
                  <img src={icon16} className="h-[16px]" />
                  <p className="text-gray-600 ml-1">First Aid Kit</p>
                </div>
              </div>
              <p className="text-gray-800 my-2">Fluent Languages</p>
              <div className="flex justify-between pb-2">
                <div className="flex items-center">
                  <img src={icon17} className="h-[16px]" />
                  <p className="text-gray-600 ml-1">English</p>
                </div>
              </div>

              <div className="my-4">
                <TextArea
                  type="text"
                  label="Message"
                  // value={model[question.key] || ''}
                  // onChange={(e) => fillModel(question.key, e.target.value)}
                  minlength={30}
                  className=""
                />
              </div>

              <div className="py-2">
                <button className="px-16 py-3 border-none text-white rounded-[25px] me-2 flex bg-[#ff6f61]">
                  <a>Next</a>
                </button>
              </div>

              <button
                onClick={handleCloseModal}
                className="absolute top-[-10px] left-[-10px]"
              >
                <Close />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
