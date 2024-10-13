import React, { useEffect, useState } from 'react'
import orca from '../assets/images/Light Mode.png'
const ServerMaintenance = () => {
    const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

    useEffect(() => {
        const endTime = localStorage.getItem('maintenanceEndTime');
        if (endTime) {
            const remainingTime = Math.floor((new Date(endTime) - new Date()) / 1000);
            setTimeLeft(remainingTime > 0 ? remainingTime : 0);
        } else {
            const newEndTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
            localStorage.setItem('maintenanceEndTime', newEndTime);
            setTimeLeft(24 * 60 * 60);
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };


    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r  to-blue-700 text-white text-center p-4">
                <div className="bg-white text-black bg-opacity-70 p-8 rounded-lg shadow-lg max-w-lg w-full">
                    <img src={orca} alt="Orca Chatbot Logo" className="size-14 mx-auto mb-2" />
                    <h2 className='font-semibold text-lg mb-6'>ORCA Chatbot</h2>
                    <h1 className="text-3xl font-bold mb-4 text-customBlue">We'll be back soon!</h1>
                    <p className="text-lg mb-2">Sorry for the inconvenience but we're performing some maintenance at the moment. We'll be back online shortly!</p>
                    <p className="text-lg mb-2">Estimated time: <strong className="text-customBtn50">{formatTime(timeLeft)}</strong></p>
                    <p className="text-lg">Thank you for your patience.</p>
                </div>
            </div>
        </>
    )
}

export default ServerMaintenance