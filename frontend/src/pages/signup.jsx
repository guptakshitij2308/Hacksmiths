import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [availability, setAvailability] = useState("weekday");
  const [isPublic, setIsPublic] = useState(true);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const { setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (
      !name ||
      !location ||
      !email ||
      !password ||
      !skillsOffered.length ||
      !skillsWanted.length ||
      !availability ||
      !image
    ) {
      setError("Please fill all fields including image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("location", location);
    formData.append("isPublic", isPublic);
    skillsOffered.forEach((skill) => formData.append("skillsOffered", skill));
    skillsWanted.forEach((skill) => formData.append("skillsWanted", skill));
    formData.append("availability", availability);
    formData.append("image", image);

    try {
      const res = await axios.post("/api/auth/register", formData);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(user));
      setUserInfo(JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleAddSkill = (e, setter, array) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !array.includes(value)) {
        setter([...array, value]);
        e.target.value = "";
      }
    }
  };

  const handleRemoveSkill = (skill, setter, array) => {
    setter(array.filter((s) => s !== skill));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-100 text-gray-900">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white border border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-center">Signup</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-3 rounded-lg border bg-gray-200"
          placeholder="Full Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-3 rounded-lg border bg-gray-200"
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-3 rounded-lg border bg-gray-200"
          placeholder="Password"
        />
        <input
          type="text"
          onKeyDown={(e) => handleAddSkill(e, setSkillsOffered, skillsOffered)}
          className="w-full p-3 mb-3 rounded-lg border bg-gray-200"
          placeholder="Enter Skills Offered (press Enter)"
        />
        <div className="flex flex-wrap gap-2 mb-3">
          {skillsOffered.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-green-100 text-green-600 rounded-full flex items-center gap-2 text-sm font-medium"
            >
              {skill}
              <button
                onClick={() =>
                  handleRemoveSkill(skill, setSkillsOffered, skillsOffered)
                }
                className="text-red-400 hover:text-red-600"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          onKeyDown={(e) => handleAddSkill(e, setSkillsWanted, skillsWanted)}
          className="w-full p-3 mb-3 rounded-lg border bg-gray-200"
          placeholder="Enter Skills Wanted (press Enter)"
        />
        <div className="flex flex-wrap gap-2 mb-3">
          {skillsWanted.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full flex items-center gap-2 text-sm font-medium"
            >
              {skill}
              <button
                onClick={() =>
                  handleRemoveSkill(skill, setSkillsWanted, skillsWanted)
                }
                className="text-red-400 hover:text-red-600"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 mb-3 rounded-lg border bg-gray-200"
          placeholder="Location"
        />
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Availability
          </label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full p-3 rounded-lg border bg-gray-200"
          >
            <option value="weekday">Weekday</option>
            <option value="weekend">Weekend</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">
            Profile Image
          </label>
          {!image ? (
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full flex items-center gap-2 text-sm font-medium"
            >
              Choose File
            </button>
          ) : (
            <span className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full flex items-center gap-2 text-sm font-medium">
              {image.name}
              <button
                onClick={() => setImage(null)}
                className="text-red-400 hover:text-red-600"
              >
                &times;
              </button>
            </span>
          )}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Profile Visibility
          </label>
          <select
            value={isPublic}
            onChange={(e) => setIsPublic(e.target.value === "true")}
            className="w-full p-3 rounded-lg border bg-gray-200"
          >
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition w-full"
        >
          Signup
        </button>
        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-blue-400 hover:underline hover:text-blue-500"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
