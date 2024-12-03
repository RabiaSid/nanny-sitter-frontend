import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TbSmartHome } from "react-icons/tb";
import { GoPerson } from "react-icons/go";
import { BsBroadcastPin } from "react-icons/bs";
import { Logo } from "@/assets";
import NotFound from "@/pages/not-found";
import AdminDashboardMain from "./home";
import Users from "./user";
import Bookings from "./booking";
import { removeData } from "@/config/helper";

const pagesArr = [
  {
    icon: <TbSmartHome size={34} color="#999999" />,
    route: "",
  },
  {
    icon: <GoPerson size={32} color="#999999" />,
    route: "users",
  },
  {
    icon: <BsBroadcastPin size={30} color="#999999" />,
    route: "bookings",
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const userData = useSelector((a) => a.user);
  console.log(userData);

  const logout = () => {
    removeData("token");
    window.location.href = "/";
  };

  return (
    <div className="grid-cols-1 h-screen">
      <div className="flex w-full justify-between h-[8%] bg-[#fff] border items-center">
        <div className="text-3xl font-medium text-black ps-3">
          <img src={Logo} className="mr-3 h-10" alt="Nanny Logo" />
        </div>
        <button
          className="block text-sm px-4 py-1 bg-red-400 me-2 rounded-sm hover:bg-red-500 text-white hover:shadow"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-12 h-[92%]">
        <div className="col-span-1 bg-[#fff] border">
          <div className="h-[96%] flex flex-col items-center gap-y-8 pt-6">
            {pagesArr.map((x, index) => (
              <div
                key={index}
                className="px-6 py-1 rounded-full flex items-center justify-center hover:bg-[#eee] hover:rounded-sm"
                onClick={() => navigate(x.route)}
              >
                {x.icon}
              </div>
            ))}
          </div>
          <div className="row-span-1 h-[4%] items-end  justify-end ">
            {/* <Button label="Sign out" onClick={SignOut} /> */}
          </div>
        </div>
        <div className="col-span-11 bg-[#ffffff] relative">
          <Routes>
            <Route path="" element={<AdminDashboardMain />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="users" element={<Users />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
