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
            setMessages([...messages, { content: 'Your message is not valid as it contains illegal words. \n Try Asking again', sender: 'bot' }]);
            return;
        }

        // IF MESSAGE IS NOT EMPTY THEN ADD TO MESSAGES
        if (cleanMessage.trim()) {
            // ADD USER MESSAGE
            setMessages([...messages, { content: cleanMessage, sender: 'customer' }]);
            setIsTyping(true);
            setTypingMessage('');

            try {
                const response = await fetch(py_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: cleanMessage.toLowerCase() }),
                });
                // Check if there is a response
                if (response) {
                    const data = await response.json();
                    // SIMULATE BOT RESPONSE

                    // Extract the tag from the bot's response
                    const { tag } = data;

                    let index = -1;

                    // SIMULATE TYPING
                    const typingInterval = setInterval(() => {
                        index++;

                        if (index < data.response.length) {
                            setTypingMessage((prev) => prev + data.response[index]);
                        } else {
                            clearInterval(typingInterval);
                            setMessages((prevMessages) => {

                                // Sanitize the bot's response
                                // const sanitizedResponse = DOMPurify.sanitize(data.response);

                                // Find the last user message and update it with the tag
                                const updatedMessages = prevMessages.map((message, idx) => {
                                    if (idx === prevMessages.length - 1 && message.sender === 'customer') {
                                        return { ...message, tag };
                                    }
                                    return message;
                                });

                                // Add the bot's response with the tag
                                return [
                                    ...updatedMessages,
                                    { content: data.response, sender: 'bot', tag }
                                ];
                            });
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
                <Navbar messages={messages} setMessages={setMessages} isTyping={isTyping} />
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