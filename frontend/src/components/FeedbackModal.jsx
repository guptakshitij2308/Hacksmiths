import React, { useState } from "react";
import axios from "axios";

const FeedbackModal = ({ isOpen, onClose, user, currentUserEmail }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/api/ratings/", {
        toUserEmail: user.email,
        fromUserEmail: currentUserEmail,
        rating,
        comment,
      });
      alert("Feedback submitted!");
      onClose();
    } catch (err) {
      console.error("Error submitting feedback", err);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Give Feedback to {user.name}
        </h2>
        <label className="block mb-2 text-sm font-medium">Rating (1-5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 w-full rounded mb-4"
        />
        <label className="block mb-2 text-sm font-medium">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 w-full rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
