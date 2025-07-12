import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SkillSwapModal from "./SkillsSwapModal.jsx";
import FeedbackModal from "./FeedbackModal.jsx";

const UserProfile = () => {
  const { email } = useParams(); // ⬅️ Get email from URL
  console.log(email);
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log(storedUser);

  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mySkills, setMySkills] = useState([]);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackUser, setFeedbackUser] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRating, setAverageRating] = useState(null);

  const openFeedbackModal = (user) => {
    setFeedbackUser(user);
    setFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setFeedbackUser(null);
    setFeedbackModalOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/user/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        navigate("/"); // redirect if error or profile is private
      }
    };

    const fetchMySkills = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/user/${loggedInUser.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMySkills(res.data.skillsOffered || []);
      } catch (err) {
        console.error("Failed to fetch my skills", err);
      }
    };
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get(`/api/ratings/user/${email}`);
        console.log("Feedbacks fetched:", res.data);
        setFeedbacks(res.data.data || []);
        setAverageRating(res.data.averageRating);
      } catch (err) {
        console.error("Failed to fetch feedbacks", err);
      }
    };

    fetchUser();
    fetchMySkills();
    fetchFeedbacks();
  }, [email, navigate]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmitSwap = (data) => {
    console.log("Swap request submitted:", data);
    closeModal();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-300 p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-gray-600">
                  Photo
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600 text-sm mt-1">
                <span className="font-semibold">Rating:</span>{" "}
                {averageRating
                  ? `${averageRating.toFixed(1)}/5 ⭐`
                  : "New User"}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">Availability:</span>{" "}
                {user.availability?.join(", ") || "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 ml-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow w-28"
              onClick={() => openModal(user)}
            >
              Request
            </button>
            <button
              onClick={() => openFeedbackModal(user)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow w-28"
            >
              Feedback
            </button>
          </div>
        </div>

        {/* Skills Offered */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-green-700">
            Skills Offered
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.skillsOffered?.length > 0 ? (
              user.skillsOffered.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded border border-blue-300"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No skills listed</p>
            )}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-purple-700">
            Skills Wanted
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.skillsWanted?.length > 0 ? (
              user.skillsWanted.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded border border-purple-300"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No skills requested</p>
            )}
          </div>
        </div>

        {/* Feedbacks */}
        {feedbacks.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Ratings & Feedback
            </h2>
            <div className="overflow-x-auto">
              <div className="flex gap-4 w-max pb-2">
                {feedbacks.map((fb, idx) => (
                  <div
                    key={idx}
                    className="min-w-[250px] max-w-xs p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                  >
                    <p className="text-sm font-medium text-blue-700">
                      ⭐ {fb.rating}/5
                    </p>
                    <p className="text-sm text-gray-700 mt-1">{fb.comment}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      by {fb.fromUser?.name || fb.fromUser?.email}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        <SkillSwapModal
          isOpen={modalOpen}
          onClose={closeModal}
          onSubmit={handleSubmitSwap}
          user={user}
          mySkills={mySkills}
        />
        <FeedbackModal
          isOpen={feedbackModalOpen}
          onClose={closeFeedbackModal}
          user={user}
          currentUserEmail={storedUser.email}
        />
      </div>
    </div>
  );
};

export default UserProfile;
