import React, { useEffect, useState } from 'react'
import orca from '../assets/images/Orca Landing Customer Logo.png'
import profile from '../assets/images/no user.jpg'
import Down from '../assets/svgs/Down';
import Up from '../assets/svgs/Up';
import LoginDropdown from './LoginDropdown';
import checkAuth from '../hoc/checkAuthCustomer';
import { useDispatch, useSelector } from 'react-redux';
import {
    Logout as LogoutIcon,
    Settings as SettingsIcon,
    DriveFileRenameOutline as DriveFileRenameOutlineIcon
} from '@mui/icons-material';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { logout } from '../redux/customerAuthSlice';
import { Tooltip } from '@mui/material';
import DarkButton from './DarkButton';
import lightlogo from '../assets/svgs/logoMain.svg'


const Navbar = ({ messages, isTyping, setMessages }) => {
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
        setIsUserDropdownOpen(!isUserDropdownOpen);
        toast.error("You've been Logged Out ", { autoClose: 2000 })
        dispatch(logout())
    }

    // ON CREATE MESSAGE
    // const [loading, setLoading] = useState(false);
    // const [data, setData] = useState([])
    const [data, setData] = useState([]);


    // const onCreateMessages = () => {
    //     setData([...messages])
    //     console.log(data)
    //     setMessages([])
    // }

    // const onSetData = () => {
    //     setData(messages)
    // }
    const conversation_id = 1; // Example conversation ID
    const customer_id = 2; // Example customer ID

    const onCreateMessages = () => {
        const updatedMessages = messages.map(message => ({
            ...message,
            conversation_id,
            customer_id
        }));
        setData(updatedMessages);
        console.log(updatedMessages);
        setMessages([]);
    };

    const onSetData = () => {
        const updatedMessages = messages.map(message => ({
            ...message,
            conversation_id,
            customer_id
        }));
        setData(updatedMessages);
    };

    useEffect(onSetData, [messages])

    return (
        <>
            {
                customer ? (
                    <nav className='fixed top-0 left-0 w-full bg-inherit shadow-md z-50'>
                        <div className='h-[50px] flex items-center md:pl-36 pl-8 md:justify-between dark:bg-customBGDark shadow-black/50 shadow-md bg-customBlue'>
                            <div className="flex items-center justify-between w-full">
                                <div className='flex'>
                                    <button onClick={toggleDropdown} className='flex items-center'>
                                        <div className='flex-shrink-0 flex items-center'>
                                            <img className="h-8 w-auto hidden dark:block" src={orca} alt="Dark mode Logo" />
                                            <img className="h-8 w-auto dark:hidden" src={lightlogo} alt="Light mode Logo" />
                                            <div className='mx-2 flex'>
                                                <h1 className='font-lemon mt-1 text-white'>ORCA</h1>
                                            </div>
                                        </div>
                                    </button>
                                    {
                                        !isDropdownOpen && (
                                            <div className="absolute mt-4 left-2 md:left-40 bg-[#303030] rounded-lg shadow-lg w-48 min-w-[154px] min-h-[168] cursor-default top-10 ">
                                                <div className='flex justify-start py-6 px-4 text-black bg-white shadow-md dark:text-white font-medium dark:bg-inherit'>
                                                    Orca Version 1.0
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        !isTyping && (
                                            <button
                                                className="p-2 bg-inherit text-white/50 hover:text-white rounded-md hover:bg-black/20 hover:font-medium ml-2"
                                                onClick={onCreateMessages}
                                            >
                                                <DriveFileRenameOutlineIcon />
                                            </button>
                                        )
                                    }
                                </div>
                                <button className='mr-5 sm:mr-20 md:mr-40' onClick={toggleUserDropdown}>
                                    <img className="h-8 w-8 rounded-full" src={profile} alt="Profile" />
                                </button>

                                {
                                    !isUserDropdownOpen && (

                                        <div className="absolute mt-4 right-2 md:right-10 bg-white dark:bg-customBGDark rounded-lg shadow-lg w-48 min-w-[154px] min-h-[168] cursor-default top-10">
                                            <div className='flex justify-start py-6 px-4 text-black dark:text-white'>
                                                <ul className='w-full'>
                                                    <li>
                                                        <button className='hover:bg-black/20 dark:hover:bg-black/70 w-full p-2 flex justify-start'>
                                                            <SettingsIcon />
                                                            <p className='ml-2 '>Settings</p>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button onClick={onLogOut} className=' hover:bg-black/20 dark:hover:bg-black/70 w-full p-2 flex justify-start'>
                                                            <LogoutIcon />
                                                            <p className='ml-2'>
                                                                Log out
                                                            </p>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <DarkButton />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </nav >
                ) : (
                    <nav className='fixed top-0 left-0 w-full bg-inherit shadow-md z-50'>
                        <div className='h-[50px] flex items-center md:pl-36 pl-8 md:justify-between dark:bg-customBGDark bg-customBlue'>
                            <div className="flex items-center">
                                <button onClick={toggleDropdown} className='flex items-center'>
                                    <div className='flex-shrink-0 flex items-center'>
                                        <img className="h-8 w-auto hidden dark:block" src={orca} alt="Dark mode Logo" />
                                        <img className="h-8 w-auto dark:hidden" src={lightlogo} alt="Light mode Logo" />
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
                                            <Tooltip title="Create New Chat">
                                                <DriveFileRenameOutlineIcon />
                                            </Tooltip>
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