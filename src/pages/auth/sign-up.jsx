import React, { useEffect, useState } from "react";
import AuthBg from "@/assets/auth/auth-bg.png";
import { Font1, H6, Font2 } from "@/config/typography";
import Radiobutton from "@/component/common/radiobutton";
import usaImg from "@/assets/auth/icon/usa.png";
import canadaImg from "@/assets/auth/icon/canada.png";
import InputField from "@/component/common/input";
import Dropdown from "@/component/common/dropdown";
import Location from "@/assets/common-icon/location.png";
import lock from "@/assets/common-icon/lock.png";
import Button from "@/component/dashboard/button";
import { useNavigate } from "react-router-dom";
import Toast from "@/component/common/toast";
import { Post } from "@/config/api-method";
import { BackArrow } from "@/config/app-constant";
import icon from "@/assets/common-icon/google-icon.png";
import imgbaby from "@/assets/auth/outline.png";
import TextArea from "@/component/common/textarea";
import { storeData } from "@/config/helper";
import { useDispatch } from "react-redux";
import { add } from "@/redux/reducers/userSlice";

// Array of nanny questions
const nanny = [
  {
    title: "What type of child care are you looking for?",
    type: "radio",
    key: "serviceType",
    options: [
      { label: "full-time", value: "full-time" },
      { label: "part-time", value: "part-time" },
      { label: "occasional", value: "occasional" },
    ],
    list: [
      "Full-time is at least 30hrs/week",
      "Part-time is less than 30hrs/week",
      "Occasional helper is considered as a babysitter. They are flexible with hours and don’t require a fixed schedule.",
    ],
  },
  {
    title: "Are you First Aid certified?",
    type: "radio",
    key: "isAIDcertificate",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  {
    title: "Are you CPR certified?",
    type: "radio",
    key: "isCPRcertificate",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  {
    title: "Do you have a driver’s license?",
    type: "multi-input",
    key: "isDrivingLicense",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
    multiQuestion: [
      {
        label: "Do you have a car?",
        key: "haveCar",
        options: [
          { label: "Yes", value: true },
          { label: "No", value: false },
        ],
      },
    ],
    // onCLick:
  },
  {
    title: "Would you do light housekeeping?",
    type: "radio",
    key: "doHouseKeeping",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  {
    title: "Would you do meal prep?",
    type: "radio",
    key: "doMealPrep",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  {
    title: "Would you work with special needs children?",
    type: "radio",
    key: "careSpecialChild",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  {
    title: "Would you work as a live‑in nanny?",
    type: "radio",
    key: "isLiven",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  {
    title: "What’s your budget for child care?",
    type: "input",
    key: "budget",
    label: "Hourly Rate (roughly)",
    para: (
      <div>
        <p className="py-2 border-b-2 ">
          The average cost of a nanny in your city is $23 per hour.
        </p>
        <p className="py-2">
          You can update this information anytime on your Top Nanny Sitter
          Profile
        </p>
      </div>
    ),
  },
  {
    title: "What languages do you speak fluently?",
    type: "radio",
    key: "Language",
    options: [
      { label: "English", value: "english" },
      { label: "Spanish", value: "spanish" },
    ],
    defaultOption: [{ label: "select all apply", value: "all" }],
  },
  {
    title: "What age groups will you care for? ",
    type: "radio",
    key: "childAgeGroup",
    options: [
      { label: "0-11m", value: "0-11" },
      { label: "1-3yrs", value: "1-3" },
      { label: "4-9yrs", value: "4-9" },
      { label: "10+yrs", value: "10+" },
    ],
  },
  {
    title: "How many years of paid child care experience do you have?",
    type: "dropdown",
    key: "experience",
    label: "Years of paid work experience",
    placeholder: "Select an option",
    options: [
      { label: "Infants (0-11 months)", value: "infant" },
      { label: "Toddlers (1-3years)", value: "toddlers" },
      { label: "Preschoolers (4-9years)", value: "pre-school" },
      { label: "Grade-schoolers (10-12years)", value: "grade-school" },
      { label: "High-schoolers (13-17 years)", value: "high-school" },
      { label: "Adults (18+ years)", value: "adult" },
    ],
    alert:
      "You can update this information anytime on your Top Nanny Sitter Profile",
  },
  {
    title: "Where are you looking for work?",
    type: "input",
    key: "zipCode",
    label: "city or zip code",
    // require: true,
    list2: [
      {
        img: lock,
        txt: "Never shared with anyone",
      },
      {
        img: Location,
        txt: "Finds matches closest to you",
      },
    ],
  },
  {
    title: "Tell me about your self",
    type: "textarea",
    key: "aboutYourself",
    label: "Describtion",
  },
];

// Array of user questions
const user = [
  // {
  //   title: "How many children do you have?",
  //   type: "input",
  //   key: "totalKids",
  //   label: "city or zip code",
  //   label: "Enter number of children",
  // },

  // {
  //   title: "Are you sharing a nanny?",
  //   type: "radio",
  //   key: "sharingNanny",
  //   options: [
  //     { label: "Yes", value: "yes" },
  //     { label: "No", value: "no" },
  //   ],
  // },
  {
    title: "What type of child care are you looking for?",
    type: "radio",
    key: "serviceType",
    options: [
      { label: "full-time", value: "full-time" },
      { label: "part-time", value: "part-time" },
      { label: "occasional", value: "occasional" },
    ],
    list: [
      "Full-time is at least 30hrs/week",
      "Part-time is less than 30hrs/week",
      "Occasional helper is considered as a babysitter. They are flexible with hours and don’t require a fixed schedule.",
    ],
  },
  {
    title: "Where are you looking for work?",
    type: "input",
    key: "zipCode",
    label: "city or zip code",
    require: true,
    list2: [
      {
        img: lock,
        txt: "Never shared with anyone",
      },
      {
        img: Location,
        txt: "Finds matches closest to you",
      },
    ],
  },
  {
    title: "What is your job description?",
    type: "textarea",
    key: "parentJobDescription",
    label: "Describe your job",
  },
];

export default function AuthSignUp() {
  const dispatch = useDispatch();
  const [model, setModel] = useState({});
  const [step, setStep] = useState(0); // Start from step 0
  const [chooseStep, setchooseStep] = useState(false); // Start from step 0
  const [valid, setValid] = useState(false); // Start from step 0
  let [currentQuestion, setCurrentQuestion] = useState(null);
  let [isShow, setIsShow] = useState(false);
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
  const navigate = useNavigate();

  const fillModel = (key, val) => {
    setModel({ ...model, [key]: val });
  };

  const nextStep = () => {
    setStep(step + 1);
    setIsShow(false);
  };
  const handleBack = () => {
    setStep(step - 1);
  };
  // Set the current question based on the model role
  useEffect(() => {
    if (model.role === "user") {
      setCurrentQuestion(user[step - 2]);
    } else if (model.role === "nanny") {
      setCurrentQuestion(nanny[step - 2]);
    }
  }, [step, model.role]);

  // Check if the current question exists and if all questions are completed
  const afterAllStep = () => {
    if (model.role === "user" && step > user.length + 1) return true;
    if (model.role === "nanny" && step > nanny.length + 1) return true;
    return false;
  };

  if (
    currentQuestion &&
    currentQuestion.condition &&
    !currentQuestion.condition(model)
  ) {
    nextStep(); // Skip if condition isn't met
  }

  const renderQuestion = (question) => {
    switch (question.type) {
      case "radio":
        return question.options.map((option) => (
          <Radiobutton
            key={option.value}
            id={`${question.key}-${option.value}`}
            name={question.key}
            value={option.value || ""}
            onChange={(e) => {
              fillModel(question.key, e.target.value);
              nextStep();
            }}
            label={option.label}
            checked={model[question.key] === option.value}
          />
        ));
      case "multi-input":
        return (
          <>
            {question.options.map((option) => (
              <Radiobutton
                key={option.value}
                id={`${question.key}-${option.value}`}
                name={question.key}
                value={option.value || ""}
                placeholder={option.placeholder}
                onChange={(e) => {
                  fillModel(question.key, e.target.value === "true"); // Correct boolean handling
                  if (e.target.value === "false") {
                    nextStep(); // Skip the follow-up question if 'No'
                  }
                }}
                label={option.label}
                checked={model[question.key] === option.value}
              />
            ))}

            {/* Show follow-up question only if 'Yes' is selected */}
            {question.multiQuestion && model[question.key] === true && (
              <div className="multi-question-container">
                <Font1 className="pb-5">
                  {question.multiQuestion[0].label}
                </Font1>
                {question.multiQuestion[0].options.map((option) => (
                  <Radiobutton
                    key={option.value}
                    id={`${question.multiQuestion[0].key}-${option.value}`}
                    name={question.multiQuestion[0].key}
                    value={option.value || ""}
                    onChange={(e) => {
                      fillModel(question.multiQuestion[0].key, e.target.value);
                      nextStep();
                    }}
                    label={option.label}
                    checked={
                      model[question.multiQuestion[0].key] === option.value
                    }
                  />
                ))}
              </div>
            )}
          </>
        );
      case "input":
        return (
          <>
            <InputField
              type="text"
              label={question.label}
              placeholder={question.label}
              value={model[question.key] || ""}
              onChange={(e) => {
                fillModel(question.key, e.target.value);
                if (e.target.value) {
                  setIsShow(true);
                }
              }}
              className="input-class"
            />
            {isShow === true && (
              <Button
                className="w-[95%] rounded-[35px] py-2 px-6 bg-[#FF6F61] text-white text-[22px] font-bold my-2"
                onClick={() => nextStep()}
              >
                Select
              </Button>
            )}
          </>
        );
      case "dropdown":
        return (
          <Dropdown
            type="text"
            label={question.label}
            options={question.options}
            placeholder={question.placeholder}
            minlength={30}
            value={model[question.key] || ""}
            onChange={(selectedValue) => {
              fillModel(question.key, selectedValue);
              nextStep();
            }}
          />
        );
      case "textarea": // Corrected from "textaree" to "textarea"
        return (
          <>
            <TextArea
              label={question.label}
              placeholder={question.label}
              value={model[question.key] || ""}
              onChange={(e) => {
                fillModel(question.key, e.target.value);
                if (e.target.value) {
                  setIsShow(true);
                }
              }}
            />
            {isShow === true && (
              <Button
                className="w-[95%] rounded-[35px] py-2 px-6 bg-[#FF6F61] text-white text-[22px] font-bold mt-4 mb-2"
                onClick={() => nextStep()}
              >
                Select
              </Button>
            )}
          </>
        );
      default:
        return null;
    }
  };

  const googleAuth = () => {
    window.open(`http://localhost:5000/auth/google/callback`, "_self");
  };

  const save = () => {
    if (
      !model.email ||
      !model.password ||
      !model.firstName ||
      !model.lastName
    ) {
      showToast("All fields are required.", "error");
      return;
    }

    model.isActive = true;
    model.id = 1;

    console.log("Model being sent:", { ...model }); // Log the model

    if (model.role === "user") {
      Post("auth/user-signup", model)
        .then((res) => {
          console.log("Full response:", res); // Log the entire response
          console.log(
            res?.data + "kzxlcjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"
          );
          console.log(res?.data + "0000000000000000000000000000000000000000");

          // Adjusted dispatch to directly use the user data from the response
          dispatch(add(res.data)); // Assuming the user details are directly in res.data
          storeData("token", res.data.token);
          navigate("/package", { state: { loggedIn: true } });
        })
        .catch((err) => {
          console.error(err.response ? err.response.data : err.message); // More detailed error logging
          showToast("Signup failed. Please try again.", "error");
        });
    } else {
      Post("auth/nanny-signup", model)
        .then((res) => {
          console.log("Full response:", res); // Log the entire response
          console.log(
            res?.data + "kzxlcjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"
          );
          console.log(res?.data + "0000000000000000000000000000000000000000");

          dispatch(add(res.data));
          storeData("token", res.data.token);
          navigate("/welcome-dashboard", { state: { loggedIn: true } });
        })
        .catch((err) => {
          console.error(err.response ? err.response.data : err.message);
          console.log(err);
          showToast("Signup failed. Please try again.", "error");
        });
    }
  };
  console.log({ ...model });

  return (
    <>
      <div
        className="py-[30px] md:py-[50px] lg:py-[100px] min-h-[100dvh] relative"
        style={{ background: `url(${AuthBg}) 100% 100% / cover no-repeat` }}
      >
        <div className="flex justify-center items-center m-auto pt-[50px]">
          {step === 0 && (
            <div className="bg-white w-[97%] md:w-[85%] lg:w-[60%] xl:w-[40%] border shadow-lg rounded-md">
              {/* <form> */}
              <div className="border-b border-gray-300">
                <H6 className="pB-5 mb-2 xl:mb-3 capitalize text-center py-3">
                  Sign Up
                </H6>
              </div>
              <div className="w-2/3 mx-auto text-center pb-14 pt-8">
                <Font1 className="pb-5">
                  Tell us what you are looking for...
                </Font1>
                <div className="flex justify-center">
                  <img src={imgbaby} />
                </div>

                <Radiobutton
                  id="user"
                  name="role"
                  value="user"
                  onChange={(e) => {
                    fillModel("role", e.target.value);
                    nextStep();
                  }}
                  label="I am looking to hire a nanny"
                  checked={model.role === "user"}
                />
                <Radiobutton
                  id="nanny"
                  name="role"
                  value="nanny"
                  onChange={(e) => {
                    fillModel("role", e.target.value);
                    nextStep();
                  }}
                  label="I am looking to find a job"
                  checked={model.role === "nanny"}
                />
                <Font2 className="py-1 text-center">
                  <span className="text-[#666666]">
                    Already have an account?{" "}
                  </span>{" "}
                  <span
                    className="text-[#ff6f61]"
                    onClick={() => {
                      navigate("/auth/sign-in");
                    }}
                  >
                    Login
                  </span>
                </Font2>
              </div>
              {/* </form> */}
            </div>
          )}

          {step === 1 && (
            <div className="bg-white w-[97%] md:w-[85%] lg:w-[60%] xl:w-[40%] border shadow-lg rounded-md">
              {/* <form> */}
              <div className="border-b border-gray-300">
                <H6 className="pB-5 mb-2 xl:mb-3 capitalize text-center py-3">
                  Country
                </H6>
              </div>
              <div className="w-2/3 mx-auto text-center pb-14 pt-8">
                <Font1 className="pb-5">
                  Which country are you located in?
                </Font1>
                <Radiobutton
                  id="usa"
                  name="region"
                  value="usa"
                  onChange={(e) => {
                    fillModel("region", e.target.value);
                    nextStep();
                  }}
                  label="USA"
                  checked={model.region === "usa"}
                  btnField={true}
                  image={usaImg}
                  // right={usaImg}
                />
                <Radiobutton
                  id="canada"
                  name="region"
                  value="canada"
                  onChange={(e) => {
                    fillModel("region", e.target.valu);
                    nextStep();
                  }}
                  label="Canada"
                  checked={model.region === "canada"}
                  btnField={true}
                  image={canadaImg}
                  // right={canadaImg}
                />
                {/* <Button
                className={`w-[95%] rounded-[35px] py-2 px-6 bg-[#FF6F61] text-white text-[22px] font-bold `}
                onClick={() => nextStep()}
              >
                Select
              </Button> */}
                <Font2 className="py-2 text-center">
                  <span className="text-[#666666]">
                    Already have an account?{" "}
                  </span>{" "}
                  <span
                    className="text-[#ff6f61]"
                    onClick={() => {
                      navigate("/auth/sign-in");
                    }}
                  >
                    Login
                  </span>
                </Font2>
              </div>
              {/* </form> */}
            </div>
          )}

          {currentQuestion && !afterAllStep() && (
            <div className="bg-white w-[97%] md:w-[85%] lg:w-[60%] xl:w-[40%] border shadow-lg rounded-md">
              {/* <form> */}
              <div className="border-b border-gray-300 relative">
                <button
                  className="absolute top-[40%] left-[30px]"
                  onClick={handleBack}
                >
                  {" "}
                  <BackArrow />
                </button>{" "}
                <H6 className=" mb-2 xl:mb-3 text-center py-3 capitalize ">
                  sign up
                </H6>
              </div>
              <div className="w-2/3 mx-auto text-center pb-14 pt-8">
                {currentQuestion && (
                  <>
                    <Font1 className="pb-5">{currentQuestion.title}</Font1>
                    {renderQuestion(currentQuestion)}
                    {currentQuestion.list && (
                      <>
                        <ul className="w-[80%] list-disc mx-auto">
                          {currentQuestion.list.map((item, index) => (
                            <li key={index}>
                              <p className="py-1 text-start ">{item}</p>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {currentQuestion.alert && (
                      <div className="bg-[#3333] rounded-lg py-8 px-[50px]">
                        <p>{currentQuestion.alert}</p>
                      </div>
                    )}
                    {currentQuestion.list2 && (
                      <>
                        {currentQuestion.list2.map((item, index) => (
                          <div key={index} className="flex my-2 items-center">
                            <img
                              src={item.img}
                              alt="icon"
                              className="ms-[30%] me-2 max-h-[30px]"
                            />
                            <span>{item.txt}</span>
                          </div>
                        ))}
                      </>
                    )}
                    {currentQuestion.para && currentQuestion.para}
                  </>
                )}
              </div>
              {/* </form> */}
            </div>
          )}

          {/* {afterAllStep() && chooseStep === true */}
          {afterAllStep() && chooseStep === false && (
            <>
              <div className="bg-white w-[97%] md:w-[85%] lg:w-[60%] xl:w-[40%] border shadow-lg rounded-md ">
                {/* <form> */}
                <div className="border-b border-gray-300 relative">
                  <button
                    className="absolute top-[40%] left-[30px]"
                    onClick={handleBack}
                  >
                    {" "}
                    <BackArrow />
                  </button>{" "}
                  <H6 className=" mb-2 xl:mb-3 text-center py-3 capitalize ">
                    sign up
                  </H6>
                </div>
                <div className="w-2/3 mx-auto text-center pb-14 pt-8">
                  <Font1 className="pb-5">set your account</Font1>
                  {/* <Button
                  className="w-[100%] rounded-[35px] mb-4 py-2 flex justify-center border border-gray-300 text-[#666666] text-center text-[22px] relative"
                  onClick={googleAuth}
                >
                  <img src={icon} className="h-[35px] pe-2" />{" "}
                  <span>

                    Sign in with Google
                  </span>
                </Button> */}
                  <Button
                    className="w-[100%] rounded-[35px] py-2 px-6 bg-[#FF6F61] text-white text-[22px] font-bold"
                    onClick={() => setchooseStep(true)}
                  >
                    Continue With Email
                  </Button>
                  <Font2 className="pt-4 text-start">
                    <span className="text-[#666666]">
                      Already have an account?{" "}
                    </span>{" "}
                    <span
                      className="text-[#ff6f61]"
                      onClick={() => {
                        navigate("/auth/sign-in");
                      }}
                    >
                      Login
                    </span>
                  </Font2>
                  <Font2 className="pt-2 text-[#666666] text-start">
                    <span>By proceeding you agree to the </span>{" "}
                    <span className="text-[#ff6f61]">Term of Serivce</span> &{" "}
                    <br />{" "}
                    <span className="text-[#ff6f61]">Privacy Policy</span>
                  </Font2>
                </div>
                {/* </form> */}
              </div>
            </>
          )}

          {chooseStep === true && (
            <div className="bg-white w-[97%] md:w-[85%] lg:w-[60%] xl:w-[40%] border shadow-lg rounded-md ">
              {/* <form> */}
              <div className="border-b border-gray-300 relative">
                {/* <button
                  className="absolute top-[40%] left-[30px]"
                  onClick={handleBack}
                >
                  {" "}
                  <BackArrow />
                </button>{" "} */}
                <H6 className=" mb-2 xl:mb-3 text-center py-3 capitalize ">
                  sign up
                </H6>
              </div>
              <div className="w-2/3 mx-auto text-center pb-14 pt-8">
                <Font1 className="pb-5">set your account</Font1>
                <div className="mb-[35px]">
                  <InputField
                    type="text"
                    label="First Name*"
                    value={model.firstName || ""}
                    onChange={(e) => fillModel("firstName", e.target.value)}
                    require
                    className="input-class"
                  />
                </div>

                <div className="mb-[35px]">
                  <InputField
                    type="text"
                    label="Last Name*"
                    value={model.lastName || ""}
                    onChange={(e) => fillModel("lastName", e.target.value)}
                    require
                    className="input-class"
                  />
                </div>

                <div className="mb-[35px]">
                  <InputField
                    type="email"
                    label="Email*"
                    value={model.email || ""}
                    onChange={(e) => fillModel("email", e.target.value)}
                    require
                    className="input-class"
                  />
                </div>

                <div className="mb-[35px]">
                  <InputField
                    type="password"
                    label="Password*"
                    value={model.password || ""}
                    onChange={(e) => fillModel("password", e.target.value)}
                    require
                    className="input-class"
                  />
                </div>

                <Button
                  className="w-[100%] rounded-[35px] py-2 px-6 bg-[#FF6F61] text-white text-[22px] font-bold"
                  // onClick={handlePackage}
                  onClick={save}
                >
                  Next
                </Button>
                <Font2 className="pt-4 text-start">
                  <span className="text-[#666666]">
                    Already have an account?{" "}
                  </span>{" "}
                  <span
                    className="text-[#ff6f61]"
                    // onClick={() => {
                    //   navigate("/auth/sign-in");
                    // }}
                  >
                    Login
                  </span>
                </Font2>
                <Font2 className="pt-2 text-[#666666] text-start">
                  <span>By proceeding you agree to the </span>{" "}
                  <span className="text-[#ff6f61]">Term of Serivce</span> &{" "}
                  <br /> <span className="text-[#ff6f61]">Privacy Policy</span>
                </Font2>
              </div>
              {/* </form> */}
            </div>
          )}
        </div>
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
        />
      </div>
    </>
  );
}
