import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import {
  FaUsers,
  FaExchangeAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import { AuthContext } from "../context/AuthContext"; // adjust path

const Navbar = () => {
  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useContext(AuthContext);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // ✅ Set userInfo from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserInfo(user);
  }, []);

  // ✅ Listen to localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUserInfo(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserInfo(null);
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-gray-50 text-gray-900 shadow-md sticky top-0 z-50">
      <div className="mx-auto flex justify-between items-center p-4 max-w-7xl">
        {/* Left - Logo */}
        <Link
          to="/"
          className="text-xl font-semibold flex items-center space-x-2"
        >
          <div className="text-blue-600 text-2xl flex items-center space-x-1">
            <FaUsers />
            <FaExchangeAlt />
          </div>
          <span className="ml-3">Skill Swap</span>
        </Link>

        {/* Center - Navigation Links */}
        <div className="flex items-center justify-between space-x-6">
          <Link
            to="/"
            className="text-md hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            Home
          </Link>
          <Link
            to="/swap"
            className="text-md hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            Swap Requests
          </Link>
        </div>

        {/* Right - Auth Section */}
        <div className="relative" ref={dropdownRef}>
          {userInfo ? (
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none"
            >
              {userInfo?.profilePhoto ? (
                <img
                  src={userInfo?.profilePhoto}
                  alt="Avatar"
                  className="w-9 h-9 rounded-full object-cover border border-gray-300"
                />
              ) : (
                <div className="w-9 h-9 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm font-bold">
                  {JSON.parse(userInfo)?.name.charAt(0).toUpperCase()}
                </div>
              )}
            </button>
          ) : (
            <Link
              to="/login"
              className="text-md hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
            >
              Login
            </Link>
          )}

          {isDropdownOpen && userInfo && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg py-2 w-44 z-50">
              <div className="px-4 py-2 text-sm text-gray-800">
                Signed in as <br />
                <span className="font-semibold">{userInfo?.name}</span>
              </div>
              <hr className="my-1" />
              <button
                onClick={handleProfileClick}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 text-gray-800"
              >
                <FaUserCircle className="mr-2" />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
