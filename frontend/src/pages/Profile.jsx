import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/themecontext";

const UserProfile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const { darkMode } = useTheme();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    availability: [],
    isPublic: true,
  });
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [newWantedSkill, setNewWantedSkill] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!token || !userInfo?.email) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/user/${userInfo.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        setUser(data);

        setFormData({
          name: data.name || "",
          location: data.location || "",
          availability: data.availability || [],
          isPublic: data.isPublic ?? true,
        });

        setSkillsOffered(data.skillsOffered || []);
        setSkillsWanted(data.skillsWanted || []);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [token, userInfo, navigate]);

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();
      if (!skillsOffered.includes(newSkill.trim())) {
        setSkillsOffered([...skillsOffered, newSkill.trim()]);
        setNewSkill("");
      }
    }
  };

  const handleAddWantedSkill = (e) => {
    if (e.key === "Enter" && newWantedSkill.trim()) {
      e.preventDefault();
      if (!skillsWanted.includes(newWantedSkill.trim())) {
        setSkillsWanted([...skillsWanted, newWantedSkill.trim()]);
        setNewWantedSkill("");
      }
    }
  };

  const handleRemoveSkill = (skill, type) => {
    if (!isEditing) return;
    if (type === "offered")
      setSkillsOffered(skillsOffered.filter((s) => s !== skill));
    else setSkillsWanted(skillsWanted.filter((s) => s !== skill));
  };

  const handleSave = async () => {
    try {
      const updates = {
        name: formData.name,
        location: formData.location,
        availability: formData.availability,
        isPublic: formData.isPublic,
        skillsOffered,
        skillsWanted,
      };

      await axios.patch("/api/user/update", updates, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Profile updated successfully!");
      setIsEditing(false);

      setUserInfo({ ...userInfo, name: formData.name });
    } catch (err) {
      console.error("Update failed:", err);
      alert("❌ Error updating profile");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 ${
        darkMode
          ? "bg-gray-900 text-gray-200"
          : "bg-gradient-to-b from-blue-50 to-purple-50 text-gray-900"
      }`}
    >
      <div
        className={`rounded-2xl shadow-xl w-full max-w-5xl p-8 relative grid grid-cols-1 md:grid-cols-2 gap-8 border ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
        }`}
      >
        <div className="absolute top-6 right-6 flex flex-col items-center">
          <img
            src={user?.profilePhoto || "/user.jpg"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200 shadow-md"
          />
        </div>

        <div className="space-y-5">
          {["name", "location"].map((field) => (
            <div className="flex items-center gap-4" key={field}>
              <label className="w-1/3 font-semibold capitalize">{field}:</label>
              <input
                className={`w-2/3 p-2 border rounded-md ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-white"
                }`}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
          ))}

          <div className="flex items-center gap-4">
            <label className="w-1/3 font-semibold">Availability:</label>
            <input
              className={`w-2/3 p-2 border rounded-md ${
                darkMode
                  ? "bg-gray-700 text-gray-200 border-gray-600"
                  : "bg-white"
              }`}
              name="availability"
              value={formData.availability.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  availability: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              readOnly={!isEditing}
              placeholder="e.g., evenings, weekends"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-1/3 font-semibold">Profile:</label>
            <select
              name="isPublic"
              value={formData.isPublic ? "public" : "private"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isPublic: e.target.value === "public",
                })
              }
              className={`w-2/3 p-2 border rounded-md ${
                darkMode
                  ? "bg-gray-700 text-gray-200 border-gray-600"
                  : "bg-white"
              }`}
              disabled={!isEditing}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {[
            {
              label: "Skills Offered:",
              items: skillsOffered,
              newSkill,
              setNewSkill,
              handleAddSkill,
              type: "offered",
            },
            {
              label: "Skills Wanted:",
              items: skillsWanted,
              newSkill: newWantedSkill,
              setNewSkill: setNewWantedSkill,
              handleAddSkill: handleAddWantedSkill,
              type: "wanted",
            },
          ].map((section) => (
            <div key={section.label}>
              <label className="font-semibold block mb-1">
                {section.label}
              </label>
              {isEditing && (
                <input
                  value={section.newSkill}
                  onChange={(e) => section.setNewSkill(e.target.value)}
                  onKeyDown={section.handleAddSkill}
                  className={`w-full p-2 mb-2 border rounded-md ${
                    darkMode
                      ? "bg-gray-700 text-gray-200 border-gray-600"
                      : "bg-white"
                  }`}
                  placeholder="Enter skill and press Enter"
                />
              )}
              <div className="flex flex-wrap gap-2">
                {section.items.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                      section.type === "offered"
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveSkill(skill, section.type)}
                        className="text-red-400 hover:text-red-600"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {isEditing ? (
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => window.location.reload()}
              className={`px-6 py-2 rounded-md ${
                darkMode
                  ? "bg-gray-600 text-white hover:bg-gray-500"
                  : "bg-gray-400 text-white hover:bg-gray-500"
              }`}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
