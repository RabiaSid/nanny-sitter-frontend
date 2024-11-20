import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Put } from "@/config/api-method";
import { add } from "@/redux/reducers/userSlice";
import Toast from "@/component/common/toast";
import { H1, H6, Font1 } from "@/config/typography";

export default function Alert() {
  const [isShow, setIsShow] = useState(true);
  const [model, setModel] = useState({});
  const userData = useSelector((state) => state.user);
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

  const handleClick = () => {
    setIsShow(!isShow);
  };

  const save = (set) => {
    Put(
      "auth",
      {
        // userData,
        ...model,
        status: set,
      },
      userData?._id
    )
      .then((res) => {
        showToast("Service Type Update Successfully", "success");
        dispatch(add({ ...res.data?.data }));
        setIsShow(false);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <>
      {isShow ? (
        <div className="py-[10px]">
          <div className="container mx-auto ">
            <div className="flex justify-between items-center bg-[#FF6F61] py-6 px-8 rounded-md">
              <div className=" ">
                <Font1 className="font-montserrat text-[#fff] ">
                  How often do you need a nanny?
                </Font1>
              </div>
              <div className="flex items-center">
                <button
                  className="px-6 py-2 border border-gray-300 text-gray-100 font-medium rounded-[25px] me-2 hover:text-white hover:bg-red-500 text-[14px]"
                  onClick={() => save("part-time")}
                >
                  Part Time
                </button>
                <button
                  className="px-6 py-2 border border-gray-300 text-gray-100 font-medium rounded-[25px] me-2 hover:text-white hover:bg-red-500 text-[14px]"
                  onClick={() => save("full-time")}
                >
                  Full TIme
                </button>
                <button
                  className="px-6 py-2 border border-gray-300 text-gray-100 font-medium rounded-[25px] me-4 hover:text-white hover:bg-red-500 text-[14px]"
                  onClick={() => save("occasional")}
                >
                  Occasionally
                </button>
                <button
                  className="py-2 text-gray-100 font-medium rounded-[25px] hover:text-white text-[14px] cursor-pointer"
                  onClick={handleClick}
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
  );
}
