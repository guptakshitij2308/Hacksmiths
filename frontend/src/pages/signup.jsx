import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !email || !password || !skillsOffered.length || !skillsWanted.length || !availability.length || !image) {
      setError("Please fill all fields including image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("isPublic", isPublic);

    skillsOffered.forEach(skill => formData.append("skillsOffered", skill));
    skillsWanted.forEach(skill => formData.append("skillsWanted", skill));
    availability.forEach(slot => formData.append("availability", slot));
    formData.append("image", image);

    try {
      await axios.post("/api/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleMultiValue = (input, setter) => {
    const items = input.split(",").map(i => i.trim()).filter(Boolean);
    setter(items);
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-8 bg-gray-100 text-gray-900'>
      <div className='w-full max-w-md p-8 rounded-lg shadow-lg bg-white border border-gray-300'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Signup</h1>
        {error && <p className='text-red-500 mb-4 text-center'>{error}</p>}

        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full p-3 mb-3 rounded-lg border bg-gray-200'
          placeholder='Full Name'
        />

        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-3 mb-3 rounded-lg border bg-gray-200'
          placeholder='Email'
        />

        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-3 mb-3 rounded-lg border bg-gray-200'
          placeholder='Password'
        />

        <input
          type='text'
          onChange={(e) => handleMultiValue(e.target.value, setSkillsOffered)}
          className='w-full p-3 mb-3 rounded-lg border bg-gray-200'
          placeholder='Skills Offered (comma-separated)'
        />

        <input
          type='text'
          onChange={(e) => handleMultiValue(e.target.value, setSkillsWanted)}
          className='w-full p-3 mb-3 rounded-lg border bg-gray-200'
          placeholder='Skills Wanted (comma-separated)'
        />

        <input
          type='text'
          onChange={(e) => handleMultiValue(e.target.value, setAvailability)}
          className='w-full p-3 mb-3 rounded-lg border bg-gray-200'
          placeholder='Availability (e.g., Evenings, Weekends)'
        />

        <div className='mb-3'>
          <label className='block text-sm font-semibold mb-1'>Profile Image</label>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setImage(e.target.files[0])}
            className='w-full'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-semibold mb-1'>Profile Visibility</label>
          <select
            value={isPublic}
            onChange={(e) => setIsPublic(e.target.value === "true")}
            className='w-full p-3 rounded-lg border bg-gray-200'
          >
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className='bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition w-full'
        >
          Signup
        </button>

        <div className='mt-4 text-center'>
          <Link
            to='/login'
            className='text-blue-400 hover:underline hover:text-blue-500'
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
