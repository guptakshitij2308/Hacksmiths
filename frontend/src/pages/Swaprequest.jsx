import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const statusColor = {
  pending: "text-blue-500",
  accepted: "text-green-600",
  rejected: "text-red-500",
};

const SwapRequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser?.email) return;

      const { data } = await axios.get(
        `/api/swap/incoming?email=${storedUser.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests(data.requests || []);
    } catch (error) {
      console.error("Error fetching swap requests:", error);
    }
  };

  // ✅ Step 2: use fetchRequests inside useEffect
  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Step 3: use fetchRequests inside handleAction
  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `/api/swap/${action.toLowerCase()}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🔄 Refresh UI by fetching latest requests
      fetchRequests();
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  const filtered = requests.filter(
    (item) =>
      item.status === filter &&
      (item.requesterName || item.requestingUserEmail)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="flex items-center justify-between max-w-3xl mx-auto mb-6">
        <div className="flex gap-2 items-center">
          <select
            className="border border-gray-300 px-4 py-2 rounded-md"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="border border-gray-300 px-3 py-2 rounded-md">
            🔽
          </button>
        </div>
        <input
          className="border border-gray-300 px-4 py-2 rounded-md"
          placeholder="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        {paginatedData.map((user, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center p-5 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <Link to={`/user-details/${user.requestingUserEmail}`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300 text-sm text-gray-600 overflow-hidden">
                    {user.requesterPhoto ? (
                      <img
                        src={user.requesterPhoto}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      "Photo"
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold hover:underline cursor-pointer">
                      {user.requesterName || user.requestingUserEmail}
                    </h2>
                    <div className="text-sm mt-1">
                      <span className="text-green-600 font-medium">
                        Skills Offered:
                      </span>
                      {user.offeredSkills.map((skill) => (
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
                      {user.requestedSkills.map((skill) => (
                        <span
                          key={skill}
                          className="ml-2 inline-block text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full border border-purple-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Message: {user.message || "No message"}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2 items-center">
                <span>Status:</span>
                <span className={`font-bold ${statusColor[user.status]}`}>
                  {user.status}
                </span>
              </div>
              {user.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium shadow"
                    onClick={() => handleAction(user._id, "accept")}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium shadow"
                    onClick={() => handleAction(user._id, "reject")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center items-center gap-4 text-xl">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="cursor-pointer"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`${
              currentPage === i + 1 ? "font-bold" : "text-gray-600"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="cursor-pointer"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default SwapRequestPage;
