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
        <div className="max-w-lg mx-auto flex flex-col justify-center items-center">
            <div className="relative bg-white p-8 overflow-hidden drop-shadow-xl print:drop-shadow-none flex justify-center flex-col items-center">
                <img src={failImg} alt="Payment Failed" className="h-52" />
                <h2 className="text-2xl font-semibold mt-4">{message}</h2>
                <p className="text-sm mt-2">
                    Your payment was unsuccessful. Please try again. If the
                    problem persists, contact our support team.
                </p>
                <div className="mt-4 w-full">
                    <div className="bg-slate-50 p-4 rounded-md">
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
                    className=" text-red-500 px-4 py-2 mt-6 rounded-md"
                >
                    <i className="fas fa-redo mr-2"></i>
                    Retry Payment
                </button>
                <hr className="w-full border-gray-300 my-6" />
                <div className="flex items-center justify-center gap-5 flex-wrap">
                    <p className="text-sm">Need help?</p>

                    <a
                        href={`https://wa.me/918210228101?text=Payment%20Issue%20with%20Transaction%20ID:%20${merchantTxnId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-500 rounded-md"
                    >
                        <i className="fab fa-whatsapp mr-2"></i>
                        Chat Support
                    </a>
                    <a
                        href="mailto:info@satyalok.in"
                        className="text-blue-500 rounded-md"
                    >
                        <i className="fas fa-envelope mr-2"></i>
                        Support Email
                    </a>
                </div>
            </div>
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
