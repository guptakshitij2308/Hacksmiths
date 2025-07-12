import './App.css';
import Login from './pages/login';
import SignUp from './pages/signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
