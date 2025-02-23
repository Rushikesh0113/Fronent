import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../../../Loading/Loading';
import Header from '../../../../Navbar/header';
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

export const Physicaltest = () => {
  const navigate = useNavigate();
  const data = useSelector(store => store.user.data);
  const role = data?.role; // Get user role
  const Id = parseInt(data.standard);
  const [subjects, setSubjects] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [test, setTest] = useState(null);
  const [filteredTests, setFilteredTests] = useState(null);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [error, setError] = useState('');

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoadingSubjects(true);
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/subjects/standard/${Id}`);
        setSubjects(response.data.data.standards[0].subjects);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoadingSubjects(false);
      }
    };

    fetchSubjects();
  }, [Id]);

  // Redirect to Dashboard based on role
  const navigateToDashboard = () => {
    let dashboardURL = "/";

    if (role === "Teacher") {
      dashboardURL = "http://localhost:8000/TEACHER/dashboard";
    } else if (role === "Student") {
      dashboardURL = "http://localhost:8000/STUDENT/dashboard";
    } else if (role === "Parent") {
      dashboardURL = "http://localhost:8000/PARENT/dashboard";
    }

    navigate(dashboardURL, { replace: true }); // Redirect
  };

  // Fetch tests and apply filters
  useEffect(() => {
    const fetchTest = async () => {
      try {
        setError('');
        axios.defaults.withCredentials = true;
        const url = subjectFilter === 'All'
          ? `${process.env.REACT_APP_API_URL}/api/physicaltest/physical-tests/standard/${Id}`
          : `${process.env.REACT_APP_API_URL}/api/physicaltest/physical-tests/standard/${Id}/${subjectFilter}`;

        const response = await axios.get(url);
        setTest(response.data.data);
        setFilteredTests(response.data.data);
      } catch (err) {
        setError('Error fetching tests. Please try again.');
        console.error('Error fetching tests:', err);
      }
    };

    fetchTest();
  }, [subjectFilter, Id]);

  // Apply status filter
  useEffect(() => {
    if (statusFilter === 'All') {
      setFilteredTests(test);
    } else {
      setFilteredTests(
        test?.filter((data) => {
          const status = data.status || 'not submitted';
          return status.toLowerCase() === statusFilter.toLowerCase();
        })
      );
    }
  }, [statusFilter, test]);

  return (
    <>
      <div className={`${isSideNavOpen ? 'sm:ml-64' : ''}`}>
        <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} />
        <div className='p-2'>
          <div className='flex flex-row justify'>
            <div className="m-2 font-semibold text-xl flex flex-row">
              <button className='px-2' onClick={navigateToDashboard}>
                <IoIosArrowBack color='red' />
              </button>
              <p>TEST DETAILS</p>
            </div>

            <div className='flex flex-row justify-between items-center'>
              <div className="flex gap-2">
                <select
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-black px-3 py-1 rounded-md appearance-none focus:outline-none group"
                >
                  <option value="All">Status</option>
                  <option value="submitted">Submitted</option>
                  <option value="not submitted">Not Submitted</option>
                  <option value="delayed">Delayed</option>
                </select>

                <select
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="text-black px-3 py-1 rounded-md appearance-none focus:outline-none group"
                  disabled={loadingSubjects}
                >
                  {loadingSubjects ? (
                    <option>Loading...</option>
                  ) : (
                    <>
                      <option value="All">Subject</option>
                      {subjects.map((sub, index) => (
                        <option key={index} value={sub.name}>
                          {sub.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && <p className="text-center text-red-500 py-6">{error}</p>}

          {/* Table for displaying tests */}
          {filteredTests ? (
            filteredTests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SR No.</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Marks</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTests.map((data, index) => (
                      <tr key={data._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/student/physical-test/${data._id}`} className="text-blue-600 hover:underline">
                            {data?.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{data?.subjectName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{data?.totalMarks}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{data?.timeDuration}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {data?.dueDate ? format(new Date(data.dueDate), 'dd/MM/yyyy') : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${data.status === 'Submitted' ? 'text-green-500' : data.status === 'Delayed' ? 'text-red-500' : 'text-yellow-500'}`}>
                            {data.status || 'Not Submitted'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <p className="text-center text-gray-500 py-6">No tests available.</p>
          ) : <Loading />}
        </div>
      </div>
    </>
  );
};
