import PropTypes from "prop-types";
import logo from "../../assets/logo.png";

function Success({
    amount,
    merchantTransactionId,
    transactionId,
    paymentInstrument,
    message,
}) {
    const formatAmount = (amount) => {
        return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const convertToTimestamp = (input) => {
        // Extract the date-time portion from the input string
        const dateTimePart = input.slice(1, 15); // Skip the 'T' and take 14 characters

        // Parse the date-time part into components
        const year = parseInt("20" + dateTimePart.slice(0, 2), 10); // Assuming the year is 20YY
        const month = dateTimePart.slice(2, 4);
        const day = dateTimePart.slice(4, 6);
        const hour = dateTimePart.slice(6, 8);
        const minute = dateTimePart.slice(8, 10);

        // Return the formatted string in the format "DD-MM-YYYY HH:MM"
        return `${day}-${month}-${year} ${hour}:${minute}`;
    };

    const TransactionNumber = {
        UPI: {
            label: "UTR Number",
            field: "utr",
        },
        CARD: {
            label: "Card Type",
            field: "cardType",
        },
    };

    return (
        <div className="max-w-lg mx-auto flex flex-col justify-center items-center">
            <div className="relative bg-white p-8 overflow-hidden drop-shadow-xl print:drop-shadow-none">
                {/* <i className="absolute -top- w-full -m-8 h-52 bg-gradient-to-b from-blue-500 via-black/40 to-transparent opacity-50 z-0"></i> */}

                {/* Reflection effect sun */}
                <i className="absolute bottom-8 right-0 -m-8 w-32 h-32 rounded-full bg-gradient-to-b from-yellow-500 via-yellow-500/40 to-transparent opacity-50 z-0"></i>

                <div className="relative">
                    <div className="text-center w-14 h-14 m-auto bg-green-500/10 rounded-full flex justify-center items-center">
                        <i className="fas fa-check-circle text-3xl text-green-500"></i>
                    </div>
                    <h1 className="text-xl font-semibold mt-4 text-center text-blue-900">
                        Donation Received
                    </h1>
                    <p className="text-green-800 font-bold text-center mb-4 font-sans">
                        {message}
                    </p>

                    <div className="my-6">
                        <p className="text-center text-lg font-sans opacity-80">
                            Total Payment
                        </p>
                        <h1 className="text-2xl font-extrabold font-sans text-center">
                            <span className="mr-1 font-extrabold">INR</span>
                            {formatAmount(amount / 100)}
                        </h1>
                    </div>

                    <div className="text-justify text-xs font-sans text-black">
                        <p className="mb-4">
                            If you opted for a tax benefit, your certificate is
                            sent to your email. Please check your inbox. In case
                            you don&apos;t receive the certificate, please check
                            your spam folder or contact us at{" "}
                            <a
                                href="mailto:info@satyalok.in"
                                className="underline underline-offset-4"
                            >
                                info@satyalok.in
                            </a>
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-2">
                        <div className="md:border px-3 py-2 border-gray-700">
                            <p className="text-sm text-blue-900">Ref. Number</p>
                            <p className="text-sm font-mono">
                                {merchantTransactionId}
                            </p>
                        </div>

                        <div className="md:border px-3 py-2 border-gray-700">
                            <p className="text-sm text-blue-900">
                                Payment Time
                            </p>
                            <p className="text-sm font-mono">
                                {convertToTimestamp(transactionId)}
                            </p>
                        </div>

                        <div className="md:border px-3 py-2 border-gray-700">
                            <p className="text-sm text-blue-900">
                                PhonePe Transaction ID
                            </p>
                            <p className="text-sm font-mono">{transactionId}</p>
                        </div>

                        <div className="md:border px-3 py-2 border-gray-700">
                            <p className="text-sm text-blue-900">
                                Payment Method
                            </p>
                            <p className="text-sm font-mono">
                                {paymentInstrument.type}
                            </p>
                        </div>

                        {paymentInstrument.type in TransactionNumber && (
                            <div className="md:border px-3 py-2 border-gray-700 md:col-span-2">
                                <p className="text-sm text-blue-900">
                                    {
                                        TransactionNumber[
                                            paymentInstrument.type
                                        ].label
                                    }
                                </p>
                                <p className="text-sm font-mono">
                                    {paymentInstrument[
                                        TransactionNumber[
                                            paymentInstrument.type
                                        ]?.field
                                    ].replace("_", " ")}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="my-8">
                        <img
                            src={logo}
                            alt="Satyalok logo"
                            className="max-w-48"
                        />

                        <div>
                            <p className="text-sm font-bold">
                                Thank you for your donation.
                            </p>
                            <p className="text-sm mb-2">
                                For any queries, contact{" "}
                                <a
                                    href="mailto:info@satyalok.in"
                                    className="underline underline-offset-4"
                                >
                                    info@satyalok.in
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-right print:hidden divide-x divide-gray-400 text-white flex text-xs md:text-sm">
                <button
                    className="px-5 flex flex-col md:flex-row md:gap-1.5 justify-center items-center text-center"
                    onClick={() => window.print()}
                >
                    <i className="fas fa-print"></i>
                    <span>Print Receipt</span>
                </button>

                <a
                    className="px-5 flex flex-col md:flex-row md:gap-1.5 justify-center items-center text-center"
                    href="https://donate.satyalok.in"
                >
                    <i className="fas fa-undo"></i>
                    <span>Donate Again</span>
                </a>

                <a
                    className="px-5 flex flex-col md:flex-row md:gap-1.5 justify-center items-center text-center"
                    href="https://www.satyalok.in"
                >
                    <i className="fas fa-home"></i>
                    <span>Home</span>
                </a>
            </div>
        </div>
    );
}

Success.propTypes = {
    amount: PropTypes.number.isRequired,
    merchantTransactionId: PropTypes.string.isRequired,
    transactionId: PropTypes.string.isRequired,
    paymentInstrument: PropTypes.shape({
        type: PropTypes.string.isRequired,
        utr: PropTypes.string,
        cardType: PropTypes.string,
    }).isRequired,
    message: PropTypes.string.isRequired,
};

export default Success;
