import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar';
import { Filter } from 'bad-words'
import { badWordsPH } from '../api/BadWords';
import { py_url } from '../api/configuration';
import InputText from './InputText';
import MessageBox from './MessageBox';
import BotImage from './BotImage';
import WelcomeChat from './WelcomeChat';

const Guest = () => {
    // FOR WORDS FILTERing
    const customFilter = new Filter({ placeHolder: '*' })
    customFilter.addWords(...badWordsPH)

    // FOR CHATBOT variables
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [typingMessage, setTypingMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
                const response = await fetch(py_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: cleanMessage }),
                });
                // Check if there is a response
                if (response) {
                    const data = await response.json();
                    console.log("server response:", data, messages)
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
                    }, 10);
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
            <div className='min-h-screen bg-customBGWhite dark:bg-customBGDark'>
                <Navbar setMessages={setMessages} isTyping={isTyping} />
                <div className='flex flex-col justify-end md:items-center w-full min-h-screen pb-20'>
                    <div className='mx-10 md:w-[700px]'>
                        <div className="flex flex-col md:w-auto">
                            {
                                messages.length === 0 && (
                                    <WelcomeChat />
                                )
                            }
                            <MessageBox messages={messages} />
                            {isTyping && (
                                <BotImage message={typingMessage} />
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <InputText handleSendMessage={handleSendMessage} isTyping={isTyping} />
                </div>
            </div>
        </>
    )
}

export default Guest