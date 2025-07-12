import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`${
        darkMode ? 'bg-gray-900 text-white' : 'bg-cream-100 text-gray-900'
      } min-h-screen flex flex-col transition-colors duration-500 relative`}
    >
      <header
        className={`flex items-center justify-between p-4 shadow-md ${
          darkMode
            ? 'bg-gray-800 border-b border-gray-700'
            : 'bg-cream-200 border-b border-cream-300'
        }`}
      >
        <h1 className='text-lg font-semibold'>Skill Swap Platform</h1>
        <nav>
          <Link
            to='/'
            className='px-4 py-2 border rounded-full hover:bg-gray-100 transition'
          >
            Home
          </Link>
        </nav>
      </header>
      <main className='flex flex-1 items-center justify-center'>
        <div
          className={`${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border border-cream-300'
          } w-full max-w-sm p-6 rounded-lg shadow-lg`}
        >
          <h2 className='text-center text-xl font-bold mb-6'>
            User Login Page
          </h2>
          {error && <p className='text-red-500 mb-4 text-center'>{error}</p>}
          <form onSubmit={() => {}} className='space-y-4'>
            <div>
              <label className='block mb-1 font-medium'>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-2 rounded border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-cream-50 border-cream-300'
                }`}
                placeholder='Email'
                required
              />
            </div>
            <div>
              <label className='block mb-1 font-medium'>Password</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-2 rounded border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-cream-50 border-cream-300'
                }`}
                placeholder='Password'
                required
              />
            </div>
            <button
              type='submit'
              className={`block mx-auto px-6 py-2 rounded-full border ${
                darkMode
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-cream-300 text-gray-900 hover:bg-cream-400'
              }`}
            >
              Login
            </button>
            <div className='text-center'>
              <Link to='/forgot' className='text-blue-600 hover:underline'>
                Forgot username/password
              </Link>
            </div>
          </form>
        </div>
      </main>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed bottom-6 left-6 p-3 rounded-full shadow-lg ${
          darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
        } transition`}
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
};

export default LoginPage;
