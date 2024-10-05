import React from 'react'
import orca from '../assets/svgs/orca.svg'

const BotImage = ({ message }) => {
    return (
        <>
            <div className="pr-2 py-2 mt-2 text-black/80 dark:text-white/60 self-start flex text-sm sm:text-base">
                <img
                    src={orca}
                    alt="Bot"
                    className="size-10 rounded-full animate-pulse"
                />
                <p className='ml-2 flex items-center'>
                    {message}
                </p>
            </div>
        </>
    )
}

export default BotImage