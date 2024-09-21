import React, { useState } from 'react'
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';



const LoginDropdown = () => {
    const [isSignUpnOpen, setIsSignUpnOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const toggleLogin = () => {
        setIsLoginOpen(!isLoginOpen)
    };
    const toggleSignUp = () => {
        setIsSignUpnOpen(!isSignUpnOpen)
    };

    return (
        <>
            <div className="absolute mt-56 left-0 md:left-36 bg-[#303030] rounded-lg shadow-lg w-48 min-w-[284px] min-h-[168]">
                <div className='flex justify-start py-6 px-4 text-white'>
                    <div>
                        <h1 className='font-semibold text-[14px]'>Login To Try some other Features</h1>
                        <p className='text-[#AAA text-[12px] my-3 text-[#AAA]'>Save Conversation History, Upload Files
                            Talk to Admin Support</p>
                        <div className='flex justify-around'>
                            <button onClick={(toggleLogin)} className='w-[113px] h-[30px] hover:bg-[#D9D9D9]/70 bg-[#D9D9D9] text-black rounded-full font-semibold'>Login</button>
                            <button onClick={(toggleSignUp)} className='w-[113px] h-[30px] hover:text-white/50 bg-[#212121] rounded-full border-solid border-2 border-white hover:border-white/50'>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            {isLoginOpen && (
                <LoginModal />
            )}
            {
                isSignUpnOpen && (
                    <SignUpModal />
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