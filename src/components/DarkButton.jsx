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
        <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-custom_dark_30 text-black dark:text-white px-4 py-2 rounded-md transition-all"
        >
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
    );
};

export default DarkButton;