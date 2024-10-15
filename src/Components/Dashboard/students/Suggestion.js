import React, { useState, useCallback } from "react";
import CommentEditor from "./suggestion component/CommentEditor";
import CommentList from "./suggestion component/CommentList";
import { useSelector } from "react-redux";

const Suggestion = ({ topicId }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [showComments, setShowComments] = useState(false); // Track visibility of comments
  const status = useSelector((store) => store.user.status);

  const refreshComments = useCallback(() => {
    setRefreshTrigger((prev) => !prev);
  }, []);

  const toggleComments = () => {
    setShowComments((prev) => !prev); // Toggle visibility of comments
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Suggestions</h1>

      {/* Comment Editor */}
      {status && (
        <CommentEditor topicId={topicId} refreshComments={refreshComments} />
      )}

      {/* Toggle Button */}
      <div className="flex justify-end">
        <button
          onClick={toggleComments}
          className={`${
            showComments ? "bg-red-500" : "bg-blue-500"
          } text-white px-4 py-2 rounded-full transition-colors duration-300`}
        >
          {showComments ? "Hide Comments" : "Read More"}
        </button>
      </div>

      {/* Comment List (Visible when showComments is true) */}
      {showComments && (
        <div className="mt-4">
          <CommentList
            topicId={topicId}
            refreshTrigger={refreshTrigger}
            refreshComments={refreshComments}
          />
        </div>
      )}
    </div>
  );
};

export default Suggestion;
