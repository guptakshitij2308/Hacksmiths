import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaUsers, FaExchangeAlt } from "react-icons/fa"; // Icon-based logo
// import { FaSun, FaMoon, FaPowerOff } from "react-icons/fa";
// import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = async () => {};
  const handleLogout = async () => {};

  return (
    <nav className="bg-gray-50 text-gray-900 shadow-md sticky top-0 z-50">
      <div className="mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl font-semibold flex items-center space-x-2"
          >
            <div className="text-blue-600 text-2xl flex items-center space-x-1">
              <FaUsers />
              <FaExchangeAlt />
            </div>
            <span className="ml-3">Skill Swap Platform</span>
          </Link>
        </div>

        <div className="flex items-center justify-between space-x-12">
          <Link
            to="/"
            className="text-md hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-md hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </Link>
          <Link
            to="/swap"
            className="text-md hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            Swap Request
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
