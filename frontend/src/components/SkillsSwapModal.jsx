import React, { useEffect, useRef } from "react";

const SkillSwapModal = ({ isOpen, onClose, onSubmit, user, mySkills = [] }) => {
  const [mySkill, setMySkill] = React.useState("");
  const [theirSkill, setTheirSkill] = React.useState("");
  const [message, setMessage] = React.useState("");

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

  const handleSubmit = () => {
    if (mySkill && theirSkill) {
      onSubmit({ mySkill, theirSkill, message });
      setMySkill("");
      setTheirSkill("");
      setMessage("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-lg p-6 w-96 max-w-full border border-gray-300"
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
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
          className="w-full mb-4 p-2 border border-gray-300 rounded"
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
          Choose one of their wanted skills
        </label>
        <select
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={theirSkill}
          onChange={(e) => setTheirSkill(e.target.value)}
        >
          <option value="">Select skill</option>
          {user?.skillsWanted?.map((skill, idx) => (
            <option key={idx} value={skill}>
              {skill}
            </option>
          ))}
        </select>

        <label className="text-sm mb-1 block">Message</label>
        <textarea
          rows="3"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillSwapModal;
