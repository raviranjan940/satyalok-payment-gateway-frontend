import React from 'react';

function Success() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-teal-50 text-teal-800">
      {/* Success Page */}
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg text-center mb-8 max-w-lg">
        Thank you for your payment. Your transaction was completed successfully.
      </p>
      <button 
        className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        onClick={() => window.location.href = '/'}
      >
        Go to Home
      </button>
    </div>
  );
}

export default Success;
