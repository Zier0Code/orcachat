import React from 'react'
import NextLine from './NextLine'
import orca from '../assets/images/Logo Middle Customer.png'
const MessageBox = ({ messages }) => {
    return (
        <>
            {messages.map((message, index) => (
                <div key={index} className='flex flex-col md:w-auto'>
                    <div
                        key={index}
                        className={` rounded-full ${message.sender === 'user'
                            ? 'p-2 mx-2 mt-2 bg-customColorIput px-4 text-white self-end'
                            : 'pr-2 py-2 mt-2 text-white/70 self-start flex'
                            }`}
                    >
                        {message.sender === 'bot' && (
                            <img
                                src={orca}
                                alt="Bot"
                                className="size-6 md:mr-2 rounded-full"
                            />
                        )}
                        <NextLine message={message.text} />
                    </div>
                    <div>
                        {message.sender === 'user' && (
                            <div className="text-xs text-gray-500 ml-2 flex mr-4 justify-end">Time here</div>
                        )}
                        {message.sender === 'bot' && (
                            <div className="text-xs text-gray-500 flex ml-8 md:ml-10 justify-start">Time here</div>
                        )}
                    </div>
                </div>
            ))}
        </>
    )
}

export default MessageBox