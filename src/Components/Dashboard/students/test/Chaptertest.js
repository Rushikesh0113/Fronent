import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../Navbar/header';
import Loading from '../../../Loading/Loading';
import { IoIosArrowBack } from "react-icons/io";

export const Chaptertest = () => {
  const navigate = useNavigate();
  const { Id } = useParams();
  const [test, setTest] = useState(null);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  // Dropdown filter states
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');

  // Status and Subject options
  const statusOptions = ['All', 'submitted', 'not submitted', 'delayed'];
  const subjectOptions = ['All', 'Science', 'Maths', 'History'];

  useEffect(() => {
    const fetchTest = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chapters/chapter-tests/chapter/${Id}`);
        setTest(response.data.data);
      } catch (error) {
        console.error('Error fetching test:', error);
      }
    };
    fetchTest();
  }, [Id]);

  // Filter the tests based on selected status and subject
  const filteredTests = test ? test.filter((data) => {
    const statusMatch = selectedStatus === 'All' || data?.status === selectedStatus;
    const subjectMatch = selectedSubject === 'All' || data?.subject === selectedSubject;
    return statusMatch && subjectMatch;
  }) : [];

  return (
    <>
      <div className={`${isSideNavOpen ? 'sm:ml-64' : ''}`}>
        <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} />
        <div className='p-2'>
          {/* Header and Filters */}
          <div className='flex items-center mb-4'>
            <div className="font-semibold text-xl flex items-center">
              <button className='px-2' onClick={() => { navigate(-1) }}>
                <IoIosArrowBack color='black' />
              </button>
              <p className="ml-2 text-gray-600">TEST DETAILS (MCQ)</p>
            </div>

            {/* Filters */}
            <div className="flex space-x-2">
              <div className="relative inline-block w-48">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-fit p-2 bg-[#fa7e72] text-white rounded-lg focus:outline-none"
                >
                  <option value="All">STATUS</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="relative inline-block w-48">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full p-2 bg-[#fa7e72] text-white rounded-lg focus:outline-none"
                >
                  <option value="All">SUBJECT</option>
                  {subjectOptions.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="p-4 bg-white rounded-xl shadow-lg">
            <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md">
              <thead>
                <tr className="bg-[#f8f9fa] text-gray-600">
                  <th className="py-3 px-6 text-left">SR NO.</th>
                  <th className="py-3 px-6 text-left">TEST NAME</th>
                  <th className="py-3 px-6 text-left">SUBJECT</th>
                  <th className="py-3 px-6 text-left">TOTAL MARKS</th>
                  <th className="py-3 px-6 text-left">TIME DURATION</th>
                  <th className="py-3 px-6 text-left">DUE DATE</th>
                  <th className="py-3 px-6 text-left">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredTests.length > 0 ? filteredTests.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-100 border-t">
                      <td className="py-3 px-6">{index + 1}</td>
                      <td className="py-3 px-6">
                        {/* Clicking on the test name will redirect to the specific test */}
                        <Link to={`/student/test/${data?._id}`} className="text-blue-500 hover:underline">
                          {data?.testName}
                        </Link>
                      </td>
                      <td className="py-3 px-6">{data?.subject || "Science"}</td>
                      <td className="py-3 px-6">{data?.totalMarks || 10}</td>
                      <td className="py-3 px-6">{data?.timeDuration || "30 mins"}</td>
                      <td className="py-3 px-6">{data?.dueDate || "07/10/2024"}</td>
                      <td className={`py-3 px-6 ${data?.status === 'Submitted' ? 'text-green-500 font-bold' : data?.status === 'Delayed' ? 'text-red-500 font-bold' : 'text-amber-400 font-bold'}`}>
                        {data?.status || 'Not Submitted'}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="py-3 px-6 text-center">
                        <Loading />
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
