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


const Navbar = () => {
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
                    <nav className="bg-inherit h-[50px] flex justify-between items-center md:px-20 shadow-md shadow-black/25">
                        <div className="relative">
                            <button onClick={toggleDropdown} className='flex items-center'>
                                <div className='flex-shrink-0 flex items-center'>
                                    <img className="h-8 w-auto" src={orca} alt="Logo" />
                                    <div className='mx-2 flex'>
                                        <h1 className='font-lemon mt-1 text-white' > ORCA</h1>
                                        {
                                            !isDropdownOpen ? (<Up />) : (<Down />)
                                        }
                                    </div>
                                </div>
                            </button>
                        </div>
                        <button className='mr-4 md:ml-0' onClick={toggleUserDropdown} >
                            <img className="size-8" src={profile} alt="" />
                        </button>
                        {
                            !isDropdownOpen && (
                                <div className="absolute mt-4 left-2 md:left-10 bg-[#303030] rounded-lg shadow-lg w-48 min-w-[154px] min-h-[168] cursor-default top-10 ">
                                    <div className='flex justify-start py-6 px-4 text-white font-medium'>
                                        Orca Version 1.0
                                    </div>
                                </div>
                            )


                        }
                        {
                            !isUserDropdownOpen && (

                                <div className="absolute mt-4 right-2 md:right-10 bg-[#303030] rounded-lg shadow-lg w-48 min-w-[154px] min-h-[168] cursor-default top-10 ">
                                    <div className='flex justify-start py-6 px-4 text-white'>
                                        <ul className='w-full'>
                                            <li>
                                                <button className='hover:bg-black/70 w-full p-2 flex justify-start'>
                                                    <SettingsIcon />
                                                    <p className='ml-2 '>Settings</p>
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={onLogOut} className='hover:bg-black/70 w-full p-2 flex justify-start'>
                                                    <LogoutIcon />
                                                    <p className='ml-2'>
                                                        Log out
                                                    </p>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                    </nav>
                ) : (
                    <div className='absolute h-[50px] bg-inherit w-full'>
                        <nav className='shadow-md sticky top-0 h-full md:pl-36 md:flex md:justify-between'>
                            <div className="relative flex items-center">
                                <button onClick={toggleDropdown} className='flex items-center'>
                                    <div className='flex-shrink-0 flex items-center'>
                                        <img className="h-8 w-auto" src={orca} alt="Logo" />
                                        <div className='mx-2 flex'>
                                            <h1 className='font-lemon mt-1 text-white' > ORCA</h1>
                                            {
                                                isDropdownOpen ? (<Up />) : (<Down />)
                                            }
                                        </div>
                                    </div >
                                </button >

                                {isDropdownOpen && (
                                    <LoginDropdown />
                                )}
                            </div >
                        </nav>
                    </div>
                    // <nav className="bg-inherit h-[50px] flex justify-between items-center md:px-20 shadow-md shadow-black/25 ml-4">
                    // <div className="relative">
                    //     <button onClick={toggleDropdown} className='flex items-center'>
                    //         <div className='flex-shrink-0 flex items-center'>
                    //             <img className="h-8 w-auto" src={orca} alt="Logo" />
                    //             <div className='mx-2 flex'>
                    //                 <h1 className='font-lemon mt-1 text-white' > ORCA</h1>
                    //                 {
                    //                     isDropdownOpen ? (<Up />) : (<ArrowUp />)
                    //                 }
                    //             </div>
                    //         </div >
                    //     </button >

                    //     {isDropdownOpen && (
                    //         <LoginDropdown />
                    //     )}
                    // </div >
                    // </nav >
                )
            }

        </>
    )
}

export default checkAuth(Navbar)