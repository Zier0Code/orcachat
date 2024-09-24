import React from 'react'
import {
    Send as SendIcon,
    DoDisturb as DoDisturbIcon
} from "@mui/icons-material"

const InputText = ({ handleSendMessage, isTyping }) => {
    return (
        <>
            <div className="fixed bottom-0 w-full p-4 bg-white dark:bg-customBGDark shadow-lg pb-6">
                <div className="pr-6 md:pr-0 max-w-2xl mx-auto flex items-center">
                    <input
                        autoFocus
                        type="text"
                        className="pl-9 flex-grow p-2 border text-sm  md:text-md dark:text-white bg-customColorIput border-black/50 focus:outline-none focus:border-white/20 rounded-full"
                        placeholder="Type your inquiries here..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !isTyping) {
                                handleSendMessage(e.target.value);
                                e.target.value = '';
                            }
                        }}
                    />

                    <button
                        className={`p-2 text-white hover:bg-customColorIput/50 rounded-full
                                            ${isTyping ? 'cursor-not-allowed' : ''}`
                        }
                        onClick={() => {
                            const input = document.querySelector('input');
                            handleSendMessage(input.value);
                            input.value = '';
                        }}
                        disabled={isTyping}
                    >
                        {isTyping ? <DoDisturbIcon /> : <SendIcon sx={{ width: 20, height: 20, }} />}
                    </button>
                </div>
            </div>
        </>
    )
}

export default InputText