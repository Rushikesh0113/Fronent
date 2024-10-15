import React, { useEffect, useState } from 'react';
import Header from '../../Navbar/header';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidEdit } from "react-icons/bi";
import Loading from '../../Loading/Loading';
import Suggestion from './Suggestion.js';

const Particulartopics = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/topics/${id}`)
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => console.log(err));
  }, [id, navigate]);

  return (
    <div className={`${isSideNavOpen ? 'sm:ml-64' : ''}`}>
      <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} />

      <div className='p-4'>
        {/* Back Button and Title */}
        <div className="flex flex-row items-center mb-4">
          <button className='px-2' onClick={() => { navigate(-1) }}>
            <IoIosArrowBack color='red' />
          </button>
          <h1 className="text-2xl font-bold ml-2">1.1 Introduction</h1>
        </div>

        {/* Main Content */}
        {data ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Section: Topic Details */}
            <div className="lg:col-span-2 bg-white p-6 shadow-md rounded-lg">
              <div className="mb-4">
                <span className="font-semibold">Standard:</span> {data?.subject?.standard}
              </div>
              <div className="mb-4 text-gray-600">
                <span className="font-semibold">Chapter:</span> {data?.chapter?.name}
              </div>
              <div className="mb-4">
                <span className="font-semibold">Subject:</span> <Link to={`/subject/${data?.subject?._id}`}>{data?.subject?.name}</Link>
              </div>
              <div className="mb-4">
                <span className="font-semibold">Topic Level:</span> {data?.topic_level}
              </div>

              <div className="prose mb-6" dangerouslySetInnerHTML={{ __html: data?.description }}></div>

              {/* Questions Section */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Questions</h2>
                <ul className="list-disc list-inside px-4">
                  {data?.questions.map((question) => (
                    <li key={question._id}>{question.questionText}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Section: Related Topics & Suggestions */}
            <div className="space-y-4">
              {/* Related Topics Section */}
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Related Topics</h2>
                <ul className="list-disc list-inside px-4">
                  {data?.RelatedTopic.map((topic) => (
                    <li key={topic._id}>
                      <a href={`/topic/${topic._id}`}>{topic.name}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions Section */}
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Suggestions</h2>
                <Suggestion topicId={id} />
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Particulartopics;
