import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Success from "../success/Success";
import Failure from "../failure/Failure";

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
                console.log(data);
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
        return (
            <div className="flex justify-center items-center h-screen text-lg font-semibold">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-600 text-lg font-semibold">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-slate-50 text-white flex flex-col items-center justify-center p-6">
            {paymentData?.success ? (
                <Success {...paymentData.data} message={paymentData.message} />
            ) : (
                <Failure />
            )}
        </div>
    );
}

export default Status;
