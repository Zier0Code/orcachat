import React from 'react';

const StarRating = ({ setRating, rating }) => {

    const handleRating = (rate) => {
        setRating(rate);
    };
    return (
        <div className="flex bg-gray-100 dark:bg-gray-900 ">
            <div className="bg-white dark:bg-customBGDark shadow-md rounded-lg p-6 w-full max-w-sm">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Rate Our Chatbot</h1>
                <div className='flex justify-center'>
                    <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                onClick={() => handleRating(star)}
                                className={`w-8 h-8 cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.539-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.34 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                            </svg>
                        ))}
                    </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-4 text-center">Your rating: {rating} out of 5</p>
            </div>
        </div>
    );
};

export default StarRating;