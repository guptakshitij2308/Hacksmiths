import './App.css';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Profile from './pages/Profile';
import UserProfile from './components/UserProfileDetail.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/user-details/:username' element={<UserProfile />} />
        </Routes>
      </Layout>
      ?
    </Router>
  );
}

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default App;
