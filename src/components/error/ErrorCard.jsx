import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function ErrorCard({ message, setMessage }) {
    const [isVisible, setIsVisible] = useState(!!message);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            // Auto-hide after 5 seconds
            const timer = setTimeout(() => {
                setIsVisible(false);
                setMessage("");
            }, 5000);

            // Cleanup the timer on unmount
            return () => clearTimeout(timer);
        }
    }, [message, setMessage]);

    const handleClose = () => {
        setIsVisible(false);
        setMessage("");
    };

    // If there's no message, or isVisible is false, do not render the component
    if (!isVisible || !message) return null;

    return (
        <div
            className={`fixed bottom-4 transition-transform duration-500 ease-in-out p-4 bg-red-600 text-white rounded-md shadow-lg flex items-center justify-between z-50 ${
                window.innerWidth <= 768
                    ? "left-1/2 transform -translate-x-1/2 w-[80%]"
                    : "right-4"
            }`}
        >
            <div className="mr-4">{message}</div>
            <button
                className="text-2xl leading-none focus:outline-none cursor-pointer"
                onClick={handleClose}
            >
                &times;
            </button>
        </div>
    );
}

ErrorCard.propTypes = {
    message: PropTypes.string,
    setMessage: PropTypes.func.isRequired,
};

export default ErrorCard;
