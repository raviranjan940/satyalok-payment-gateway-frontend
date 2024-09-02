import { useEffect, useState } from "react";

import propTypes from "prop-types";

function ErrorCard({ message }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Auto-hide after 5 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        isVisible && (
            <div
                className={`fixed bottom-4 transition-transform duration-500 ease-in-out p-4 bg-red-600 text-white rounded-md shadow-lg flex items-center justify-between z-50 ${
                    isVisible ? "" : "translate-y-full opacity-0"
                } ${
                    window.innerWidth <= 768
                        ? "left-1/2 transform -translate-x-1/2"
                        : "right-4"
                }`}
            >
                <div className="mr-4">{message || "An error occurred!"}</div>
                <button
                    className="text-2xl leading-none focus:outline-none"
                    onClick={handleClose}
                >
                    &times;
                </button>
            </div>
        )
    );
}

export default ErrorCard;

ErrorCard.propTypes = {
    message: propTypes.string,
};
