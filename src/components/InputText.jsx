import React from 'react'
import {
    Send as SendIcon,
    DoDisturb as DoDisturbIcon
} from "@mui/icons-material"
import { Tooltip } from '@mui/material';

const InputText = ({ handleSendMessage, isTyping }) => {
    return (
        <>
            <div className="fixed bottom-0 w-full p-4 shadow-lg pb-4 bg-customBGWhite dark:bg-customBGDark">
                <div className=" md:pr-0 max-w-2xl mx-auto relative">
                    <input
                        autoFocus
                        type="text"
                        className="shadow-md dark:text-white shadow-gray-500 dark:shadow-none pl-4 md:pl-9 flex-grow p-2 text-sm mb-2 md:text-mddark:text-white focus:outline-none border dark:border-none focus:border-customBlue rounded-full dark:bg-customColorInput w-full"
                        placeholder="Type your inquiries here..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !isTyping) {
                                handleSendMessage(e.target.value);
                                e.target.value = '';
                            }
                        }}
                    />

                    <div
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 md:pr-3 pb-3 text-white hover:bg-customColorIput/50 rounded-full
                            ${isTyping ? 'cursor-not-allowed' : ''}`}
                    >
                        {isTyping ?
                            <div className='text-gray-400 hover:bg-black/20 p-2 rounded-md mt-1 flex justify-center'>
                                <DoDisturbIcon fontSize='small' />
                            </div>
                            :
                            <Tooltip title="Send">
                                <button className='text-gray-400 hover:bg-black/20 p-2 rounded-md mt-1 flex justify-center'
                                    onClick={() => {
                                        const input = document.querySelector('input');
                                        // optional: sanitize the input value
                                        // const sanitizedValue = DOMPurify.sanitize(input.value);
                                        handleSendMessage(input.value);
                                        input.value = '';
                                    }}
                                    disabled={isTyping}>
                                    <SendIcon sx={{ fontSize: "large", transform: "rotate(-30deg)" }} />
                                </button>
                            </Tooltip>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default InputText