import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex items-center justify-center p-8 bg-gray-100 text-gray-900'>
      <div className='w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-50 border border-gray-300'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Signup</h1>
        {error && <p className='text-red-500 mb-4 text-center'>{error}</p>}

        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full p-3 mb-4 rounded-lg border-2 bg-gray-200 text-gray-900 border-gray-400 focus:outline-none focus:border-blue-500'
          placeholder='Username'
        />

        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-3 mb-4 rounded-lg border-2 bg-gray-200 text-gray-900 border-gray-400 focus:outline-none focus:border-blue-500'
          placeholder='Email'
        />

        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-3 mb-4 rounded-lg border-2 bg-gray-200 text-gray-900 border-gray-400 focus:outline-none focus:border-blue-500'
          placeholder='Password'
        />

        <button
          onClick={() => {}}
          className='bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition w-full'
        >
          Signup
        </button>

        <div className='mt-4 text-center'>
          <Link
            to='/login'
            className='text-blue-400 hover:underline hover:text-blue-500'
          >
            <p>Already have an account?</p>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
