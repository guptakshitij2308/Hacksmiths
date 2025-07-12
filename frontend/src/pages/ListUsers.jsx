import React from "react";

const users = [
  {
    name: "Marc Demo",
    rating: 3.8,
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Excel", "Graphic Design"],
    profilePhoto: "",
  },
  {
    name: "Michell",
    rating: 2.5,
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Excel", "Graphic Design"],
    profilePhoto: "",
  },
  {
    name: "Joe Wills",
    rating: 4.0,
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Excel", "Graphic Design"],
    profilePhoto: "",
  },
];

const ListUsers = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Filters */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <select className="border border-gray-300 bg-white rounded-lg px-4 py-2 w-full sm:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
          <option>Availability</option>
          <option>Weekends</option>
          <option>Evenings</option>
        </select>
        <input
          type="text"
          placeholder="Search by skill"
          className="border border-gray-300 bg-white rounded-lg px-4 py-2 w-full sm:w-2/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* User Cards */}
      <div className="max-w-6xl mx-auto space-y-6">
        {users.map((user, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-5 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300 text-sm text-gray-600">
                Photo
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
                <div className="text-xs text-gray-500 mt-1">
                  Rating: {user.rating}/5
                </div>
              </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow">
              Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListUsers;
