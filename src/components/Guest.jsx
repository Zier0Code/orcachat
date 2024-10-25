import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar';
import { Filter } from 'bad-words'
import { badWordsPH } from '../api/BadWords';
import { py_url } from '../api/configuration';
import InputText from './InputText';
import MessageBox from './MessageBox';
import BotImage from './BotImage';
import WelcomeChat from './WelcomeChat';
import { arrayofQuestions } from '../api/BadWords';
import { index_all } from '../api/feedback';
import { error } from 'jquery';

const Guest = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // FOR WORDS FILTERing
    const customFilter = new Filter({ placeHolder: '*' })
    customFilter.addWords(...badWordsPH)

    // FOR CHATBOT variables
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [typingMessage, setTypingMessage] = useState('');
    const messagesEndRef = useRef(null);
    const [showOnIdle, setShowOnIdle] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, showOnIdle]);

    const handleSendMessage = async (message) => {
        showOnIdle && setShowOnIdle(false);
        // CLEAN MESSAGE
        const cleanMessage = customFilter.clean(message);

        // CHECK IF MESSAGE IS NOT VALID
        if (cleanMessage !== message) {
            setMessages([...messages, { content: 'Your message is not valid as it contains illegal words. \n Try Asking again', sender: 'bot' }]);
            return;
        }

        // ANOTHER LAYER FOR VALIDATION MUST NOT CONTAIN RANDOM WORDS OR CHARACTERS
        if (cleanMessage.length < 2) {
            setMessages([...messages, { content: 'Your message is not valid. \n Try Asking again', sender: 'bot' }]);
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
                            if (!isTyping) {
                                const timeout = setTimeout(() => {
                                    setShowOnIdle(true);
                                }, 12000);
                                if (showOnIdle) {
                                    scrollToBottom();
                                }
                                return () => clearTimeout(timeout);
                            }
                        }
                    }, 1);
                } else {
                    console.error('Error fetching response from server');
                }
            } catch (error) {
                setIsTyping(false);
                setMessages([...messages, { content: " 𝑺𝒐𝒓𝒓𝒚! 𝑶𝒓𝒄𝒂 𝑪𝒉𝒂𝒕𝒃𝒐𝒕 𝒔𝒆𝒓𝒗𝒆𝒓 𝑬𝒓𝒓𝒐𝒓. \n𝑃𝑙𝑒𝑎𝑠𝑒 𝑇𝑟𝑦 𝑎𝑠𝑘𝑖𝑛𝑔 𝑎𝑔𝑎𝑖𝑛 𝑙𝑎𝑡𝑒𝑟.", sender: 'bot' }]);
                console.error('Error:', error);
            } finally {
                // finally code here
            }
        }
    };

    const refreshTags = () => {

        index_all()
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {

            });

    }

    useEffect(refreshTags, [])
    const handleGetStartedClick = () => {
        const greeting = ['Hello!', "Hi There!", "Hey Bot!", "What's Up!",][Math.floor(Math.random() * 3)];
        handleSendMessage(greeting);
    };


    const getRandomQuestions = (arr, num) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    const randomQuestions = getRandomQuestions(arrayofQuestions, 3);
    // Get the last message
    const lastMessage = messages.slice(-1)[0];
    return (
        <>
            <div className='min-h-screen bg-customBGWhite dark:bg-customBGDark'>
                <Navbar messages={messages} setMessages={setMessages} isTyping={isTyping} />
                <div className='flex flex-col justify-end md:items-center w-full min-h-screen pb-20 pt-14'>
                    <div className='mx-2 md:mx-10 md:w-[700px]'>
                        <div className="flex flex-col md:w-auto">
                            {
                                messages.length === 0 && (
                                    <WelcomeChat handleGetStartedClick={handleGetStartedClick} />
                                )
                            }
                            <MessageBox messages={messages} />
                            {isTyping && (
                                <BotImage message={typingMessage} />
                            )}
                            {
                                // messages.map((obj, idx) => {
                                //     console.log(obj)
                                //     const department = departments.find(dept => "Greeting" === obj.tag);
                                //     if (department) {
                                //         console.log(`Message ${idx} is related to the ${obj.tag} department.`);
                                //         // You can perform additional actions here if needed
                                //     }
                                //     return null; // Return null or any JSX element if needed
                                // })
                                messages.length > 0 && (
                                    !isTyping && (
                                        showOnIdle && (
                                            <ul className='flex-col md:pl-10'>
                                                {
                                                    randomQuestions.map((question, index) => (
                                                        <li key={index}>
                                                            <button
                                                                className='text-black/60 border-black/60 border mt-2 rounded-lg transition-all p-1 text-xs sm:text-sm hover:text-black ml-2 dark:hover:text-white dark:text-white/30 dark:border-white/30'
                                                                onClick={() => handleSendMessage(question)}
                                                            >
                                                                {question}
                                                            </button>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        )
                                    )
                                )
                            }
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