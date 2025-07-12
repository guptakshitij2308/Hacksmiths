import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaPowerOff } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

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
    <nav
      className={` "bg-gray-50 text-gray-900 shadow-md"
         sticky top-0 z-50`}
    >
      <div className="mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl font-semibold flex items-center space-x-2"
          >
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <span className="ml-4">SkillSwap</span>
          </Link>
        </div>
        <div className="flex items-center justify-around space-x-12">
          <Link
            to="/problems"
            className="text-md hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            Problems
          </Link>
          <Link
            to="/contests"
            className="text-md hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            Contests
          </Link>
          <Link
            to="/playground"
            className="text-md hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            Playground
          </Link>
          <Link
            to="/submit"
            className="text-md hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            Submit Problem
          </Link>

          {/* <div className="ml-6 flex items-center space-x-4">
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105 flex items-center justify-between"
              >
                <FaUser className="mr-2" />
                Login/Register
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center transition-transform duration-300 transform hover:scale-105"
                  aria-label="User Menu"
                >
                  <FaPowerOff className="text-xl" />
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 bg-gray-700 text-gray-100 rounded-lg shadow-lg w-40"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-blue-500 transition duration-300"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link to="/home">
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left hover:bg-blue-500 transition duration-300"
                      >
                        Logout
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
