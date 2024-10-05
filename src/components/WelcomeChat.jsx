import React, { useRef } from 'react'

const WelcomeChat = ({ handleGetStartedClick }) => {

    return (
        <>
            <div className="rounded-full mb-2 text-black dark:text-white/70 self-end text-sm sm:text-base font-medium">
                Welcome to ORCA Bot! 🐋
                <hr className='mb-5 mt-1 border-black/40 dark:border-white/50' />
                I’m here to answer your inquiries instantly. Whether it’s about admissions, courses, registrar, just ask away! Let’s get started!
            </div>
            <button
                className='bg-customBlue text-white px-4 py-2 rounded-lg hover:bg-customBlue/80 transition-all w-40'
                onClick={handleGetStartedClick}
            >
                Get Started
            </button>
        </>
    )
}

export default WelcomeChat