import './App.css';
import Login from './pages/login';
import SignUp from './pages/signup';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ListUsers from './pages/ListUsers';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/list-users' element={<ListUsers />} />
          <Route path='/profile' element={<Profile />} />
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
