import React, { useState } from 'react';
import Header from '../../Navbar/header.js';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Teacher = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <div className={`${isSideNavOpen ? 'sm:ml-64' : ''}`}>
      <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} />

      {/* Navbar with Tabs */}
      <div className="border-t-2 border-black text-black px-6 py-3 flex justify-between items-center shadow-xl">
        <div className="flex space-x-6">
          <button className="hover:underline">Resources</button>
          <button className="hover:underline">Attendance</button>
          <button className="hover:underline">Timetable</button>
          <button className="hover:underline">Individual Progress</button>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center hover:underline"
            >
              New Creation
            </button>
            {dropdownOpen && (
              <div className="absolute bg-white text-black rounded shadow-md mt-2 w-48">
                <Link to="/create-test" className="block px-4 py-2 hover:bg-gray-200">Create New Test</Link>
                <Link to="/create-topic" className="block px-4 py-2 hover:bg-gray-200">Create New Topic</Link>
                <Link to="/create-subject" className="block px-4 py-2 hover:bg-gray-200">Create New Subject</Link>
                <Link to="/create-class" className="block px-4 py-2 hover:bg-gray-200">Create New Class</Link>
              </div>
            )}
          </div>
          <button className="hover:underline">Test Grading</button>
          <button className="hover:underline">Parent Communication</button>
          <button className="hover:underline">Announcements</button>
          <button className="hover:underline">Assignments</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 flex">
        {/* Left Section - Test Details Table */}
        <div className="w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">TEST DETAILS</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Create Test</button>
          </div>

          <div className="border rounded-lg shadow overflow-hidden">
            <table className=" divide-y divide-gray-200">
              <thead className="bg-blue-500">
                <tr>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">SR NO.</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">TEST NAME</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">SUBJECT</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">TOTAL MARKS</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">TIME DURATION</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">DUE DATE</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[1, 2, 3, 4].map((index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Science 1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Science</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">10</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">30 mins</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">07/10/2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-yellow-500">not submitted</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Section - Side Panel */}
        <div className="w-1/3 pl-4">
          <div className="flex flex-col gap-4">
            {/* Class Progress and Calendar Side by Side */}
            <div className="flex gap-4">
              {/* Class Progress */}
              <div className="w-1/2 bg-white p-3 rounded shadow-md">
                <h3 className="text-lg font-semibold">Class Progress</h3>
                <div className="mt-2">
                  {['Class A', 'Class B', 'Class C', 'Class D'].map((className, index) => (
                    <div key={index} className="flex justify-between items-center py-1">
                      <span>{className}</span>
                      <span className="text-blue-500 font-semibold">{Math.floor(Math.random() * 50) + 10}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calendar Component */}
              <div className="w-1/2 bg-white p-3 rounded shadow-md">
                <h3 className="text-lg font-semibold text-center">Calendar</h3>
                <div className="overflow-hidden">
                  <Calendar onChange={setDate} value={date} className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;