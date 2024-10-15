import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import Avatar from "./avatar";
import { useSelector } from "react-redux";
import { IoIosHome } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { GrDocumentPerformance } from "react-icons/gr";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import texticon from "../../images/icons/icons/test (1).png"
import homeicon from "../../images/icons/icons/home-icon-silhouette.png"
import studyicon from "../../images/icons/icons/notebook.png"
import commicon from "../../images/icons/icons/epidemiology.png"
import pericon from "../../images/icons/icons/line-chart.png"
import assicon from "../../images/icons/icons/approve.png"

const Header = ({ isSideNavOpen, setIsSideNavOpen }) => {
  const data = useSelector((store) => store.user.data);
  const [isTestDropdownOpen, setTestDropdownOpen] = useState(false)
  const toggleTestDropdown = () => {
    setTestDropdownOpen(!isTestDropdownOpen)
  }
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-[#FF725E] border-b">
        <div className="max-w-screen-2xl flex items-center justify-between mx-auto p-4">
          <div className="flex flex-row ">
            {!isSideNavOpen && (
              <button
                onClick={toggleSideNav}
                className="p-2 bg-[#FF725E] text-white rounded-full focus:outline-none"
              >
                <RxHamburgerMenu size={30} />
              </button>
            )}
            <div className="flex items-center space-x-3">
              <span className="text-xl font-semibold text-white">
                HI! {data?.fullName}
              </span>
            </div>
          </div>
          <div className="relative" ref={dropdownRef}>
            <div className="flex flex-row">   <span className='border-4 border-white text-white rounded-xl flex justify-centre mx-6 p-2' >{data.role}</span>


              <button
                onClick={toggleDropdown}
                className="inline-flex items-center justify-center rounded-full focus:outline-none"
              >
                <Avatar />
              </button></div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Link
                  to={`/${data?.role}/dashboard`}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Home
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 w-64 hover:text-white h-full bg-white shadow-lg transform ${isSideNavOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex flex-row justify-between">
            <IoStar size={24} color="FF725E" className="m-1"/>
            <h1 className="text-2xl text-[#FF725E] font-bold">Prolearning</h1>
          </div>

          <button
            onClick={toggleSideNav}
            className="p-2 text-black bg-gray-200 rounded-full"
          >
            <IoMdClose size={20} />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-2 ">
          <Link
            to={`/${data?.role}/dashboard`}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-[#FF725E] hover:text-white transition-colors"
          >
           <img src={homeicon} width={30} height={10}/>
            <span className="text-lg font-medium text-[#FF725E] hover:text-white">Home</span>
          </Link>
          {data?.role !== "PARENT" && (
            <Link
              to="/studymaterial"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-[#FF725E] hover:text-white transition-colors"
            >
            <img src={studyicon} width={30} height={10}/>
              <span className="text-lg text-[#FF725E] font-medium hover:text-white">Study Material</span>
            </Link>
          )}

          {(data?.role === "STUDENT" || data?.role === "TEACHER") && (
            <div className="relative hover:text-white">
              <button
                className="flex justify-between gap-2 p-2 w-full text-left rounded-md hover:bg-[#FF725E]  transition-colors"
                onClick={toggleTestDropdown}
              >
                <div className="flex flex-row">
                  {/* <FaRegPenToSquare size={26} className="text-red-500" /> */}
                  <img src={texticon} color="red" width={30} height={10}/>
                  <span className="text-lg text-[#FF725E] px-2 font-medium hover:text-white">Test</span>
                </div>
                <div className="py-2">
                <FaAngleDown size={16}  />
                </div>
              </button>
              {isTestDropdownOpen && (
                <div className="ml-4 mt-2 bg-white shadow-md rounded-md">
                  {data?.role === "STUDENT" && (
                    <>
                      <Link
                        to={`/${data?.role}/test`}
                        className="block px-4 py-2 text-[#FF725E] hover:bg-[#FF725E] hover:text-white"
                      >
                        MCQ Test
                      </Link>
                      <Link
                        to={`/${data?.role}/physical-test`}
                        className="block px-4 py-2 text-[#FF725E] hover:bg-[#FF725E] hover:text-white"
                      >
                        Physical Test
                      </Link>
                    </>
                  )}
                  {data?.role === "TEACHER" && (
                    <Link
                      to={`/${data?.role}/check/ptest`}
                      className="block px-4 py-2 text-gray-800 hover:bg-[#FF725E] hover:text-white"
                    >
                      Physical Test Check
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
          {data?.role === "STUDENT" && (
            <Link
              to={`/${data?.role}/assignment`}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-[#FF725E] hover:text-white transition-colors"
            >
             <img src={assicon} width={30} height={10}/>
              <span className="text-lg text-[#FF725E] font-medium hover:text-white">Assignment</span>
            </Link>
          )}
          <div className="hover:text-white">

          {data?.role !== "TEACHER" && (
            <Link
              to={`/${data?.role}/performance`}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-[#FF725E] hover:text-white transition-colors"
            >
             <img src={pericon} width={30} height={10}/>
              <span className="text-lg text-[#FF725E] font-medium hover:text-white">Performance</span>
            </Link>
          )}
                    {data?.role === "STUDENT" && (
            <Link
              to={`/${data?.role}/community`}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-[#FF725E] hover:text-white transition-colors"
            >
             <img src={commicon} width={30} height={10}/>
              <span className="text-lg text-[#FF725E] font-medium hover:text-white">Community</span>
            </Link>
          )}
          </div>
         
        </div>
      </div>
    </>
  );
};

export default Header;
