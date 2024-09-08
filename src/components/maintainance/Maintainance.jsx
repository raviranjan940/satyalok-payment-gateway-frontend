import { useEffect, useState } from "react";
import Header from "../header/Header";

function Maintainance() {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);

    const currentTime = new Date();
    const targetTime = new Date();
    targetTime.setHours(currentTime.getHours() + 1);
    targetTime.setMinutes(0);
    targetTime.setSeconds(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const diff = targetTime - new Date();
            if (diff <= 0) {
                setHour(1);
                setMinute(0);
                setSecond(0);
            } else {
                const hours = Math.floor(diff / 1000 / 60 / 60);
                const minutes = Math.floor(diff / 1000 / 60) % 60;
                const seconds = Math.floor(diff / 1000) % 60;

                setHour(hours);
                setMinute(minutes);
                setSecond(seconds);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold text-red-500">
                    Donation Site is Under Maintainance
                </h1>

                <div className="flex flex-col items-center justify-center mt-4">
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold text-black">
                                {hour < 10 ? `0${hour}` : hour}
                            </span>
                        </div>
                        <span className="text-3xl font-bold text-black">:</span>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold text-black">
                                {minute < 10 ? `0${minute}` : minute}
                            </span>
                        </div>
                        <span className="text-3xl font-bold text-black">:</span>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold text-black">
                                {second < 10 ? `0${second}` : second}
                            </span>
                        </div>
                    </div>

                    <p className="text text-red-500 mt-2">
                        Kindly Check Back Later
                    </p>
                </div>
            </div>
        </>
    );
}

export default Maintainance;
