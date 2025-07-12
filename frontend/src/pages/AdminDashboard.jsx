import React, { useState } from "react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("skills");

  const [skills, setSkills] = useState([
    { id: 1, text: "Professional Sleeper", status: "pending" },
    { id: 2, text: "JavaScript Developer", status: "pending" },
    { id: 3, text: "React Native Enthusiast", status: "pending" },
    { id: 4, text: "Backend API Designer", status: "pending" },
    { id: 5, text: "UI/UX Researcher", status: "pending" },
    { id: 6, text: "DevOps Intern", status: "pending" },
    { id: 7, text: "Cybersecurity Hobbyist", status: "pending" },
    { id: 8, text: "Open Source Contributor", status: "pending" },
    { id: 9, text: "Node.js Architect", status: "pending" },
  ]);

  const [users, setUsers] = useState([
    {
      _id: "6871e1f79b4e602ef137c625",
      name: "Akshitha",
      email: "akshitha1@example.com",
      banned: false,
    },
    {
      _id: "6871e63ce7f0af6646b7c6ef",
      name: "dalwadi",
      email: "akshitha12@example.com",
      banned: false,
    },
    {
      _id: "6871ea58ac84c3c5c76408f3",
      name: "Akshitha",
      email: "aks@gmail.com",
      banned: false,
    },
    {
      _id: "6871eb0dac84c3c5c76408f6",
      name: "Akshitha",
      email: "aks123@gmail.com",
      banned: false,
    },
  ]);

  const [swaps, setSwaps] = useState([
    {
      _id: "68722824241bc7037f6bc362",
      requestingUserEmail: "aks123@gmail.com",
      requestedUserEmail: "akshitha12@example.com",
      status: "pending",
      message: "heyy",
    },
    {
      _id: "68722ca7fd9da1e462d7adf0",
      requestingUserEmail: "guptakshitij2308@gmail.com",
      requestedUserEmail: "aks123@gmail.com",
      status: "accepted",
      message: "heyy",
    },
    {
      _id: "687233857f86e31f522f2209",
      requestingUserEmail: "guptakshitij2308@gmail.com",
      requestedUserEmail: "aks123@gmail.com",
      status: "accepted",
      message: "help",
    },
    {
      _id: "687233b07f86e31f522f220e",
      requestingUserEmail: "guptakshitij2308@gmail.com",
      requestedUserEmail: "aks123@gmail.com",
      status: "rejected",
      message: "hey",
    },
    {
      _id: "687238247f86e31f522f2320",
      requestingUserEmail: "aks123@gmail.com",
      requestedUserEmail: "h@email.com",
      status: "pending",
      message: "help",
    },
  ]);

  const handleSkillAction = (id, action) => {
    setSkills((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: action === "approve" ? "approved" : "rejected" }
          : s
      )
    );
  };

  const toggleBan = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, banned: !u.banned } : u))
    );
  };

  const sendAlert = () => {
    alert("Platform alert sent to all users!");
  };

  const downloadReport = (type) => {
    const data = {
      users,
      skills,
      swaps,
    };
    const blob = new Blob([JSON.stringify(data[type], null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}_report.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-6">
        {["skills", "users", "swaps", "alerts", "reports"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Skills Tab */}
      {activeTab === "skills" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Skill Moderation</h2>
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex justify-between items-center bg-white shadow-sm border border-gray-200 p-4 mb-3 rounded"
            >
              <span>
                {skill.text} —{" "}
                <span className="italic text-sm text-gray-500">
                  {skill.status}
                </span>
              </span>
              {skill.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSkillAction(skill.id, "approve")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleSkillAction(skill.id, "reject")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          {users.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center bg-white shadow-sm border border-gray-200 p-4 mb-3 rounded"
            >
              <span>
                {user.name} ({user.email}) —{" "}
                <span
                  className={`italic text-sm ${
                    user.banned ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {user.banned ? "Banned" : "Active"}
                </span>
              </span>
              <button
                onClick={() => toggleBan(user._id)}
                className={`px-3 py-1 rounded ${
                  user.banned ? "bg-green-500" : "bg-red-500"
                } text-white`}
              >
                {user.banned ? "Unban" : "Ban"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Swaps Tab */}
      {activeTab === "swaps" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Monitor Swaps</h2>
          {swaps.map((swap) => (
            <div
              key={swap._id}
              className="bg-white shadow-sm border border-gray-200 p-4 mb-3 rounded"
            >
              <div className="flex justify-between">
                <span>
                  Swap #{swap._id.slice(-6)} —{" "}
                  <strong>{swap.requestingUserEmail}</strong> ➝{" "}
                  <strong>{swap.requestedUserEmail}</strong>
                  {swap.message && (
                    <span className="ml-2 italic text-gray-500">
                      (“{swap.message}”)
                    </span>
                  )}
                </span>
                <span className="italic text-sm text-gray-500">
                  {swap.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === "alerts" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Send Platform-Wide Message
          </h2>
          <textarea
            rows="4"
            className="w-full border border-gray-300 rounded p-3 mb-4"
            placeholder="Type your message here..."
          />
          <button
            onClick={sendAlert}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Send Alert
          </button>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Download Reports</h2>
          <div className="flex gap-4">
            <button
              onClick={() => downloadReport("users")}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              User Activity
            </button>
            <button
              onClick={() => downloadReport("skills")}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              Skill Logs
            </button>
            <button
              onClick={() => downloadReport("swaps")}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              Swap Stats
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
