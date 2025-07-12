import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  FaUsers,
  FaExchangeAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserInfo(user);
  }, []);

  useEffect(() => {
    const handleUserUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUserInfo(updatedUser);
    };
    window.addEventListener("userUpdated", handleUserUpdate);
    return () => window.removeEventListener("userUpdated", handleUserUpdate);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

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
    <nav className="bg-white shadow sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-blue-600 text-xl font-bold"
          >
            <FaUsers />
            <FaExchangeAlt />
            <span className="ml-1 text-gray-800">Skill Swap</span>
          </Link>

          {/* Right - Navigation + Profile */}
          <div className="flex items-center space-x-24">
            <Link
              to="/"
              className="hover:text-blue-500 text-gray-700 font-medium transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/swap"
              className="hover:text-blue-500 text-gray-700 font-medium transition-all duration-200"
            >
              Swap Requests
            </Link>

            <div className="relative" ref={dropdownRef}>
              {userInfo ? (
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {userInfo.profilePhoto ? (
                    <img
                      src={userInfo.profilePhoto}
                      alt="Avatar"
                      className="w-9 h-9 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-9 h-9 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm font-bold">
                      {userInfo.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-sm font-medium text-blue-500 hover:underline"
                >
                  Login
                </Link>
              )}

              {/* Dropdown */}
              {isDropdownOpen && userInfo && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    Signed in as <br />
                    <span className="font-semibold">{userInfo.name}</span>
                  </div>
                  <hr className="my-1" />
                  <button
                    onClick={handleProfileClick}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FaUserCircle className="mr-2" />
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
