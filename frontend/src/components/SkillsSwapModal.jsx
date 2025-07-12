import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useTheme } from "../context/themecontext";

const SkillSwapModal = ({ isOpen, onClose, user, mySkills = [] }) => {
  const { darkMode } = useTheme();
  const [mySkill, setMySkill] = useState("");
  const [theirSkill, setTheirSkill] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const modalRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      alert("Please log in to send a swap request.");
      return;
    }

    if (!mySkill || !theirSkill) {
      alert("Please select both your skill and the one you want.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        offeredSkills: [mySkill],
        requestedSkills: [theirSkill],
        message,
        requestingUserEmail: storedUser.email,
        requestedUserEmail: user.email,
      };

      await axios.post("/api/swap/request", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Swap request submitted successfully!");
      setMySkill("");
      setTheirSkill("");
      setMessage("");
      onClose();
    } catch (err) {
      console.error("Error submitting swap request:", err);
      alert("Failed to submit swap request.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className={`relative rounded-lg shadow-lg p-6 w-96 max-w-full border ${
          darkMode
            ? "bg-gray-800 border-gray-600 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      >
        {/* Close button */}
        <button
          className={`absolute top-2 right-2 text-xl font-bold ${
            darkMode
              ? "text-gray-300 hover:text-red-400"
              : "text-gray-500 hover:text-red-500"
          }`}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Send Swap Request
        </h2>

        <label className="text-sm mb-1 block">
          Choose one of your offered skills
        </label>
        <select
          className={`w-full mb-4 p-2 rounded ${
            darkMode
              ? "bg-gray-700 border border-gray-600 text-white"
              : "border border-gray-300 bg-white"
          }`}
          value={mySkill}
          onChange={(e) => setMySkill(e.target.value)}
        >
          <option value="">Select skill</option>
          {mySkills.map((skill, idx) => (
            <option key={idx} value={skill}>
              {skill}
            </option>
          ))}
        </select>

        <label className="text-sm mb-1 block">
          Choose one of their offered skills
        </label>
        <select
          className={`w-full mb-4 p-2 rounded ${
            darkMode
              ? "bg-gray-700 border border-gray-600 text-white"
              : "border border-gray-300 bg-white"
          }`}
          value={theirSkill}
          onChange={(e) => setTheirSkill(e.target.value)}
        >
          <option value="">Select skill</option>
          {user?.skillsOffered?.map((skill, idx) => (
            <option key={idx} value={skill}>
              {skill}
            </option>
          ))}
        </select>

        <label className="text-sm mb-1 block">Message</label>
        <textarea
          rows="3"
          className={`w-full mb-4 p-2 rounded ${
            darkMode
              ? "bg-gray-700 border border-gray-600 text-white"
              : "border border-gray-300 bg-white"
          }`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillSwapModal;
