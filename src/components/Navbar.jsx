import React, { useEffect, useState } from 'react'
import orca from '../assets/images/Dark Mode.png'
import profile from '../assets/images/no user.jpg'
import Down from '../assets/svgs/Down';
import Up from '../assets/svgs/Up';
import LoginDropdown from './LoginDropdown';
import checkAuth from '../hoc/checkAuthCustomer';
import { useDispatch, useSelector } from 'react-redux';
import {
    Logout as LogoutIcon,
    Settings as SettingsIcon,
    Feedback as FeedbackIcon,
    DriveFileRenameOutline as DriveFileRenameOutlineIcon
} from '@mui/icons-material';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { logout } from '../redux/customerAuthSlice';
import { Rating, Tooltip } from '@mui/material';
import DarkButton from './DarkButton';
import lightlogo from '../assets/images/Light Mode.png'
import { create_conversation, storeMessages } from '../api/conversation';
import $ from 'jquery'
import { create_feedback } from '../api/feedback';
import StarRating from './StarRating';


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
    const [loading, setLoading] = useState(false);
    // const [data, setData] = useState([])
    const [data, setData] = useState([]);

    const [conversationID, setConversationID] = useState(null);

    const onCreateConversations = () => {
        try {
            create_conversation(customer?.id).then(res => {
                if (res.ok) {
                    // toast.success(res?.message ?? "Message Stored", { position: "bottom-left", autoClose: 2000 })
                    setConversationID(res.data.id);
                } else {
                    toast.error(res.message ?? "Something went wrong", { autoClose: 1000 });
                }
            });
        } catch (err) {
            console.log(err);
        } finally {

        }
    };
    useEffect(() => {
        if (customer) {
            onCreateConversations();
        }
    }, [customer?.id]);
    const conversation_id = conversationID; // Example conversation ID
    const customer_id = customer?.id; // Example customer ID

    const onCreateMessages = () => {
        if (messages.length === 0) {
            toast.warning("Please send a message before starting a new one", { autoClose: 2000 });
            setCreateLoading(true);
            setTimeout(() => {
                setCreateLoading(false);
            }, 5000);
        } else {
            if (!loading) {
                setLoading(true);
                const updatedMessages = messages.map(message => ({
                    ...message,
                    conversation_id,
                    customer_id
                }));
                storeMessages(updatedMessages, cookies.customer_authToken).then(res => {
                    if (res.ok) {
                        console.log(res);
                        toast.success(res.message ?? "Message Stored", { position: "bottom-left", autoClose: 2000 });
                    } else {
                        console.log(res);
                        toast.error(res.message ?? "Something went wrong");
                    }
                }).finally(() => {
                    onCreateConversations();
                    setLoading(false);
                    setMessages([]);
                });
            }
        }

    };

    const onSetData = () => {
        const updatedMessages = messages.map(message => ({
            ...message,
            conversation_id,
            customer_id
        }));
        setData(updatedMessages);
    };

    const [createLoading, setCreateLoading] = useState(false);
    const handleCreateNewChat = () => {
        if (messages.length === 0) {
            toast.warning("Please send a message before starting a new one", { autoClose: 2000 });
            setCreateLoading(true);
            setTimeout(() => {
                setCreateLoading(false);
            }, 5000);
        }
        setMessages([])
    };


    // FEEDBACK
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [feedbackSubmitLoading, setFeedbackSubmitLoading] = useState(false);  // Feedback Submit Loading
    const handleFeedbackClick = () => {
        setFeedbackOpen(!feedbackOpen);
    };

    const feedbackClose = () => {
        setFeedbackOpen(false);
    };

    const handleSendFeedback = () => {
        const feedback = $("#feedback").val();
        if (feedback.length === 0) {
            toast.warning("Please enter your feedback", { autoClose: 2000 });
            setFeedbackSubmitLoading(true);
            setTimeout(() => {
                setFeedbackSubmitLoading(false);
            }, 5000);
        }
        const body = {
            message: feedback,
            customer_id: customer?.id,
            conversation_id: conversationID,
            rating: rating
        };

        create_feedback(body, cookies.customer_authToken).then(res => {
            if (res.ok) {
                toast.success(res.message ?? "Feedback Sent", { autoClose: 2000 });
                setFeedbackOpen(false);
                $("#feedback").val("")
                setRating(0)
            } else {
                toast.error(res.message ?? "Something went wrong", { autoClose: 2000 });
            }
        }).finally(() => {
            setFeedbackSubmitLoading(false);
        }
        );

    };

    useEffect(onSetData, [messages])
    const [rating, setRating] = useState(0);
    return (
        <>
            {
                customer ? (
                    <nav className='fixed top-0 left-0 w-full bg-inherit shadow-md z-50'>
                        <div className='h-[50px] flex items-center md:pl-36 pl-8 md:justify-between dark:bg-customBGDark shadow-black/50 shadow-md bg-customBlue'>
                            <div className="flex items-center justify-between w-full">
                                <div className='flex'>
                                    <button onClick={toggleDropdown} className='flex items-center'>
                                        <Tooltip title="ORCA Version" arrow>
                                            <div className='flex-shrink-0 flex items-center'>
                                                <img className="h-8 w-auto hidden dark:block" src={orca} alt="Dark mode Logo" />
                                                <img className="h-8 w-auto dark:hidden" src={lightlogo} alt="Light mode Logo" />
                                                <div className='mx-2 flex'>
                                                    <h1 className='font-lemon mt-1 text-white'>ORCA</h1>
                                                </div>
                                            </div>
                                        </Tooltip>
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
                                                disabled={createLoading}
                                                className={`p-2 bg-inherit text-white/50 hover:text-white rounded-md hover:bg-black/20 hover:font-medium ml-2`}
                                                onClick={onCreateMessages}
                                            >
                                                <Tooltip title="Create New Chat" arrow>
                                                    <DriveFileRenameOutlineIcon />
                                                </Tooltip>
                                            </button>
                                            // <button
                                            //     disabled={loading || messages.length === 0}
                                            //     className={`p-2 bg-inherit text-white/50 hover:text-white rounded-md hover:bg-black/20 hover:font-medium ml-2 `}
                                            //     onClick={onCreateMessages}
                                            // >
                                            //     <DriveFileRenameOutlineIcon />
                                            // </button>
                                        )
                                    }
                                </div>
                                <div className='flex'>
                                    <Tooltip title="Give us Feedback" arrow>
                                        <button className=' sm:mr-5 dark:text-white/40 hover:text-white text-gray-400 flex items-center mr-2' onClick={handleFeedbackClick}>
                                            <FeedbackIcon className="h-8 w-8" />
                                            <span className="md:text-sm">Feedback</span>
                                        </button>
                                    </Tooltip>
                                    <Tooltip title="Menu" arrow>
                                        <button className='mr-5 sm:mr-20 md:mr-40' onClick={toggleUserDropdown}>
                                            <img className="h-8 w-8 rounded-full" src={profile} alt="Profile" />
                                        </button>
                                    </Tooltip>
                                </div>

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
                        <div className={`${feedbackOpen ? "flex" : "hidden"} fixed inset-0 bg-black bg-opacity-50 justify-center items-center z-50`}>
                            <div className="bg-white dark:bg-customBGDark p-6 rounded-lg shadow-lg w-96">
                                <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Send us Feedback</h2>
                                <textarea
                                    className="w-full p-2 border rounded-lg dark:bg-customColorInput dark:text-white"
                                    rows="5"
                                    id='feedback'
                                    placeholder="Enter your feedback here..."
                                    autoFocus
                                ></textarea>
                                <StarRating setRating={setRating} rating={rating} />
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                                        onClick={feedbackClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className={`${feedbackSubmitLoading ? 'bg-white text-gray-400 border-2 border-gray-400' : 'bg-customBlue text-white'}  px-4 py-2 rounded-lg`}
                                        onClick={handleSendFeedback}
                                        disabled={feedbackSubmitLoading}
                                    >
                                        Submit
                                    </button>
                                </div>
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
                                            disabled={createLoading}
                                            className={`p-2 bg-inherit text-white/50 hover:text-white rounded-md hover:bg-black/20 hover:font-medium ml-2`}
                                            onClick={handleCreateNewChat}
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