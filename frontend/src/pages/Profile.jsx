import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

const UserProfile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (newSkill && !skillsOffered.includes(newSkill)) {
        setSkillsOffered([...skillsOffered, newSkill]);
        setNewSkill('');
      }
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkillsOffered(skillsOffered.filter((s) => s !== skill));
  };

  return (
    <div
      className={`${
        darkMode
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-r from-teal-50 via-blue-50 to-purple-50 text-gray-900'
      } min-h-screen flex flex-col transition-colors duration-500 relative`}
    >
      <main className='flex flex-1 flex-col items-center justify-center py-12'>
        <div
          className={`${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border border-gray-200'
          } w-full max-w-6xl p-10 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-10`}
        >
          <div>
            <div className='mb-6 flex items-center gap-4'>
              <label className='w-1/3 font-semibold'>Name:</label>
              <input
                className='w-2/3 p-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500'
                placeholder='Your Location'
              />
            </div>
            <div className='mb-6 flex items-center gap-4'>
              <label className='w-1/3 font-semibold'>Enter a Skill:</label>
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleAddSkill}
                className='w-2/3 p-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500'
                placeholder='Add Skill'
              />
            </div>
            <div className='mb-6 flex items-center gap-4'>
              <label className='w-1/3 font-semibold'>Location:</label>
              <input
                className='w-2/3 p-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500'
                placeholder='Your Location'
              />
            </div>
            <div className='mb-6 flex items-center gap-4'>
              <label className='w-1/3 font-semibold'>Availability:</label>
              <input
                className='w-2/3 p-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500'
                placeholder='Weekends'
              />
            </div>
            <div className='flex items-center gap-4'>
              <label className='w-1/3 font-semibold'>Profile:</label>
              <select className='w-2/3 p-3 rounded-lg border border-gray-300 text-gray-900'>
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>
          </div>
          <div>
            <div className='mb-6'>
              <label className='block font-semibold mb-2'>
                Skills Offered:
              </label>
              <div className='flex flex-wrap gap-3'>
                {skillsOffered.map((skill) => (
                  <span
                    key={skill}
                    className='px-4 py-2 bg-green-100 text-green-600 rounded-full flex items-center gap-2 text-sm font-medium'
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className='text-red-400 hover:text-red-600'
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className='mb-6'>
              <label className='block font-semibold mb-2'>Skills Wanted:</label>
              <div className='flex flex-wrap gap-3'>
                {['Python', 'JavaScript', 'Manager'].map((skill) => (
                  <span
                    key={skill}
                    className='px-4 py-2 bg-purple-100 text-purple-600 rounded-full flex items-center gap-2 text-sm font-medium'
                  >
                    {skill}
                    <button className='text-red-400 hover:text-red-600'>
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className='flex flex-col items-center gap-6'>
              <img
                src='/user.jpg'
                alt='Profile'
                className='rounded-full w-48 h-48 object-cover border-4 border-indigo-300'
              />
              <div className='flex gap-6'>
                <button className='bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600'>
                  Add/Edit
                </button>
                <button className='bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600'>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-4 mt-8'>
          <button className='bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600'>
            Save
          </button>
          <button className='bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600'>
            Discard
          </button>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
