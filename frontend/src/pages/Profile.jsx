import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

const UserProfile = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`${
        darkMode
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-r from-teal-50 via-blue-50 to-purple-50 text-gray-900'
      } min-h-screen flex flex-col transition-colors duration-500 relative`}
    >
      <header
        className={`flex items-center justify-between p-4 shadow-md ${
          darkMode
            ? 'bg-gray-800 border-b border-gray-700'
            : 'bg-white/70 backdrop-blur border-b border-gray-200'
        }`}
      >
        <div className='flex items-center gap-4'>
          <button className='text-green-600 font-semibold hover:underline'>
            Save
          </button>
          <button className='text-red-500 font-semibold hover:underline'>
            Discard
          </button>
        </div>
        <nav className='flex gap-6'>
          <Link to='/swap-requests' className='hover:underline'>
            Swap Requests
          </Link>
          <Link to='/' className='hover:underline'>
            Home
          </Link>
          <img
            src='./user.jpg'
            alt='Profile'
            className='rounded-full w-10 h-10'
          />
        </nav>
      </header>
      <main className='flex flex-1 items-start justify-center py-8'>
        <div className='w-full max-w-4xl p-6 bg-white rounded-xl shadow-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <div className='mb-4'>
              <label className='block font-semibold mb-1'>Name</label>
              <input
                className='w-full p-2 rounded-lg border border-gray-300'
                placeholder='Your Name'
              />
            </div>
            <div className='mb-4'>
              <label className='block font-semibold mb-1'>Location</label>
              <input
                className='w-full p-2 rounded-lg border border-gray-300'
                placeholder='Your Location'
              />
            </div>
            <div className='mb-4'>
              <label className='block font-semibold mb-1'>Skills Offered</label>
              <div className='flex flex-wrap gap-2'>
                {['Graphic Design', 'Video Editing', 'Photoshop'].map(
                  (skill) => (
                    <span
                      key={skill}
                      className='px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full flex items-center gap-2'
                    >
                      {skill}{' '}
                      <button className='text-red-400 hover:text-red-600'>
                        &times;
                      </button>
                    </span>
                  )
                )}
              </div>
            </div>
            <div className='mb-4'>
              <label className='block font-semibold mb-1'>Availability</label>
              <input
                className='w-full p-2 rounded-lg border border-gray-300'
                placeholder='Weekends'
              />
            </div>
            <div>
              <label className='block font-semibold mb-1'>Profile</label>
              <select className='w-full p-2 rounded-lg border border-gray-300'>
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>
          </div>
          <div>
            <div className='mb-4'>
              <label className='block font-semibold mb-1'>Skills Wanted</label>
              <div className='flex flex-wrap gap-2'>
                {['Python', 'JavaScript', 'Manager'].map((skill) => (
                  <span
                    key={skill}
                    className='px-3 py-1 bg-pink-100 text-pink-600 rounded-full flex items-center gap-2'
                  >
                    {skill}{' '}
                    <button className='text-red-400 hover:text-red-600'>
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <img
                src='./user.jpg'
                alt='Profile'
                className='rounded-full w-32 h-32 object-cover border-4 border-indigo-300'
              />
              <div className='mt-4 flex gap-4'>
                <button className='bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600'>
                  Add/Edit
                </button>
                <button className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'>
                  Remove
                </button>
              </div>
            </div>
          </div>
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

export default UserProfile;
