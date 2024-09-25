import React from 'react'
import {
    Send as SendIcon,
    DoDisturb as DoDisturbIcon
} from "@mui/icons-material"
import { Tooltip } from '@mui/material';

const InputText = ({ handleSendMessage, isTyping }) => {
    return (
        <>
            <div className="fixed bottom-0 w-full p-4 shadow-lg pb-6">
                <div className="pr-6 md:pr-0 max-w-2xl mx-auto relative">
                    <input
                        autoFocus
                        type="text"
                        className="shadow-md dark:text-white shadow-gray-500 dark:shadow-none pl-4 pr-9 sm:pr-12 md:pl-9 pr- flex-grow p-2 text-sm mb-2 md:text-mddark:text-white focus:outline-none border dark:border-none focus:border-customBlue rounded-full dark:bg-customColorInput w-full"
                        placeholder="Type your inquiries here..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !isTyping) {
                                handleSendMessage(e.target.value);
                                e.target.value = '';
                            }
                        }}
                    />
                    <Tooltip title="Send">
                        <button
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 pr-7 md:pr-3 pb-3 text-white hover:bg-customColorIput/50 rounded-full
                            ${isTyping ? 'cursor-not-allowed' : ''}`}
                            onClick={() => {
                                const input = document.querySelector('input');
                                handleSendMessage(input.value);
                                input.value = '';
                            }}
                            disabled={isTyping}
                        >
                            {isTyping ? <DoDisturbIcon /> : <SendIcon sx={{ width: 20, height: 20, color: 'gray', transform: "rotate(-30deg)" }} />}
                        </button>
                    </Tooltip>
                </div>
            </div>
        </>
    )
}

export default InputText