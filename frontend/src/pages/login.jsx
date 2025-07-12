import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  //   const setCookie = (name, value, days) => {
  //     const expires = new Date();
  //     expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  //     document.cookie = ${name}=${value}; expires=${expires.toUTCString()}; path=/;
  //   };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-8 bg-gray-100 text-gray-900`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-50 border border-gray-300`}
      >
        <h1 className='text-3xl font-bold mb-6 text-center'>Login</h1>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <form onSubmit={() => {}}>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full mb-4 p-2 rounded-lg border-2 bg-gray-200 text-gray-900 border-gray-400`}
            placeholder='Email'
            required
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full mb-4 p-2 rounded-lg border-2 bg-gray-200 text-gray-900 border-gray-400`}
            placeholder='Password'
            required
          />
          <button
            type='submit'
            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full`}
          >
            Login
          </button>
        </form>
        <div className='mt-4 text-center'>
          <Link
            to='/signup'
            className={`text-blue-400 hover:underline hover:text-blue-500`}
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
