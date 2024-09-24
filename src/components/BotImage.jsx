import React from 'react'
import orca from '../assets/images/Logo Middle Customer.png'

const BotImage = ({ message }) => {
    return (
        <>
            <div className="pr-2 py-2 mt-2 text-black/80 dark:text-white/60 self-start flex text-sm sm:text-base">
                <img
                    src={orca}
                    alt="Bot"
                    className="size-7 mr-2 rounded-full animate-pulse"
                />
                {message}
            </div>
        </>
    )
}

export default BotImage