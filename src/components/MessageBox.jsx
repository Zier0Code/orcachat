import React from 'react'
import NextLine from './NextLine'
import orca from '../assets/svgs/orca.svg'
const MessageBox = ({ messages }) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
        <>
            {messages.map((message, index) => (
                <div key={index} className='flex flex-col md:w-auto'>
                    <div
                        key={index}
                        className={` rounded-full ${message.sender === 'customer'
                            ? 'p-2 mx-2 mt-2 bg-white/50 shadow-md dark:bg-customColorInput px-4 text-black dark:text-white self-end'
                            : 'pr-2 pt-2 pb-1 md:pb-0 mt-2 text-black/80 dark:text-white/70 self-start flex'
                            }`}
                    >
                        {message.sender === 'bot' && (
                            <img
                                src={orca}
                                alt="Bot"
                                className="size-10 dark:border-white/20 border-blue-600 border rounded-full"
                            />
                        )}
                        <NextLine message={message.content} />
                    </div>
                    <div>
                        {
                            message.sender === 'customer' && (
                                <div className="text-xs text-gray-500 ml-2 flex mr-4 justify-end mt-2">{currentTime}</div>
                            )}
                        {message.sender === 'bot' && (
                            <div className="text-xs text-gray-500 flex ml-12 justify-start mt-2">{currentTime}</div>
                        )}
                    </div>
                </div>
            ))}
        </>
    )
}

export default MessageBox