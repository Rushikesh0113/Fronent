import React, { useEffect } from 'react';
import './Toast.css';  // Assuming you will create this CSS for styling

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);  // Close the toast after 3 seconds
    return () => clearTimeout(timer);  // Cleanup the timer on unmount
  }, [message, onClose]);

  const isErrorMessage = message === "No files uploaded yet."; // Check if it's an error message

  return (
    <div className="toast-container">
      <div className={`toast ${isErrorMessage ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
        {message}
      </div>
    </div>
  );
};

export default Toast;
