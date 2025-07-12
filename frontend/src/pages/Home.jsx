import React, { useState, useEffect } from "react";
import SkillSwapModal from "../components/SkillsSwapModal.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const mySkills = ["JavaScript", "React", "Excel"];

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

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

  const handleSubmitSwap = (data) => {
    console.log("Swap Request Submitted:", data);
    // TODO: Send POST to backend
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Filters */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <select
          value={availabilityFilter}
          onChange={(e) => {
            setPage(1);
            setAvailabilityFilter(e.target.value);
          }}
          className="border border-gray-300 bg-white rounded-lg px-4 py-2 w-full sm:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
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
          className="border border-gray-300 bg-white rounded-lg px-4 py-2 w-full sm:w-2/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
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
              className="flex items-center justify-between p-5 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <Link to={`/user-details/${user._id}`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300 text-sm text-gray-600 overflow-hidden">
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
                      <span className="text-green-600 font-medium">
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
                      <span className="text-purple-600 font-medium">
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
                        <span className="text-yellow-600 font-medium">
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
                    <div className="text-xs text-gray-500 mt-1">
                      {user.rating ? (
                        <span>Rating: {user.rating}/5</span>
                      ) : (
                        <span className="text-green-700 font-medium">
                          New User
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
                onClick={() => openModal(user)}
              >
                Request
              </button>
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
              page === 1 ? " text-gray-500 cursor-not-allowed" : " text-black "
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
                ? " text-gray-500 cursor-not-allowed"
                : " text-black"
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
        onSubmit={handleSubmitSwap}
        user={selectedUser}
        mySkills={mySkills}
      />
    </div>
  );
};

export default Home;
