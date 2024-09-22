import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import {
    Send as SendIcon,
    DoDisturb as DoDisturbIcon
} from "@mui/icons-material"
import { Filter } from 'bad-words'
import { badWordsPH } from '../api/BadWords';


const Guest = () => {
    // FOR WORDS FILTERing
    const customFilter = new Filter({ placeHolder: '*' })
    customFilter.addWords(...badWordsPH)

    // FOR CHATBOT variables
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [typingMessage, setTypingMessage] = useState('');

    const handleSendMessage = async (message) => {
        // CLEAN MESSAGE
        const cleanMessage = customFilter.clean(message);

        // CHECK IF MESSAGE IS NOT VALID
        if (cleanMessage !== message) {
            setMessages([...messages, { text: 'Your message is not valid as it contains illegal words. \n Try Asking again', sender: 'bot' }]);
            return;
        }

        // IF MESSAGE IS NOT EMPTY THEN ADD TO MESSAGES
        if (cleanMessage.trim()) {
            // ADD USER MESSAGE
            setMessages([...messages, { text: cleanMessage, sender: 'user' }]);
            setIsTyping(true);
            setTypingMessage('');

            try {
                const response = await fetch('https://ce92-103-36-19-168.ngrok-free.app/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: cleanMessage }),
                });
                // Check if there is a response
                if (response) {
                    const data = await response.json();
                    console.log("server response:", data.response)
                    // SIMULATE BOT RESPONSE
                    let index = -1;

                    // SIMULATE TYPING
                    const typingInterval = setInterval(() => {
                        if (index < data.response.length) {
                            setTypingMessage((prev) => prev + data.response[index]);
                            index++;
                        } else {
                            clearInterval(typingInterval);
                            setMessages((prevMessages) => [
                                ...prevMessages,
                                { text: data.response, sender: 'bot' },
                            ]);
                            setIsTyping(false);
                        }
                    }, 40);
                } else {
                    console.error('Error fetching response from server');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                // finally code here
            }
        }
    };
    return (
        <>
            <div className='min-h-screen dark:bg-customBGDark'>
                <Navbar />
                <div className='flex flex-col justify-end items-center w-full min-h-screen pb-20'>
                    <div className='mx-10 md:w-[700px]'>
                        <div className="flex-grow flex flex-col">
                            <div className="p-2 m-2 rounded-full  px-4 text-white/70 self-start">
                                Hello i am orca how can i Help you?
                            </div>
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`p-2 m-2 rounded-full ${message.sender === 'user'
                                        ? 'bg-customColorIput px-4 text-white self-end'
                                        : ' text-white/70 self-start'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="p-2 m-2 text-white/70 self-start">
                                    {typingMessage}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="fixed bottom-0 left-0 w-full p-4 bg-white dark:bg-customBGDark shadow-lg">
                        <div className="max-w-2xl mx-auto flex items-center">
                            <input
                                autoFocus
                                type="text"
                                className="pl-9 flex-grow p-2 border text-md dark:text-white bg-customColorIput border-black/50 focus:outline-none focus:border-white/20 rounded-full"
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
                            {
                                /* <button
                                            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-700 ml-2"
                                            onClick={() => setMessages([])}
                                        >
                                            Clear All
                                        </button> */
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Guest