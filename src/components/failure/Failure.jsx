import React from 'react';

function Failure() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-800">
      <h1 className="text-4xl font-bold mb-4">Payment Failed!</h1>
      <p className="text-lg text-center mb-8 max-w-lg">
        Unfortunately, your payment could not be processed. Please try again or contact support.
      </p>
      <button 
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        onClick={() => window.location.href = '/retry'}
      >
        Retry Payment
      </button>
    </div>
  );
}

export default Failure;
