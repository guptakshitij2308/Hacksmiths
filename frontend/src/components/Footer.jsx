import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { useTheme } from "../context/themecontext";

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`${
        darkMode
          ? "bg-gray-900 text-gray-200"
          : "bg-gradient-to-r from-blue-100 via-white to-blue-100 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10 text-sm">
        {/* Logo & Social */}
        <div>
          <h2
            className={`text-2xl font-bold mb-4 ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            SkillSwap
          </h2>
          <p className="mb-4">
            Connect, collaborate, and grow by sharing your skills.
          </p>
          <div
            className={`flex gap-4 text-lg ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            <a href="#" className="hover:text-blue-500 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {[
              "Help Center",
              "Bug Bounty",
              "Terms of Service",
              "Privacy Policy",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className={`transition ${
                    darkMode
                      ? "text-gray-300 hover:text-blue-400"
                      : "hover:text-blue-600"
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Location */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>
            Email:{" "}
            <a
              href="mailto:support@skillswap.com"
              className={`hover:underline ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              support@skillswap.com
            </a>
          </p>
          <p className="mt-2">Made with ❤️ in India</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={`border-t text-center text-xs py-4 ${
          darkMode
            ? "border-gray-700 text-gray-400"
            : "border-gray-300 text-gray-500"
        }`}
      >
        &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
