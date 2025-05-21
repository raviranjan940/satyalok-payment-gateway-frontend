import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function PaymentRedirects() {
    const { id: txnId } = useParams();

    const [error, setError] = React.useState(null);

    useEffect(() => {
        axios
            .post(`${BACKEND_URL}/process-payment?id=${txnId}`)
            .then((response) => {
                const redirectUrl =
                    response.data.data.instrumentResponse.redirectInfo.url;
                window.location.href = redirectUrl;
            })
            .catch((error) => {
                console.error("Error:", error);
                setError("An error occurred. Please try again.");
            });
    }, [txnId]);

    return (
        <div>
            {error && (
                <div className="flex justify-center items-center h-dvh text-red-600 text-lg font-semibold">
                    Error: {error}
                </div>
            )}
            {!error && (
                <div className="flex justify-center items-center h-dvh text-lg font-semibold">
                    Redirecting to payment...
                </div>
            )}
        </div>
    );
}

export default PaymentRedirects;
