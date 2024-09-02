import failImg from "../../assets/brokenCard.png";

import propTypes from "prop-types";

function Failure({ data }) {
    const { message, data: paymentData } = data;
    const paymentType = paymentData.paymentInstrument?.type || "Unknown";
    const amount = (paymentData.amount / 100).toFixed(2); // Assuming amount is in paise/cents
    const merchantTxnId = paymentData.merchantTransactionId;
    const utr = paymentData.paymentInstrument?.utr;
    const accountType = paymentData.paymentInstrument?.accountType || "Unknown";
    const responseCode = paymentData.responseCode;

    return (
        <div className="flex flex-col items-center justify-center text-red-800">
            <img src={failImg} alt="Payment Failed" className="h-52" />
            <h2 className="text-2xl font-semibold mt-4">{message}</h2>
            <p className="text-sm mt-2">
                Your payment was unsuccessful. Please try again. If the problem persists, contact our support team.
            </p>
            <div className="mt-4 w-full px-4">
                <div className="bg-red-100 p-4 rounded-md shadow-md">
                    <p className="text-sm">
                        <strong>Transaction ID:</strong> {merchantTxnId}
                    </p>
                    <p className="text-sm">
                        <strong>Payment Type:</strong> {paymentType}
                    </p>
                    <p className="text-sm">
                        <strong>Amount:</strong> ₹{amount}
                    </p>
                    <p className="text-sm">
                        <strong>Account Type:</strong> {accountType}
                    </p>
                    {utr && (
                        <p className="text-sm">
                            <strong>UTR:</strong> {utr}
                        </p>
                    )}
                    {responseCode && (
                        <p className="text-sm mt-2">
                            <strong>Response Code:</strong> {responseCode}
                        </p>
                    )}
                    {paymentData.responseCodeDescription && (
                        <p className="text-sm mt-2">
                            <strong>Error:</strong>{" "}
                            {paymentData.responseCodeDescription}
                        </p>
                    )}
                </div>
            </div>

            <button
                onClick={() => (window.location.href = "/")}
                className="bg-red-500 text-white px-4 py-2 mt-6 rounded-md"
            >
                Retry Payment
            </button>
        </div>
    );
}

export default Failure;

Failure.propTypes = {
    data: propTypes.shape({
        code: propTypes.string.isRequired,
        message: propTypes.string.isRequired,
        data: propTypes.shape({
            merchantTransactionId: propTypes.string.isRequired,
            amount: propTypes.number.isRequired,
            paymentInstrument: propTypes.shape({
                type: propTypes.string,
                utr: propTypes.string,
                accountType: propTypes.string,
            }),
            responseCode: propTypes.string,
            responseCodeDescription: propTypes.string,
        }).isRequired,
    }).isRequired,
};
