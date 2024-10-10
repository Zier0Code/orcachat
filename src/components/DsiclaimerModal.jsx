import { Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const DisclaimerModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 text-xs sm:text-sm">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto z-10">
                <div className="mb-4">
                    <span className="text-red-600 font-bold animate-pulse text-xl sm:text-2xl">Disclaimer:</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-700">
                    This resource is provided for <span className='font-bold'>informational purposes only</span> and has been trained on publicly available material. <br /> <br />
                    This chatbot is not a substitute for professional advice of any kind. Your use is governed by the Terms of Service. <br /> <br />
                    <span className='font-bold text-customBlue'>Do not share personal information</span> such as your social security number, bank information, or credit card numbers when interacting with the bot. Chats are retained for (24 months). <br /> <br />
                    By using this chatbot, you consent to the collection and use of the conversation history in accordance with our Privacy Policy available here
                    <Link to="/privacy-policy">
                        <Tooltip title="Privacy Policy" arrow>
                            <span className='underline text-customBlue ml-2'>
                                Click Here.
                            </span>
                        </Tooltip>
                    </Link>. <br /> <br />
                    For example, if you <span className='font-bold'>Sign Up</span> and select to provide your email address, we will use it to store your conversation history for you to access later and may send you marketing communications.
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DisclaimerModal;