import "./App.css";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import Profile from "./pages/Profile";
import SwapRequest from "./pages/Swaprequest.jsx";
import UserProfile from "./components/UserProfileDetail.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet /> {/* All matched child routes go here */}
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wrapper route */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/swap" element={<SwapRequest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user-details/:id" element={<UserProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
