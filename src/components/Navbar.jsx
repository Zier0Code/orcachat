import React, { useState } from 'react'
import orca from '../assets/images/Orca Landing Customer Logo.png'
import profile from '../assets/images/profile.jpg'
import Down from '../assets/svgs/Down';
import Up from '../assets/svgs/Up';
import LoginDropdown from './LoginDropdown';
import checkAuth from '../hoc/checkAuthCustomer';
import { useDispatch, useSelector } from 'react-redux';
import {
    Logout as LogoutIcon,
    Settings as SettingsIcon
} from '@mui/icons-material';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { logout } from '../redux/customerAuthSlice';


const Navbar = ({ isTyping, setMessages }) => {
    const customer = useSelector((state) => state.c_auth.customer)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies()
    const dispatch = useDispatch()

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const onLogOut = () => {
        removeCookie("customer_authToken", null)
        dispatch(logout())
    }
    return (
        <>
            {
                customer ? (
                    <nav className='fixed top-0 left-0 w-full bg-inherit shadow-md z-50'>
                        <div className='h-[50px] flex items-center md:pl-36 pl-8 md:justify-between'>
                            <div className="flex items-center">
                                <button onClick={toggleDropdown} className='flex items-center'>
                                    <div className='flex-shrink-0 flex items-center'>
                                        <img className="h-8 w-auto" src={orca} alt="Logo" />
                                        <div className='mx-2 flex'>
                                            <h1 className='font-lemon mt-1 text-white'>ORCA</h1>
                                        </div>
                                    </div>
                                </button>
                                {
                                    !isDropdownOpen && (
                                        <div className="absolute mt-4 left-2 md:left-40 bg-[#303030] rounded-lg shadow-lg w-48 min-w-[154px] min-h-[168] cursor-default top-10 ">
                                            <div className='flex justify-start py-6 px-4 text-white font-medium'>
                                                Orca Version 1.0
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    !isTyping && (
                                        <button
                                            className="p-2 bg-inherit text-white/50 hover:text-white rounded-md hover:bg-black/20 hover:font-medium ml-2"
                                            onClick={() => setMessages([])}
                                        >
                                            <span className=''>New Chat</span>
                                        </button>
                                    )
                                }

                            </div>
                        </div>
                    </nav>
                ) : (
                    <nav className='fixed top-0 left-0 w-full bg-inherit shadow-md z-50'>
                        <div className='h-[50px] flex items-center md:pl-36 pl-8 md:justify-between'>
                            <div className="flex items-center">
                                <button onClick={toggleDropdown} className='flex items-center'>
                                    <div className='flex-shrink-0 flex items-center'>
                                        <img className="h-8 w-auto" src={orca} alt="Logo" />
                                        <div className='mx-2 flex'>
                                            <h1 className='font-lemon mt-1 text-white'>ORCA</h1>
                                            {
                                                isDropdownOpen ? (<Up />) : (<Down />)
                                            }
                                        </div>
                                    </div>
                                </button>
                                {
                                    !isTyping && (
                                        <button
                                            className="p-2 bg-inherit text-white/50 hover:text-white rounded-md hover:bg-black/20 hover:font-medium ml-2"
                                            onClick={() => setMessages([])}
                                        >
                                            <span className=''>New Chat</span>
                                        </button>
                                    )
                                }

                                {isDropdownOpen && (
                                    <LoginDropdown />
                                )}
                            </div>
                        </div>
                    </nav>
                )
            }

        </>
    )
}

export default checkAuth(Navbar)