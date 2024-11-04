import React, { useState } from "react";
import AuthBg from "@/assets/auth/auth-bg.png";
import { H6, Font2 } from "@/config/typography";
import InputField from "@/component/common/input";
import Button from "@/component/dashboard/button";
import { useNavigate } from "react-router-dom";
import Toast from "@/component/common/toast";
import { Post } from "@/config/api-method";
import { BackArrow } from "@/config/app-constant";
import line from "../../assets/auth/horizental.png";
import { storeData } from "../../config/helper";
import { useDispatch } from "react-redux";
import { add } from "../../redux/reducers/userSlice";

export default function AuthSignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [model, setModel] = useState({});
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  // const googleAuth = () => {
  // 	window.open(
  // 		`http://localhost:5000/auth/google/callback`,
  // 		"_self"
  // 	);
  // };

  const fillModel = (key, val) => {
    setModel((prevModel) => ({
      ...prevModel,
      [key]: val,
    }));
  };

  const showToast = (message, type) => {
    setToast({ isVisible: true, message, type });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToast({ ...toast, isVisible: false });
    }, 3000);
  };

  const save = () => {
    if (!model.email || !model.password) {
      showToast("Email and password are required.", "error");
      return;
    }
    model.isActive = true;
    // console.log(model);
    Post("auth/login", model)
      .then((res) => {
        console.log(res?.data);
        if (res?.data) {
          dispatch(add(res?.data?.user));
          storeData("token", res.data?.token);
          navigate("/welcome-dashboard", { state: { loggedIn: true } });
        } else {
          showToast("Unexpected response format.", "error");
        }
      })
      .catch((err) => {
        console.log(err);
        showToast("Login failed. Please check your credentials.", "error");
      });
  };

  const googleAuth = () => {
    window.open(`http://localhost:5000/auth/google/callback`, "_self");
  };
  return (
    <>
      <div
        className="py-[30px] md:py-[50px] lg:py-[100px] min-h-[100dvh] relative"
        style={{ background: `url(${AuthBg}) 100% 100% / cover no-repeat` }}
      >
        <div className="flex justify-center items-center m-auto pt-[50px]">
          <div className="bg-white w-[97%] md:w-[85%] lg:w-[60%] xl:w-[40%] border shadow-lg rounded-md ">
            <div className="border-b border-gray-300 relative">
              <button className="absolute top-[40%] left-[30px]">
                {" "}
                <BackArrow />
              </button>{" "}
              <H6 className=" mb-2 xl:mb-3 text-center py-3 capitalize ">
                Log In
              </H6>
            </div>
            <div className="w-2/3 mx-auto text-center pb-14 pt-8">
              <div className="mb-[35px]">
                <InputField
                  type="text"
                  label="Email*"
                  value={model.email || ""}
                  onChange={(e) => fillModel("email", e.target.value)}
                  className="input-class"
                />
              </div>

              <div className="">
                <InputField
                  type="password"
                  label="Password*"
                  value={model.password || ""}
                  onChange={(e) => fillModel("password", e.target.value)}
                  className="input-class"
                />
              </div>

              <Font2 className="pt-1 pb-2 text-start">
                <span className="text-[#666666]">Forget Password </span>{" "}
              </Font2>
              <Button
                className="w-[100%] rounded-[35px] py-2 px-6 bg-[#FF6F61] text-white text-[22px] font-bold mt-2 mb-4"
                onClick={save}
              >
                Next
              </Button>
              <img src={line} />
              {/* <Button
              className="w-[100%] rounded-[35px] py-2 px-6 border border-gray-300 text-[#666666] text-center text-[22px] relative mt-4 mb-2"
              onClick={googleAuth}
            >
              <img src={icon} className="h-[35px] absolute left-[20%]" /> Sign
              in with Google
            </Button> */}
              <Font2 className="pt-4 text-center">
                <span className="text-[#666666]">Don't have an account? </span>{" "}
                <span
                  className="text-[#ff6f61]"
                  onClick={() => {
                    navigate("/auth/sign-up");
                  }}
                >
                  Get Started{" "}
                </span>
              </Font2>
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
    // <div className="bg-white w-[97%] md:w-[85%] lg:w-[60%] xl:w-[40%] border shadow-lg rounded-md">
    // 	<div className="border-b border-gray-300">
    // 		<H6 className="pB-5 mb-2 xl:mb-3 capitalize text-center py-3">Sign Up</H6>
    // 	</div>
    // 	<div className="w-2/3 mx-auto text-center pb-14 pt-8">
    // 		<Font1 className="pb-5">Tell us what you are looking for...</Font1>
    // 		<div className='flex justify-center'>
    // 			<img src={imgbaby} />
    // 		</div>

    // 		<Radiobutton
    // 			id="user"
    // 			name="role"
    // 			value="user"
    // 			onChange={(e) => {
    // 				fillModel("role", e.target.value);
    // 				nextStep();
    // 			}}
    // 			label="I am looking to hire a nanny"
    // 			checked={model.role === "user"}
    // 		/>
    // 		<Radiobutton
    // 			id="nanny"
    // 			name="role"
    // 			value="nanny"
    // 			onChange={(e) => {
    // 				fillModel("role", e.target.value);
    // 				nextStep();
    // 			}}
    // 			label="I am looking to find a job"
    // 			checked={model.role === "nanny"}
    // 		/>
    // 		<Font2 className="py-1 text-center"><span className='text-[#666666]' >Already have an account? </span> <span className='text-[#ff6f61]'>Login</span></Font2>
    // 	</div>
    // </div>
    // <div className={styles.container}>
    // 	<h1 className={styles.heading}>Log in Form</h1>
    // 	<div className={styles.form_container}>
    // 		<div className={styles.left}>
    // 			<img className={styles.img} src="./images/login.jpg" alt="login" />
    // 		</div>
    // 		<div className={styles.right}>
    // 			<h2 className={styles.from_heading}>Members Log in</h2>
    // 			<input type="text" className={styles.input} placeholder="Email" />
    // 			<input type="text" className={styles.input} placeholder="Password" />
    // 			<button className={styles.btn}>Log In</button>
    // 			<p className={styles.text}>or</p>
    // 			<button className={styles.google_btn} onClick={googleAuth}>
    // 				<img src="./images/google.png" alt="google icon" />
    // 				<span>Sing in with Google</span>
    // 			</button>
    // 			<p className={styles.text}>
    // 				New Here ? <Link to="/signup">Sing Up</Link>
    // 			</p>
    // 		</div>
    // 	</div>
    // </div>
  );
}
