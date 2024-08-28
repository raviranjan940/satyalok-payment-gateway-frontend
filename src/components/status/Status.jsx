import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Status() {
    const [paymentData, setPaymentData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id: txnId } = useParams();

    useEffect(() => {
      fetch(`${BACKEND_URL}/status?id=${txnId}`)
          .then((res) => {
              if (!res.ok) {
                  throw new Error(`HTTP error! status: ${res.status}`);
              }
              return res.json();
          })
          .then((data) => {
              setPaymentData(data);
              setLoading(false);
          })
          .catch((err) => {
              console.error(err);
              setError("Failed to fetch payment status.");
              setLoading(false);
          });
  }, [txnId]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-600 text-lg font-semibold">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Payment Status</h1>
            <p className="text-gray-600 mb-6">Transaction ID: <span className="font-medium text-gray-700">{txnId}</span></p>

            {paymentData.data ? (
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment Details</h2>
                    <div className="space-y-2">
                        <p><span className="font-medium text-gray-700">Amount:</span> ₹{(paymentData.data.amount / 100).toFixed(2)}</p>
                        <p><span className="font-medium text-gray-700">State:</span> {paymentData.data.state}</p>
                        <p><span className="font-medium text-gray-700">Response Code:</span> {paymentData.data.responseCode}</p>
                        <p><span className="font-medium text-gray-700">Payment Instrument:</span> {paymentData.data.paymentInstrument.type}</p>
                        <p><span className="font-medium text-gray-700">Card Type:</span> {paymentData.data.paymentInstrument.cardType}</p>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 mt-6">No payment data available for this transaction.</p>
            )}
        </div>
    );
}

export default Status;
