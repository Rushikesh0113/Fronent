import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReplyEditor from './ReplayEditor.js'; // Ensure the path is correct
import { BsHandThumbsUp,BsHandThumbsUpFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { FaReply } from "react-icons/fa";

const CommentList = ({ topicId, refreshTrigger, refreshComments }) => {
  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState(null); // State to track which comment is being replied to
                    // State to manage upvote counts
  const userid=useSelector(store=>store.user.data._id)
  useEffect(() => {
    const fetchComments = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/topics/viewcomment/${topicId}`);
        const sortedData = response.data.data.reviewdata
          .filter(comment => !comment.parentId) // Only top-level comments
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setComments(sortedData);

        // Initialize upvotes state
       
      } catch (error) {
        console.error("There was an error fetching the comments!", error);
      }
    };

    fetchComments();
  }, [topicId, refreshTrigger]);

  const handleUpvote = async (commentId) => {
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/topics/${commentId}/upvote`);
    refreshComments()
    console.log(response);
  };

  const handleupdatesubcomment=async (commentId) => {
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/topics/${commentId}/subupvote`);
    refreshComments()
    console.log(response);
  };

  const renderComments = (comments) => {
    return comments.map((comment, index) => (
      <article className="rounded-lg bg-white p-6 text-base border mb-4" key={index}>
        <footer className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <p className="mr-3 inline-flex items-center text-sm font-semibold">
              <img className="mr-2 h-6 w-6 rounded-full" src={comment?.createdBy?.avatar} alt={comment?.createdBy?.fullName} />
              {comment?.createdBy?.fullName}
            </p>
            <p className="text-sm text-gray-600">
              {comment?.createdAt && <time  dateTime={comment?.createdAt} title={new Date(comment?.createdAt).toDateString()}>
                {new Date(comment?.createdAt).toLocaleDateString()}
              </time>}
            </p>
          </div>
        </footer>
        <h2 className="text-2xl">{comment?.title}</h2>
        <div className="text-gray-500 p-2 border-b last:border-none" dangerouslySetInnerHTML={{ __html: comment.topic_comment }} />
        <div className="mt-2 flex items-center">
          {!comment.replies_id && <button
            className="text-blue-500 hover:underline mr-4"
            onClick={() => setReplyTo(replyTo === comment._id ? null : comment._id)}
          >
            {console.log()}
            <FaReply/>
          </button>}
{!comment.replies_id ?        <button
          className="text-green-500 hover:underline flex items-center"
          onClick={() => handleUpvote(comment._id)}
        >
          
          {comment.upvotes.indexOf(userid)===-1 ? <BsHandThumbsUp/> :<BsHandThumbsUpFill/> }({comment.upvotes.length})
          </button>:       <button
          className="text-green-500 hover:underline flex items-center"
          onClick={() => handleupdatesubcomment(comment._id)}
        >
          {console.log(comment.upvotes.indexOf(userid))}
{comment.upvotes.indexOf(userid)===-1 ? <BsHandThumbsUp/> :<BsHandThumbsUpFill/> }({comment.upvotes.length})
        </button>}
        </div>
        {replyTo === comment._id && (
          <ReplyEditor
            topicId={topicId}
            parentId={comment._id}
            refreshComments={refreshComments} // Close editor on refresh
          />
        )}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-6 mt-4 border-l-2 pl-4">
            {renderComments(comment.replies)}
          </div>
        )}
      </article>
    ));
  };

  return (
    <section className="bg-white py-8 antialiased lg:py-16">
      <div className="mx-auto max-w-2xl px-4">
        {renderComments(comments)}
      </div>
    </section>
  );
};

export default CommentList;
