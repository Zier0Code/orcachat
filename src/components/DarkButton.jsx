import React, { useState, useEffect } from 'react';

const DarkButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Check local storage for dark mode preference
    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Toggle dark mode and update local storage
    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setDarkMode(!darkMode);
    };

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only"
                checked={darkMode}
                onChange={toggleDarkMode}
            />
            <div className="relative w-10 h-4 bg-gray-200 rounded-full shadow-inner dark:bg-custom_dark_30 transition-all">
                <div
                    className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform ${darkMode ? 'transform translate-x-full bg-custom_dark_30' : ''}`}
                ></div>
            </div>
            <span className="ml-3 text-black dark:text-white">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
        </label>
    );
};

export default DarkButton;