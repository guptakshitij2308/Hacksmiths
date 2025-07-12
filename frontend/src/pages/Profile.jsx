import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
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
    if (!token || !storedUser) return navigate("/login");

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/user/${storedUser.email}`, {
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
  }, []);

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

      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Error updating profile");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-4 py-12 text-gray-900">
      <div className="bg-white rounded-2xl shadow-xl h-full w-full max-w-5xl p-8 relative grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {/* Profile Image top-right */}
        <div className="absolute top-6 right-6 flex flex-col items-center">
          <img
            src={user?.profilePhoto || "/user.jpg"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-200 shadow-md"
          />
        </div>

        {/* Left Column */}
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <label className="w-1/3 font-semibold">Name:</label>
            <input
              className="w-2/3 p-2 border rounded-md"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-1/3 font-semibold">Location:</label>
            <input
              className="w-2/3 p-2 border rounded-md"
              name="location"
              value={formData.location}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-1/3 font-semibold">Availability:</label>
            <input
              className="w-2/3 p-2 border rounded-md"
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
              className="w-2/3 p-2 border rounded-md"
              disabled={!isEditing}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="space-y-6 flex justify-between">
            <div>
              <label className="font-semibold block mb-1">
                Skills Offered:
              </label>
              {isEditing && (
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleAddSkill}
                  className="w-full p-2 mb-2 border rounded-md"
                  placeholder="Enter skill and press Enter"
                />
              )}
              <div className="flex flex-wrap gap-2">
                {skillsOffered.map((skill) => (
                  <span
                    key={skill}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveSkill(skill, "offered")}
                        className="text-red-400 hover:text-red-600"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold block mb-1">Skills Wanted:</label>
              {isEditing && (
                <input
                  value={newWantedSkill}
                  onChange={(e) => setNewWantedSkill(e.target.value)}
                  onKeyDown={handleAddWantedSkill}
                  className="w-full p-2 mb-2 border rounded-md"
                  placeholder="Enter skill and press Enter"
                />
              )}
              <div className="flex flex-wrap gap-2">
                {skillsWanted.map((skill) => (
                  <span
                    key={skill}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveSkill(skill, "wanted")}
                        className="text-red-400 hover:text-red-600"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
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
              className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500"
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

// import { useState } from "react";

// const UserProfileEdit = () => {
//   const [skillsOffered, setSkillsOffered] = useState([
//     "Graphic Design",
//     "Video Editing",
//     "Photoshop",
//   ]);
//   const [skillsWanted, setSkillsWanted] = useState([
//     "Python",
//     "JavaScript",
//     "Manager",
//   ]);
//   const [availability, setAvailability] = useState("weekends");
//   const [profileType, setProfileType] = useState("Public");
//   const [name, setName] = useState("");
//   const [location, setLocation] = useState("");

//   const [newOfferedSkill, setNewOfferedSkill] = useState("");
//   const [newWantedSkill, setNewWantedSkill] = useState("");

//   const handleSkillAdd = (type) => {
//     if (
//       type === "offered" &&
//       newOfferedSkill &&
//       !skillsOffered.includes(newOfferedSkill)
//     ) {
//       setSkillsOffered([...skillsOffered, newOfferedSkill]);
//       setNewOfferedSkill("");
//     }
//     if (
//       type === "wanted" &&
//       newWantedSkill &&
//       !skillsWanted.includes(newWantedSkill)
//     ) {
//       setSkillsWanted([...skillsWanted, newWantedSkill]);
//       setNewWantedSkill("");
//     }
//   };

//   const handleSkillRemove = (type, skill) => {
//     if (type === "offered")
//       setSkillsOffered(skillsOffered.filter((s) => s !== skill));
//     if (type === "wanted")
//       setSkillsWanted(skillsWanted.filter((s) => s !== skill));
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex items-center justify-center py-10 px-4">
//       <div className="border border-white rounded-2xl p-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* Left side */}
//         <div>
//           {/* Name */}
//           <div className="mb-6">
//             <label className="block font-handwritten text-lg mb-1">Name</label>
//             <input
//               className="w-full bg-black border-b border-white outline-none"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="__________"
//             />
//           </div>

//           {/* Location */}
//           <div className="mb-6">
//             <label className="block font-handwritten text-lg mb-1">
//               Location
//             </label>
//             <input
//               className="w-full bg-black border-b border-white outline-none"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               placeholder="__________"
//             />
//           </div>

//           {/* Skills Offered */}
//           <div className="mb-6">
//             <label className="block font-handwritten text-lg mb-1">
//               Skills Offered
//             </label>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {skillsOffered.map((skill, i) => (
//                 <span
//                   key={i}
//                   className="bg-black border border-white rounded-full px-3 py-1 flex items-center gap-2"
//                 >
//                   {skill}
//                   <button
//                     onClick={() => handleSkillRemove("offered", skill)}
//                     className="text-white text-xs"
//                   >
//                     ❌
//                   </button>
//                 </span>
//               ))}
//             </div>
//             <input
//               value={newOfferedSkill}
//               onChange={(e) => setNewOfferedSkill(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSkillAdd("offered")}
//               placeholder="Add Skill"
//               className="mt-2 w-full bg-black border-b border-white outline-none"
//             />
//           </div>

//           {/* Availability */}
//           <div className="mb-6">
//             <label className="block font-handwritten text-lg mb-1">
//               Availability
//             </label>
//             <input
//               className="w-full bg-black border-b border-white outline-none"
//               value={availability}
//               onChange={(e) => setAvailability(e.target.value)}
//               placeholder="weekends"
//             />
//           </div>

//           {/* Profile */}
//           <div className="mb-6">
//             <label className="block font-handwritten text-lg mb-1">
//               Profile
//             </label>
//             <select
//               className="w-full bg-black border-b border-white outline-none"
//               value={profileType}
//               onChange={(e) => setProfileType(e.target.value)}
//             >
//               <option>Public</option>
//               <option>Private</option>
//             </select>
//           </div>
//         </div>

//         {/* Right side */}
//         <div>
//           {/* Profile Photo */}
//           <div className="flex flex-col items-center mb-10">
//             <div className="rounded-full border border-white w-40 h-40 flex items-center justify-center text-center text-sm">
//               Profile Photo
//             </div>
//             <div className="mt-3 text-sm">
//               <span className="text-white">Add/Edit</span>{" "}
//               <button className="text-red-400 hover:underline">Remove</button>
//             </div>
//           </div>

//           {/* Skills Wanted */}
//           <div className="mb-6">
//             <label className="block font-handwritten text-lg mb-1">
//               Skills Wanted
//             </label>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {skillsWanted.map((skill, i) => (
//                 <span
//                   key={i}
//                   className="bg-black border border-white rounded-full px-3 py-1 flex items-center gap-2"
//                 >
//                   {skill}
//                   <button
//                     onClick={() => handleSkillRemove("wanted", skill)}
//                     className="text-white text-xs"
//                   >
//                     ❌
//                   </button>
//                 </span>
//               ))}
//             </div>
//             <input
//               value={newWantedSkill}
//               onChange={(e) => setNewWantedSkill(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSkillAdd("wanted")}
//               placeholder="Add Skill"
//               className="mt-2 w-full bg-black border-b border-white outline-none"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfileEdit;
