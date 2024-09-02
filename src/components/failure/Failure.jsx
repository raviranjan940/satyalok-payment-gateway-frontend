import otherFail from "../../assets/brokenCard.png";
import upiFail from "../../assets/sad.png";
import PropTypes from "prop-types";

function Failure({ data }) {
    const type = data?.code === "PAYMENT_ERROR" ? "UPI" : "Other";

    if (type === "UPI") {
        return (
            <div className="flex flex-col items-center justify-center text-red-800">
                <img src={upiFail} alt="Failed" className="h-52" />
                <p className="text-lg font-semibold mt-4">{data.message}</p>
                <p className="text-sm text-center mt-2">
                    {data.data.responseCodeDescription}
                </p>

                <button
                    onClick={() => (window.location.href = "/")}
                    className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md"
                >
                    Retry Payment
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center text-red-800">
            <img src={otherFail} alt="Failed" className="h-52" />
            <p className="text-lg font-semibold mt-4">
                {data.code.replace("_", " ")}
            </p>
            <p className="text-sm text-center mt-2">{data.message}</p>
        </div>
    );
}

export default Failure;

Failure.propTypes = {
    data: PropTypes.shape({
        code: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        data: PropTypes.shape({
            responseCodeDescription: PropTypes.string,
        }),
    }).isRequired,
};
