import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import walletAnimation from "../../assets/lottie/wallet.json";

function Loading() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: walletAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const [message, setMessage] = useState("Checking status");
    const [dots, setDots] = useState("...");

    const loadingMessages = [
        "Establishing connection",
        "Connecting to the server",
        "Fetching data",
        "Collecting payment details",
    ];

    const finalMessages = [
        "It sometimes takes 90 seconds",
        "We are fetching the data",
        "Please wait",
    ];

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            if (index < loadingMessages.length) {
                setMessage(loadingMessages[index]);
                index++;
            } else {
                const finalMessageIndex =
                    (index - loadingMessages.length) % finalMessages.length;
                setMessage(finalMessages[finalMessageIndex]);
                index++;
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (dots.length === 3) {
                setDots("");
            } else {
                setDots((prev) => prev + ".");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [dots]);

    return (
        <div className="text-center">
            <Lottie options={defaultOptions} height={100} width={100} />

            <p className="text-black text-md">
                {message}
                {/* {dots} */}
            </p>

            <p className="text-xs mt-1 font-light">
                Please do not refresh the page or go back.
            </p>
        </div>
    );
}

export default Loading;
