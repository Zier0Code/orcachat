import React, { useState } from 'react'
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';



const LoginDropdown = () => {
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const toggleLogin = () => {
        setIsLoginOpen(!isLoginOpen)
    };
    const toggleSignUp = () => {
        setIsSignUpOpen(!isSignUpOpen)
    };

    return (
        <>
            <div className="absolute mt-56 left-0 md:left-36  rounded-lg shadow-lg w-48 min-w-[284px] min-h-[168]">
                <div className='flex justify-start py-6 px-4 text-black dark:text-white '>
                    <div>
                        <h1 className='font-semibold text-[14px]'>Login To Try some other Features</h1>
                        <p className='text-[#AAA text-[12px] my-3 text-[#AAA]'>Save Conversation History, Upload Files
                            Talk to Admin Support</p>
                        <div className='flex justify-around'>
                            <button onClick={(toggleLogin)} className='w-[113px] h-[30px] bg-customBlue hover:bg-customBlue/80 text-white dark:hover:bg-[#D9D9D9]/70 dark:bg-[#D9D9D9] dark:text-black rounded-full font-semibold'>Login</button>
                            <button onClick={(toggleSignUp)} className='w-[113px] h-[30px] bg-black/30 hover:bg-black/40 dark:hover:text-white/50 dark:bg-customBGDark rounded-full border-solid border-2 font-semibold hover:text-black text-black/50 hover:font-medium dark:text-white/40 dark:font-normal dark:border-white/50 dark:hover:border-white dark:hover:text-white'>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            {isLoginOpen && (
                <LoginModal isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
            )}
            {
                isSignUpOpen && (
                    <SignUpModal isSignUpOpen={isSignUpOpen} setIsSignUpOpen={setIsSignUpOpen} />
                )
            }
            {/* {isLoginOpen && (
                <div onClick={() => { setIsLoginOpen(false) }} className="absolute left-0 top-0 h-screen max-w-[1444px w-] bg-black/20 flex justify-center items-center">
                    
                </div>
            )} */}

        </>
    )
}

export default LoginDropdown