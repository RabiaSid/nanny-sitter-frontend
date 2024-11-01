import React, { useState, useRef, useEffect } from 'react';
import profile from "@/assets/dashboard/list/profile.png";
import { H1, H5, Font2 } from '@/config/typography';
import { Get } from "@/config/api-method";
import { Close } from '../../config/app-constant';
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

export default function List() {

  const [listData, setListData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null); // Create a ref for the modal
  const [modalData, setModalData] = useState({});

  const handleOpenModal = (id) => {
    console.log(id)
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

  const getData = () => {
    Get("/auth/user")
      .then((res) => {
        setListData(res.data.data || []);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const getDataById = (id) => {
    Get(`/auth/user/${id}`)
      .then((res) => {
        setModalData(res?.data?.data);
        console.log(res?.data?.data)
      })
      .catch((err) => {
        console.error("Error fetching user data:", err); // Log the error
        console.log(err)
        // Optionally, handle the error (e.g., show a message to the user)
      });
  };

  useEffect(() => {
    getDataById();
  }, []);

  return (
    <>
      <div className="pb-[70px] py-[30px]">
        <div className="container mx-auto ">
          <div className="grid grid-cols-3 rounded-md gap-8">
            {/* Card Component */}
            {listData.map((x) => (
              <div key={x._id} className="border p-6 rounded-lg flex flex-col justify-center items-center text-center">
                <img src={profile} width="95px" height="95px" alt="Profile" />
                <H5 className="mt-6 mb-2 font-normal">{x.firstName || "Max"}</H5>
                <Font2 className="text-[#000] mb-2">{x.email || "Le Center"}</Font2>
                <Font2 className="text-[#000] mb-2"><span>$17/hr</span> | <span>3 years experience</span></Font2>
                <button onClick={() => handleOpenModal(x._id)} className="mb-4 mt-2 underline decoration-black font-normal">
                  <H5>view profile</H5>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div id="static-modal" className="fixed top-0 right-0 left-0  flex justify-center items-center w-full h-full bg-slate-50 bg-opacity-5 backdrop-blur-lg">
          <div className="p-4 w-full max-w-2xl max-h-full rounded-md relative" ref={modalRef}>
            <div className="bg-white p-4 rounded-md shadow-md border   overflow-y-scroll  h-[750px] z-0">
              <div className="flex flex-col items-center mb-2 text-center">
                <div className='h-[95px] w-[95px] relative'>
                  <img src={profile} alt="Profile" />
                  <div className='h-[30px] w-[30px] absolute top-[70%] left-[70%] z-10'>
                    <img src={icon1} alt="Profile" />
                  </div>
                </div>
                <H5 className="my-2 font-normal">{modalData?.firstName || "Max"}</H5>
              </div>
              <div className='flex items-center pb-2 border-b'>
                <img src={icon1} className='h-[30px] w-[30px]' />
                <h3 className="text-base font-semibold ms-4"> Featured Profile with PLUS</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center py-2">
                  <img src={icon2} className='h-[18px]' />
                  <p className="ml-2 text-gray-600">Active a day ago</p>
                </div>
                <div className="flex items-center">
                  <img src={icon3} className='h-[18px]' />
                  <p className="ml-2 text-gray-600">Responds within a day</p>
                </div>
                <div className="flex items-center">
                  <img src={icon4} className='h-[18px]' />
                  <p className="ml-2 text-gray-600">Denver</p>
                </div>
              </div>

              <h3 className="text-lg font-bold "> A little bit about us...</h3>
              <p className="text-gray-800 my-2">
                I am a very active gram to 7. Last yr was aid on school bus. This yr an
                Education Aid (paraprofessional) at a middle n elementary schools in
                the same district.
              </p>
              <p className="text-gray-600 mb-4 pb-2 border-b">
                I am crazy about children and understand the need for calm help in this
                crazy hectic world we live in. Excellent cook, baker, cleaner and
                "let's go to the park" person. Love animals.
              </p>
              <h3 className="text-lg font-bold ">Looking For</h3>
              <p className="text-gray-800 my-2">Availability</p>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <img src={icon5} className='h-[16px]' />
                  <p className="text-gray-600 ml-1">Start: ASAP</p>
                </div>
                <div className="flex items-center">
                  <img src={icon6} className='h-[16px]' />
                  <p className="text-gray-600 ml-1">Weekdays 08:00AM - 5:00 PM</p>
                </div>
                <div className="flex items-center">
                  <img src={icon7} className='h-[16px]' />
                  <p className="text-gray-600 ml-1">Live Out</p>
                </div>
                <div className="flex items-center">
                  <img src={icon8} className='h-[16px]' />
                  <p className="text-gray-600 ml-1">Full Time (nanny)</p>
                </div>
              </div>

              <p className="text-gray-800 my-2">Availability</p>
              <div className="flex justify-between border-b pb-2">
                <div className="flex items-center">
                  <img src={icon9} className='h-[16px]' />
                  <p className="text-gray-600 ml-1">Infants</p>
                </div>
                <div className="flex items-center">
                  <img src={icon10} className='h-[16px]' />
                  <p className="text-gray-600 ml-1">Toddlers</p>
                </div>
                <div className="flex items-center">
                  <img src={icon11} className='h-[16px]' />
                  <p className="text-gray-600 ml-1">Preschoolers</p>
                </div>
                <div className="flex items-center">
                  <img src={icon12} className='h-[16px]' />
                  <p className="text-gray-600 ml-1">Grade-schoolers</p>
                </div>
              </div>

              <h3 className="text-lg font-bold mt-4">Qualifications</h3>
              <p className="text-gray-800 my-2">Certification</p>
              <div className="flex justify-start">
                <div className="flex items-center ">
                  <img src={icon13} className='h-[16px]' />
                  <p className="text-gray-600 ml-1">Driver’s License</p>
                </div>
                <div className="flex items-center ml-6">
                  <img src={icon15} className='h-[16px]' />
                  <p className="text-gray-600 ml-1">CPR</p>
                </div>
                <div className="flex items-center ml-6">
                  <img src={icon16} className='h-[16px]' />
                  <p className="text-gray-600 ml-1">First Aid Kit</p>
                </div>
              </div>
              <p className="text-gray-800 my-2">Fluent Languages</p>
              <div className="flex justify-between border-b pb-2">
                <div className="flex items-center">
                  <img src={icon17} className='h-[16px]' />
                  <p className="text-gray-600 ml-1">English</p>
                </div>
              </div>

              <p className="text-gray-800 my-2">Other</p>
              <div className="flex justify-between border-b pb-2">
                <div className="flex items-center">
                  <img src={icon18} className='h-[16px]' />
                  <p className="text-gray-600 ml-1">Driver’s License</p>
                </div>
                <div className="flex items-center">
                  <img src={icon19} className='h-[16px]' />
                  <p className="text-gray-600 ml-1">Light Housekeeping</p>
                </div>
                <div className="flex items-center">
                  <img src={icon20} className='h-[16px]' />
                  <p className="text-gray-600 ml-1">Meal Prep</p>
                </div>
                <div className="flex items-center">
                  <img src={icon21} className='h-[16px]' />
                  <p className="text-gray-600 ml-1">Special Needs</p>
                </div>
              </div>

              <button onClick={handleCloseModal} className="absolute top-[-10px] left-[-10px]">
                <Close />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
