import React, { useState, useRef, useEffect } from "react";
import { Logo } from "@/assets";
import { Font1 } from "@/config/typography";
import IconHeader1 from "@/assets/dashboard/header-icon/icon-1.png";
import IconHeader2 from "@/assets/dashboard/header-icon/icon-2.png";
import IconHeader3 from "@/assets/dashboard/header-icon/icon-3.png";
import IconHeader4 from "@/assets/dashboard/header-icon/icon-4.png";
import { removeData } from "../../config/helper";

export default function DashboardHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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

  const logout = () => {
    removeData('token');
    window.location.href = '/';
  };

  return (
    <header>
      <nav className="px-4 lg:px-6 py-2.5 bg-white shadow-lg my-2">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-2">
          <a href="https://flowbite.com" className="flex items-center ">
            <img src={Logo} className="mr-3 h-12 sm:h-14" alt="Nanny Logo" />
          </a>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto "
            id="mobile-menu-2"
          >
            <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li className="underline-animation">
                <Font1>For Families</Font1>
              </li>
              <li className="underline-animation">
                <Font1>For Nannies</Font1>
              </li>
            </ul>
          </div>
          <div className="flex items-center ">
            <button className="text-black mx-4 flex flex-col items-center text-center">
              <img src={IconHeader1} width="25px" height="25px" className="mb-1" />
              <span className="hidden sm:block">
                Search</span>
            </button>
            <button className="text-black mx-4 flex flex-col items-center text-center">
              <img src={IconHeader2} width="25px" height="25px" className="mb-1" />
              <span className="hidden sm:block">
                Conversations</span>
            </button>
            <button className="text-black mx-4 flex flex-col items-center text-center">
              <img src={IconHeader3} width="25px" height="25px" className="mb-1" />
              <span className="hidden sm:block">
                Plus</span>
            </button>
            <button
              className="text-black mx-4 flex flex-col items-center text-center relative"
              onClick={toggleDropdown}
              ref={dropdownRef} // Attach the ref here
            >
              <img src={IconHeader4} width="25px" height="25px" className="mb-1" />
              <span className="hidden sm:block">
                Profile</span>
              {dropdownOpen && (
                <div
                  className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg min-w-[250px] flex flex-col justify-end mt-16 transition-all duration-500 ease-in-out h-[150px] right-0`}
                >
                  <ul className="text-sm text-gray-700 ">
                    {/* <li onClick={logout}>
                      
                        view profile
                    </li> */}
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
  );
}
