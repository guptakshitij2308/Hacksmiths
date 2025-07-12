import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import {
  FaUsers,
  FaExchangeAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext"; // adjust path if needed

const Navbar = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserInfo(user);
  }, []);

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
    <nav className="bg-gray-50 text-gray-900 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo + Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="text-blue-600 text-xl flex items-center space-x-1">
            <FaUsers />
            <FaExchangeAlt />
          </div>
          <span className="text-xl font-semibold">Skill Swap</span>
        </Link>

        <div className="flex items-center justify-between gap-8">
          <div className="hidden md:flex gap-12 text-sm font-medium">
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/swap" className="hover:text-blue-600 transition">
              Swap Requests
            </Link>
          </div>

          {/* Right: Auth + Avatar */}
          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            {userInfo ? (
              <>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {userInfo?.profilePhoto ? (
                    <img
                      src={userInfo.profilePhoto}
                      alt="Avatar"
                      className="w-9 h-9 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-9 h-9 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm font-bold border border-gray-300">
                      {userInfo?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-12 bg-white border border-gray-300 rounded-md shadow-lg w-44 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      Signed in as
                      <br />
                      <span className="font-semibold">{userInfo.name}</span>
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
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition"
              >
                <FaUserCircle />
                Login/Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
