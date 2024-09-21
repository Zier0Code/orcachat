import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux'
import Orca from '../assets/images/Logo Middle Customer.png'
import { Send as SendIcon } from "@mui/icons-material"
import checkAuth from '../hoc/checkAuthCustomer';

const LandingPage = () => {
    const customer = useSelector((state) => state.c_auth.customer);
    return (
        <>
            {/* Navbar */}
            {
                customer ? (
                    <div className='min-h-screen bg-[#212121]'>
                        <Navbar />
                        <div className='flex flex-col justify-around w-full min-h-screen px-20'>

                            <header className="text-center text-white mt-10 flex flex-col">
                                <img className="size-16 self-center mb-5 md:size-20" src={Orca} alt="Orca Logo" />
                                <h1 className="md:text-3xl font-semibold text-2xl">Hello, This is <span className="text-customLightBlue">Orca Chatbot</span></h1>
                                <p className="mt-2 text-[12px] md:text-sm">You can inquire about anything related to STI Ortigas - Cainta</p>
                            </header>

                            <div className="self-center">
                                <ul>
                                    <li className='mb-2' >
                                        <button className="bg-customBGDark text-[#AAAAAA] py-2 px-4 w-auto rounded-full text-[12px] border-2 border-solid border-[#303030] hover:text-white">How to enroll in STI Freshmen College?</button>
                                    </li>
                                    <li className='mb-2'>
                                        <button className="bg-customBGDark py-2 px-4 w-auto rounded-full text-[12px] border-2 border-solid border-[#303030] hover:text-white  text-[#AAAAAA]">How many courses do STI Offer?</button>
                                    </li>
                                    <li className='mb-2'>
                                        <button className="bg-customBGDark text-[#AAAAAA]  py-2 px-4 w-auto rounded-full text-[12px] border-2 border-solid border-[#303030] hover:text-white ">How to apply for Scholarship?</button>
                                    </li>
                                </ul>

                                <div className='flex relative items-start'>
                                    <input className="w-full bg-[#303030] p-2 outline-none text-white rounded-full max-w-[675px md:w-[675px]]" autoFocus type="text" />
                                    <button className='absolute right-4 self-center top-2 text-white'> <SendIcon sx={{ width: 20, height: 20, }} /></button>
                                </div>


                                <footer className="mt-2 text-center text-gray-500 text-xs">
                                    <p>privacy 2024</p>
                                </footer>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='min-h-screen dark:bg-customBGDark bg-slate-200'>
                        <Navbar />
                    </div>
                )
            }
        </>
    )
}

export default checkAuth(LandingPage)