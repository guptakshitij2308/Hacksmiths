import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 bg-gray-200 text-gray-800">
      <div className="container mx-auto px-4 text-center">
        {/* Copyright */}
        <div className="mb-4">
          <p>&copy; 2024 SkillSwap. All rights reserved.</p>
        </div>

        {/* Footer Links (non-functional buttons for now) */}
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <button className="px-4 py-2 rounded transition duration-300 bg-gray-300 text-gray-800 hover:bg-gray-200 hover:text-blue-600">
            Help Center
          </button>
          <button className="px-4 py-2 rounded transition duration-300 bg-gray-300 text-gray-800 hover:bg-gray-200 hover:text-blue-600">
            Bug Bounty
          </button>
          <button className="px-4 py-2 rounded transition duration-300 bg-gray-300 text-gray-800 hover:bg-gray-200 hover:text-blue-600">
            Terms
          </button>
          <button className="px-4 py-2 rounded transition duration-300 bg-gray-300 text-gray-800 hover:bg-gray-200 hover:text-blue-600">
            Privacy Policy
          </button>
        </div>

        {/* Location */}
        <div>
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
