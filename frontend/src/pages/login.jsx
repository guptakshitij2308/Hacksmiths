import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // adjust path

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // ✅ Save user info in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Optional: Set auth header globally (if needed)
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUserInfo(JSON.stringify(user));

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-100 text-gray-900">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-50 border border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 rounded-lg border-2 bg-gray-200 text-gray-900 border-gray-400"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 rounded-lg border-2 bg-gray-200 text-gray-900 border-gray-400"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/signup"
            className="text-blue-400 hover:underline hover:text-blue-500"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
