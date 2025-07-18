import React, { useState, useEffect } from "react";
import SkillSwapModal from "../components/SkillsSwapModal.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/themecontext";
import FeedbackModal from "../components/FeedbackModal.jsx";

const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser);

const Home = () => {
  const { darkMode } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mySkills, setMySkills] = useState([]);

  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackUser, setFeedbackUser] = useState(null);

  const openFeedbackModal = (user) => {
    setFeedbackUser(user);
    setFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setFeedbackUser(null);
    setFeedbackModalOpen(false);
  };

  useEffect(() => {
    const fetchMySkills = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!storedUser || !token) return;

        const { data } = await axios.get(`/api/user/${storedUser.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMySkills(data.skillsOffered || []);
      } catch (err) {
        console.error("Failed to fetch your skills:", err);
      }
    };

    fetchMySkills();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const queryParams = [];

        if (availabilityFilter)
          queryParams.push(`availability=${availabilityFilter}`);
        if (searchTerm) queryParams.push(`skills=${searchTerm}`);
        queryParams.push(`page=${page}`, `limit=10`);

        const endpoint =
          queryParams.length > 0
            ? `/api/user/search?${queryParams.join("&")}`
            : `/api/user/all?page=${page}&limit=6`;

        const { data } = await axios.get(endpoint);
        setUsers(data.users || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Failed to fetch users:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [availabilityFilter, searchTerm, page]);

  const openModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Filters */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <select
          value={availabilityFilter}
          onChange={(e) => {
            setPage(1);
            setAvailabilityFilter(e.target.value);
          }}
          className={`rounded-lg px-4 py-2 w-full sm:w-1/3 shadow-sm focus:outline-none ${
            darkMode
              ? "bg-gray-800 border border-gray-600 text-white"
              : "bg-white border border-gray-300"
          }`}
        >
          <option value="">Availability</option>
          <option value="Weekends">Weekends</option>
          <option value="Evenings">Evenings</option>
        </select>

        <input
          type="text"
          placeholder="Search by skill"
          value={searchTerm}
          onChange={(e) => {
            setPage(1);
            setSearchTerm(e.target.value);
          }}
          className={`rounded-lg px-4 py-2 w-full sm:w-2/3 shadow-sm focus:outline-none ${
            darkMode
              ? "bg-gray-800 border border-gray-600 text-white"
              : "bg-white border border-gray-300"
          }`}
        />
      </div>

      {/* Users List */}
      <div className="max-w-6xl mx-auto space-y-6">
        {loading ? (
          <p className="text-center">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          users.map((user, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-5 rounded-lg shadow-md hover:shadow-lg transition ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-300"
              }`}
            >
              <Link to={`/user-details/${user.email}`}>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center border overflow-hidden ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-200 border-gray-300 text-gray-600"
                    }`}
                  >
                    {user.profilePhoto ? (
                      <img
                        src={user.profilePhoto}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      "Photo"
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{user.name}</h2>
                    <div className="text-sm mt-1">
                      <span className="text-green-500 font-medium">
                        Skills Offered:
                      </span>
                      {user.skillsOffered.map((skill) => (
                        <span
                          key={skill}
                          className="ml-2 inline-block text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full border border-blue-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm mt-1">
                      <span className="text-purple-400 font-medium">
                        Skills Wanted:
                      </span>
                      {user.skillsWanted.map((skill) => (
                        <span
                          key={skill}
                          className="ml-2 inline-block text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full border border-purple-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    {user.availability?.length > 0 && (
                      <div className="text-sm mt-1">
                        <span className="text-yellow-400 font-medium">
                          Availability:
                        </span>
                        {user.availability.map((slot) => (
                          <span
                            key={slot}
                            className="ml-2 inline-block text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full border border-yellow-300"
                          >
                            {slot}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>

              <div className="flex flex-col items-center gap-2 ml-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow w-28"
                  onClick={() => openModal(user)}
                >
                  Request
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-3 py-1 rounded-md ${
              page === 1
                ? "text-gray-500 cursor-not-allowed"
                : darkMode
                ? "text-white"
                : "text-black"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-md ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded-md ${
              page === totalPages
                ? "text-gray-500 cursor-not-allowed"
                : darkMode
                ? "text-white"
                : "text-black"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      <SkillSwapModal
        isOpen={modalOpen}
        onClose={closeModal}
        user={selectedUser}
        mySkills={mySkills}
      />

      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={closeFeedbackModal}
        user={selectedUser}
        currentUserEmail={storedUser?.email}
      />
    </div>
  );
};

export default Home;
