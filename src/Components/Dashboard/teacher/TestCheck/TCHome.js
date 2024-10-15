import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../../Navbar/header';
import { Link } from 'react-router-dom';

export const TCHome = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState(10); // Default ID, adjust as needed
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/physicaltest/answer-copies/standard/${id}`)
      .then(res => setData(res.data.data))
      .catch(err => console.log(err));
  }, [id]); // Fetch data whenever the `id` changes

  const filteredData = data.filter(item =>
    item.student.fullName?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className={`${isSideNavOpen ? 'sm:ml-64' : ''}`}>
      <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} />
      <div className="flex flex-col h-full">
        <header className="bg-background border-b px-6 py-4 flex items-center justify-between">
          
          <h1 className="text-2xl font-bold">Test Submissions 🎉</h1>
          <div className="mb-4 flex flex-row justify-between">
              <label htmlFor="id-select" className="block text-sm font-medium text-muted-foreground">Select Standards</label>
              <select
                id="id-select"
                value={id}
                onChange={e => setId(parseInt(e.target.value, 10))}
                className="mt-1 block w-full border border-input px-3 py-2 text-sm rounded-md bg-muted focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {Array.from({ length: 10 }, (_, index) => index + 1).map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              className="flex h-10 w-full border border-input px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-4 py-2 rounded-md bg-muted focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Search by student name..."
              type="search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="relative w-full overflow-auto">
           
            <table className="w-full caption-bottom text-sm">
              <thead className="[&amp;_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 cursor-pointer">
                    Student<span className="ml-1">↑</span>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 cursor-pointer">
                    Test
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                    Score
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                    Grade
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                    Submitted Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="[&amp;_tr:last-child]:border-0">
                {filteredData.map(item => (
                  <tr key={item._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                      {item.student.fullName}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      {item.test.name}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                      {item.grade!=="Not graded" ? item.score : "Not Checked Yet"}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                      {item.grade ? item.grade : "Not Checked Yet"}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      <Link to={`/TEACHER/check/ptest/${item._id}`}>
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                          >
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          <span className="sr-only">View submission</span>
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};
