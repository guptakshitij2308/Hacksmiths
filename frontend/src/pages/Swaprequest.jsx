import { useState } from 'react';
import { Link } from 'react-router-dom';
const mockData = [
  {
    id: 1,
    name: 'Marc Demo',
    rating: 3.8,
    status: 'Pending',
    skillsOffered: ['JavaScript'],
    skillsWanted: ['Photoshop'],
  },

  {
    id: 2,
    name: 'name',
    rating: 3.9,
    status: 'Rejected',
    skillsOffered: [],
    skillsWanted: [],
  },
  {
    id: 3,
    name: 'Alice',
    rating: 4.2,
    status: 'Accepted',
    skillsOffered: ['React'],
    skillsWanted: ['Node.js'],
  },
  {
    id: 4,
    name: 'Bob',
    rating: 4.5,
    status: 'Pending',
    skillsOffered: ['Python'],
    skillsWanted: ['Django'],
  },
  {
    id: 5,
    name: 'Carol',
    rating: 4.0,
    status: 'Accepted',
    skillsOffered: ['HTML'],
    skillsWanted: ['CSS'],
  },
  {
    id: 6,
    name: 'Marc Demo',
    rating: 3.8,
    status: 'Pending',
    skillsOffered: ['JavaScript'],
    skillsWanted: ['Photoshop'],
  },
  {
    id: 7,
    name: 'Marc Demo',
    rating: 3.8,
    status: 'Pending',
    skillsOffered: ['JavaScript'],
    skillsWanted: ['Photoshop'],
  },
];

const statusColor = {
  Pending: 'text-blue-500',
  Accepted: 'text-green-600',
  Rejected: 'text-red-500',
};

const SwapRequestPage = () => {
  const [filter, setFilter] = useState('Pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filtered = mockData.filter(
    (item) =>
      item.status === filter &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (user) => {
    console.log('Request sent to:', user);
  };

  return (
    <div className='min-h-screen bg-white text-black p-6'>
      <div className='flex items-center justify-between max-w-3xl mx-auto mb-6'>
        <div className='flex gap-2 items-center'>
          <select
            className='border border-gray-300 px-4 py-2 rounded-md'
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option>Pending</option>
            <option>Accepted</option>
            <option>Rejected</option>
          </select>
          <button className='border border-gray-300 px-3 py-2 rounded-md'>
            🔽
          </button>
        </div>
        <input
          className='border border-gray-300 px-4 py-2 rounded-md'
          placeholder='search'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      <div className='space-y-6 max-w-3xl mx-auto'>
        {paginatedData.map((user, idx) => (
          <div
            key={idx}
            className='flex justify-between items-center p-5 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition'
          >
            <div className='flex items-center gap-4'>
              <Link
                to={`/user-details/${user.name
                  .replace(/\s+/g, '-')
                  .toLowerCase()}`}
              >
                <div className='flex items-center gap-4'>
                  <div className='w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300 text-sm text-gray-600'>
                    Photo
                  </div>
                  <div>
                    <h2 className='text-lg font-semibold hover:underline cursor-pointer'>
                      {user.name}
                    </h2>
                    <div className='text-sm mt-1'>
                      <span className='text-green-600 font-medium'>
                        Skills Offered:
                      </span>
                      {user.skillsOffered.map((skill) => (
                        <span
                          key={skill}
                          className='ml-2 inline-block text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full border border-blue-300'
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className='text-sm mt-1'>
                      <span className='text-purple-600 font-medium'>
                        Skills Wanted:
                      </span>
                      {user.skillsWanted.map((skill) => (
                        <span
                          key={skill}
                          className='ml-2 inline-block text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full border border-purple-300'
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className='text-xs text-gray-500 mt-1'>
                      Rating: {user.rating}/5
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className='flex flex-col items-end gap-2'>
              <div className='flex gap-2 items-center'>
                <span>Status:</span>
                <span className={`font-bold ${statusColor[user.status]}`}>
                  {user.status}
                </span>
              </div>
              {user.status === 'Pending' && (
                <div className='flex gap-2'>
                  <button className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium shadow'>
                    Accept
                  </button>
                  <button className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium shadow'>
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className='mt-8 flex justify-center items-center gap-4 text-xl'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className='cursor-pointer'
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`${
              currentPage === i + 1 ? 'font-bold' : 'text-gray-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className='cursor-pointer'
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default SwapRequestPage;
