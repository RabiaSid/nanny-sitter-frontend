import React, { useState } from "react";
import Toast from "@/component/common/toast";
import { Post } from "@/config/api-method";
import { useDispatch } from "react-redux";
import { add } from "@/redux/reducers/userSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import { CgClose } from "react-icons/cg";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [userChoice, setUserChoice] = useState(null);
  const userData = useSelector((state) => state.user);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const [formData, setFormData] = useState({
    parentId: userData._id, // Set this to the logged-in user's ID
    location: "",
    childrenCount: "",
    childrenAges: [],
    schedule: "",
    message: "", // Custom message from the user
    budget: "",
    status: "pending",
  });
  const [errors, setErrors] = useState({});

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  const validate = () => {
    let validationErrors = {};

    switch (step) {
      case 2:
        if (!formData.location.trim())
          validationErrors.location = "Location is required.";
        break;
      case 3:
        if (
          !formData.childrenCount ||
          isNaN(formData.childrenCount) ||
          formData.childrenCount <= 0
        )
          validationErrors.childrenCount =
            "Please enter a valid number of children.";
        break;
      case 4:
        if (
          !formData.childrenAges.length ||
          formData.childrenAges.some((age) => isNaN(age) || age <= 0)
        )
          validationErrors.childrenAges =
            "Please enter valid ages for each child.";
        break;
      case 5:
        if (!formData.schedule.trim())
          validationErrors.schedule = "Schedule is required.";
        break;
      case 6:
        if (!formData.budget.trim())
          validationErrors.budget = "Budget is required.";
        break;
      default:
        break;
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleOptionSelect = (value) => {
    if (step === 1) {
      setUserChoice(value);
      if (value === "I'm looking for a nanny.") setStep(2);
      else if (value === "I want to register as a nanny.") setStep(8);
      else if (value === "I have questions about my account.") setStep(12);
      else setStep(16);
    }
  };

  const nextStep = () => {
    if (validate()) {
      setErrors({});
      if (step === 7) {
        newBooking();
      } else {
        setStep((prevStep) => prevStep + 1);
      }
    }
  };

  const showToast = (message, type) => {
    setToast({ isVisible: true, message, type });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToast({ ...toast, isVisible: false });
    }, 3000);
  };

  const newBooking = () => {
    formData.message = "hello";
    formData.status = "pending";

    Post("booking/chatbot-Booking", formData)
      .then((res) => {
        console.log(res?.data);
        if (res?.data) {
          // dispatch(add(res?.data?.user));
          showToast("Booking Successfully", "success");
          setIsOpen(false);
          setStep(0);
        } else {
          showToast("Unexpected response format.", "error");
        }
      })
      .catch((err) => {
        console.log(err);
        showToast("Login failed. Please check your credentials.", "error");
      });
  };

  return (
    <>
      <button
        onClick={toggleChatBox}
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium border rounded-full w-16 h-16 bg-red-500 hover:bg-gray-700 text-white"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        data-state={isOpen ? "open" : "closed"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[500px]">
          <div className="flex flex-col space-y-1.5 pb-6 relative">
            <h2 className="font-semibold text-lg tracking-tight">
              TopNannySitter Chatbot
            </h2>
            <p className="text-sm text-[#6b7280] leading-3">
              Your virtual assistant for nanny services.
            </p>
          </div>

          <div className="pr-4 py-4 overflow-y-auto">
            <div className="flex flex-col space-y-3">
              {step === 1 && (
                <p>
                  Bot: Welcome to TopNannySitter.com! How can I assist you
                  today?
                </p>
              )}
              {step === 2 && (
                <p>
                  Bot: Great! To help find the perfect nanny, please tell me
                  your location.
                </p>
              )}
              {step === 3 && (
                <p>Bot: How many children do you need care for?</p>
              )}
              {step === 4 && <p>Bot: Please provide the ages of each child.</p>}
              {step === 5 && (
                <p>Bot: When do you need the nanny? (e.g., 'Monday 9am-5pm')</p>
              )}
              {step === 6 && <p>Bot: What is your budget for this service?</p>}
              {step === 7 && <p>Bot: Thank you! I'll submit your request.</p>}
            </div>
          </div>

          <div className="flex items-center pt-0">
            <div className="flex flex-col space-y-2 w-full">
              {step === 1 && (
                <>
                  <button
                    onClick={() =>
                      handleOptionSelect("I'm looking for a nanny.")
                    }
                    className="bg-gray-200 rounded-md p-2"
                  >
                    I'm looking for a nanny.
                  </button>
                  <button
                    onClick={() =>
                      handleOptionSelect("I want to register as a nanny.")
                    }
                    className="bg-gray-200 rounded-md p-2"
                  >
                    I want to register as a nanny.
                  </button>
                  <button
                    onClick={() =>
                      handleOptionSelect("I have questions about my account.")
                    }
                    className="bg-gray-200 rounded-md p-2"
                  >
                    I have questions about my account.
                  </button>
                  <button
                    onClick={() =>
                      handleOptionSelect("I need help with something else.")
                    }
                    className="bg-gray-200 rounded-md p-2"
                  >
                    I need help with something else.
                  </button>
                </>
              )}
              {step === 2 && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter your location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm"
                  />
                  {errors.location && (
                    <p className="text-red-500">{errors.location}</p>
                  )}
                </div>
              )}
              {step === 3 && (
                <div>
                  <input
                    type="number"
                    placeholder="Number of children"
                    value={formData.childrenCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        childrenCount: e.target.value,
                      })
                    }
                    className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm"
                  />
                  {errors.childrenCount && (
                    <p className="text-red-500">{errors.childrenCount}</p>
                  )}
                </div>
              )}
              {step === 4 && (
                <div>
                  {Array.from({ length: formData.childrenCount }, (_, i) => (
                    <input
                      key={i}
                      type="number"
                      placeholder={`Age of child ${i + 1}`}
                      onChange={(e) => {
                        const ages = [...formData.childrenAges];
                        ages[i] = e.target.value;
                        setFormData({ ...formData, childrenAges: ages });
                      }}
                      className="flex h-10 w-full mb-2 rounded-md border border-[#e5e7eb] px-3 py-2 text-sm"
                    />
                  ))}
                  {errors.childrenAges && (
                    <p className="text-red-500">{errors.childrenAges}</p>
                  )}
                </div>
              )}
              {step === 5 && (
                <div>
                  <input
                    type="text"
                    placeholder="Schedule (e.g., 'Monday 9am-5pm')"
                    value={formData.schedule}
                    onChange={(e) =>
                      setFormData({ ...formData, schedule: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm"
                  />
                  {errors.schedule && (
                    <p className="text-red-500">{errors.schedule}</p>
                  )}
                </div>
              )}
              {step === 6 && (
                <div>
                  <input
                    type="text"
                    placeholder="Your budget"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm"
                  />
                  {errors.budget && (
                    <p className="text-red-500">{errors.budget}</p>
                  )}
                </div>
              )}
              {step == 1 ? null : (
                <button
                  onClick={nextStep}
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  {step === 7 ? "Submit" : "Next"}
                </button>
              )}
            </div>
          </div>

          <div className="absolute top-[-45px] right-[-3px] bg-gray-950 rounded-full p-2">
            <CgClose
              size={24}
              color="#fff"
              onClick={() => {
                setIsOpen(false);
              }}
            />
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
