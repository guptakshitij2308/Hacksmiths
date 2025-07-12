import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-100 via-white to-blue-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10 text-sm">
        {/* Logo & Social */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">SkillSwap</h2>
          <p className="mb-4">
            Connect, collaborate, and grow by sharing your skills.
          </p>
          <div className="flex gap-4 text-blue-600 text-lg">
            <a href="#" className="hover:text-blue-800 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-800 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-800 transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-blue-800 transition">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-blue-600">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Bug Bounty
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Location */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>
            Email:{" "}
            <a
              href="mailto:support@skillswap.com"
              className="text-blue-600 hover:underline"
            >
              support@skillswap.com
            </a>
          </p>
          <p className="mt-2">Made with ❤️ in India</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 text-center text-xs text-gray-500 py-4">
        &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
