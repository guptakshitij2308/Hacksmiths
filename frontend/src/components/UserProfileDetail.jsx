import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SkillSwapModal from "./SkillsSwapModal.jsx";

const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  const mockUsers = [
    {
      name: "Marc Demo",
      rating: 3.8,
      availability: ["Weekends", "Evenings"],
      skillsOffered: ["JavaScript", "Python"],
      skillsWanted: ["Excel", "Graphic Design"],
      profilePhoto: "",
      feedbacks: [
        { score: 4.5, comment: "Very responsive and helpful!" },
        { score: 4.0, comment: "Quick to learn Excel tricks." },
        { score: 3.8, comment: "Helpful during weekend sessions." },
        { score: 5.0, comment: "Amazing peer mentor!" },
      ],
      isPublic: true,
    },
    {
      name: "Michell",
      rating: 2.5,
      availability: ["Weekdays"],
      skillsOffered: ["JavaScript", "Python"],
      skillsWanted: ["Excel", "Graphic Design"],
      profilePhoto: "",
      feedbacks: [
        { score: 2.0, comment: "Needs improvement in communication." },
      ],
      isPublic: false,
    },
  ];

  const mySkills = ["JS", "CPP", "Java"];

  const handleSubmitSwap = (data) => {
    console.log("Swap Request Submitted: ", data);
    // ⬆️ Send data + selectedUser info to backend here
    closeModal();
  };

  const user = mockUsers.find(
    (u) => u.name.replace(/\s+/g, "-").toLowerCase() === username
  );

  useEffect(() => {
    if (!user || !user.isPublic) {
      navigate("/"); // redirect if private or not found
    }
  }, [user, navigate]);

  if (!user || !user.isPublic) return null;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-300 p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-sm text-gray-600">
              Photo
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600 text-sm mt-1">
                <span className="font-semibold">Rating:</span> {user.rating}/5
                ⭐
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">Availability:</span>{" "}
                {user.availability?.join(", ")}
              </p>
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
            onClick={() => openModal(user)}
          >
            Request
          </button>
        </div>

        {/* Skills Offered */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-green-700">
            Skills Offered
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.skillsOffered.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded border border-blue-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-purple-700">
            Skills Wanted
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.skillsWanted.map((skill, idx) => (
              <span
                key={idx}
                className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded border border-purple-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Feedback Carousel */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Ratings & Feedback
          </h2>
          {user.feedbacks?.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="flex gap-4 w-max pb-2">
                {user.feedbacks.map((fb, idx) => (
                  <div
                    key={idx}
                    className="min-w-[250px] max-w-xs p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                  >
                    <p className="text-sm font-medium text-blue-700">
                      ⭐ {fb.score}/5
                    </p>
                    <p className="text-sm text-gray-700 mt-1">{fb.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No feedback yet.</p>
          )}
        </div>
        <SkillSwapModal
          isOpen={modalOpen}
          onClose={closeModal}
          onSubmit={handleSubmitSwap}
          user={selectedUser}
          mySkills={mySkills}
        />
      </div>
    </div>
  );
};

export default UserProfile;
