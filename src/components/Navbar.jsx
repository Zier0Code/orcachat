import React, { useEffect, useState } from 'react'
import orca from '../assets/images/Dark Mode.png'
import profile from '../assets/images/no user.jpg'
import Down from '../assets/svgs/Down';
import Up from '../assets/svgs/Up';
import LoginDropdown from './LoginDropdown';
import checkAuth from '../hoc/checkAuthCustomer';
import logo from '../assets/svgs/orca.svg'
import { useDispatch, useSelector } from 'react-redux';
import {
    Logout as LogoutIcon,
    Settings as SettingsIcon,
    History as HistoryIcon,
    Feedback as FeedbackIcon,
    Help as HelpIcon,
    Add as AddIcon,
    DriveFileRenameOutline as DriveFileRenameOutlineIcon
} from '@mui/icons-material';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { logout } from '../redux/customerAuthSlice';
import { Rating, Tooltip } from '@mui/material';
import DarkButton from './DarkButton';
import lightlogo from '../assets/images/Light Mode.png'
import { create_conversation, storeMessages, user_chat_history } from '../api/conversation';
import $ from 'jquery'
import { create_feedback } from '../api/feedback';
import StarRating from './StarRating';
import Help from './Help';
import LoginModal from './LoginModal';


const Navbar = ({ messages, isTyping, setMessages }) => {
    const customer = useSelector((state) => state.c_auth.customer)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies()
    const [openHelp, setOpenHelp] = useState(false);
    const dispatch = useDispatch()

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const toggleUserDropdown = () => {
        refreshedChatHistory();
        setIsUserDropdownOpen(!isUserDropdownOpen);
        console.log(chatHistory)
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
                        toast.success(res.message ?? "Message Stored", { position: "bottom-left", autoClose: 2000 });
                    } else {
                        toast.error(res.message ?? "Something went wrong", { autoClose: 2000 });
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
    const [clickAdminSupport, setClickAdminSupport] = useState(false);
    const requestAdminSupport = () => {
        toast.info("This Features in Under Development.", { autoClose: 2000 });
        setClickAdminSupport(true);
        setTimeout(() => {
            setClickAdminSupport(false);
        }, 100000);
    };

    // CHAT HISTORY
    const [ChatHistoryOpen, setChatHistoryOpen] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const handleChatHistoryOpen = () => {
        setChatHistoryOpen(!ChatHistoryOpen);
    };

    const refreshedChatHistory = () => {
        user_chat_history(customer?.id, cookies.customer_authToken).then(res => {
            if (res.ok) {
                const conversations = res.data
                const filteredConversations = conversations.filter(conversation =>
                    conversation.customer_id !== null && conversation.messages.length > 0
                );
                const groupedConversations = groupConversationsByEmail(filteredConversations);
                setChatHistory(groupedConversations);
            } else {
                console.log(res.message);
            }
        });
    }

    if (customer) {
        refreshedChatHistory();
    }
    const groupConversationsByEmail = (conversations) => {
        const grouped = conversations.reduce((acc, conversation) => {
            const email = conversation.customer.email;
            if (!acc[email]) {
                acc[email] = {
                    customer: conversation.customer,
                    messages: [],
                    id: conversation.id,
                    created_at: conversation.created_at
                };
            }
            acc[email].messages.push(...conversation.messages);
            return acc;
        }, {});

        return Object.values(grouped);
    };
    //// END

    /// HELP
    const handleOpenHelp = () => {
        setOpenHelp(!openHelp);
    };

    // Login
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const toggleLogin = () => {
        setIsLoginOpen(!isLoginOpen)
    };
    return (
        <>
            {
                customer ? (
                    <nav className='fixed top-0 left-0 w-full bg-inherit shadow-md z-50'>
                        <div className='h-[50px] flex items-center lg:pl-36 pl-2 sm:pl-8 lg:justify-between dark:bg-customBGDark shadow-black/20 shadow-md bg-customBlue'>
                            <div className="flex items-center justify-between w-full">
                                <div className='flex'>
                                    <div className='flex-shrink-0 flex items-center'>
                                        <img className="h-8 w-auto hidden dark:block" src={orca} alt="Dark mode Logo" />
                                        <img className="h-8 w-auto dark:hidden" src={lightlogo} alt="Light mode Logo" />
                                        <div className='mx-2 flex'>
                                            <h1 className='font-lemon mt-1 text-white cursor-default'>ORCA</h1>
                                        </div>
                                    </div>
                                    {
                                        !isTyping && (
                                            <Tooltip title="Create New Chat" arrow>
                                                <button
                                                    disabled={createLoading}
                                                    className={`sm:p-2 mr-2 bg-inherit text-white/50 hover:text-white rounded-md hover:bg-black/20 hover:font-medium ml-2`}
                                                    onClick={onCreateMessages}
                                                >
                                                    <div className='hidden'>
                                                        <DriveFileRenameOutlineIcon />
                                                    </div>
                                                    <div className='text-xs'>
                                                        <AddIcon fontSize='small' /> New Chat
                                                    </div>
                                                </button>
                                            </Tooltip>
                                        )
                                    }
                                </div>
                                <div className='flex'>
                                    {/* <div className='hidden md:flex justify-center mr-2'>
                                        <button
                                            onClick={requestAdminSupport}
                                            className={`${clickAdminSupport ? 'cursor-not-allowed bg-gray-200/50 ' : "dark:hover:text-white hover:text-white hover:bg-black/20 dark:hover:bg-black/50"} px-2 border-white/50 border dark:text-white/60  text-xs text-white/50 rounded-full font-semibold`}
                                            disabled={clickAdminSupport}>
                                            Admin Support
                                        </button>
                                    </div> */}
                                    <Tooltip title="Give us Feedback" arrow>
                                        <button className=' sm:mr-5 hover:text-white text-gray-100 flex items-center mr-2 hover:text-white/60' onClick={handleFeedbackClick}>
                                            <FeedbackIcon fontSize='medium' />
                                            <span className="hidden md:block md:text-sm text-xs">Feedback</span>
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
                                        <div className="absolute mt-4 right-2 md:right-16 bg-white dark:bg-customBGDark rounded-lg shadow-lg w-48 min-w-[154px] min-h-[168] cursor-default top-10">
                                            <div className='flex justify-start py-6 px-4 text-black dark:text-white'>
                                                <ul className='w-full'>
                                                    <li>
                                                        <button className='hover:bg-black/20 dark:hover:bg-black/70 w-full p-2 flex justify-start'
                                                            onClick={handleChatHistoryOpen}
                                                        >
                                                            <HistoryIcon />
                                                            <p className='ml-2 '>Chat History</p>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => setOpenHelp(true)} className='hover:bg-black/20 dark:hover:bg-black/70 w-full p-2 flex justify-start'>
                                                            <HelpIcon />
                                                            <p className='ml-2'>Help</p>
                                                        </button>
                                                    </li>
                                                    {/* <li>
                                                        <button className='hover:bg-black/20 dark:hover:bg-black/70 w-full p-2 flex justify-start'>
                                                            <SettingsIcon />
                                                            <p className='ml-2 '>Settings</p>
                                                        </button>
                                                    </li> */}
                                                    <li>
                                                        <button onClick={onLogOut} className=' hover:bg-black/20 dark:hover:bg-black/70 w-full p-2 flex justify-start'>
                                                            <LogoutIcon />
                                                            <p className='ml-2'>
                                                                Log out
                                                            </p>
                                                        </button>
                                                    </li>
                                                    <hr className='border-1 border-black dark:border-white' />
                                                    <li className='mt-2'>
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
                                        className="hover:bg-black/10 text-black px-4 py-2 rounded-lg mr-2 hover:text-red-600 dark:text-white dark:hover:bg-white/10"
                                        onClick={feedbackClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className={`${feedbackSubmitLoading ? 'bg-white text-gray-400 border-2 border-gray-400' : 'bg-customBlue hover:bg-customBlue/70 text-white'}  px-4 py-2 rounded-lg`}
                                        onClick={handleSendFeedback}
                                        disabled={feedbackSubmitLoading}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* CHAT HISTORY */}

                        <div className={`${ChatHistoryOpen ? "flex" : "hidden"} fixed inset-0 bg-black bg-opacity-50 justify-center items-center z-50`}>
                            <div className="bg-white dark:bg-customBGDark p-6 rounded-lg shadow-lg w-96">
                                <h2 className="text-xl font-bold mb-4 text-black dark:text-white">My Chat History</h2>
                                <h2 className='dark:text-white mb-2'>My Email: {customer?.email} </h2>
                                <div className='overflow-y-auto max-h-[500px] h-80 sm:h-[500px]'>
                                    {chatHistory[0] ? (
                                        <div>
                                            {
                                                chatHistory[0].messages.map((message, index) => (

                                                    <div key={index} className='flex flex-col md:w-auto'>
                                                        {index === 0 || chatHistory[0].messages[index - 1].conversation_id !== message.conversation_id ? (
                                                            <div className="text-sm text-gray-600 dark:text-gray-100 font-semibold mt-4 grid grid-cols-2">
                                                                Date - {new Date(message.created_at).toLocaleDateString()}
                                                                <hr className='border-2 border-black/50 flex self-center dark:border-white/50 dark:border' />
                                                            </div>
                                                        ) : null}

                                                        <div
                                                            key={index}
                                                            className={` rounded-full ${message.sender === 'customer'
                                                                ? 'p-2 mx-2 mt-2 bg-white/50 shadow-md dark:bg-[#303030] px-4 text-black dark:text-white self-end'
                                                                : 'pr-2 py-2 mt-2 text-black/80 dark:text-white/70 self-start flex'
                                                                }`}
                                                        >
                                                            {message.sender === 'bot' && (
                                                                <img
                                                                    src={logo}
                                                                    alt="Bot"
                                                                    className="size-6 md:mr-2 rounded-full"
                                                                />
                                                            )}
                                                            <div className="text-sm">
                                                                <span dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br />') }} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {message.sender === 'customer' && (
                                                                <div className="text-xs text-gray-200 ml-2 flex mr-4 mt-2 justify-end">{new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                            )}
                                                            {message.sender === 'bot' && (
                                                                <div className="text-xs text-gray-200 mt-2 flex ml-8 justify-start">{new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                    ) : (
                                        <div className="text-center text-gray-600 dark:text-gray-400">No Conversations</div>)}
                                </div>
                                <button onClick={handleChatHistoryOpen} className='hover:text-customBtn/50 dark:text-customBtn mt-6'>
                                    Back
                                </button>
                            </div>
                        </div>
                        <div className={`${openHelp ? "flex" : "hidden"} fixed inset-0 bg-black bg-opacity-50 justify-center items-center z-50`}>
                            <div className="bg-white dark:bg-customBGDark p-6 rounded-lg shadow-lg w-96">
                                <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Help</h2>
                                <Help />
                                <button onClick={handleOpenHelp} className='hover:text-customBtn/50 dark:text-customBtn'>
                                    Back
                                </button>
                            </div>
                        </div>
                    </nav >

                ) : (
                    <nav className='fixed top-0 left-0 w-full bg-inherit shadow-md z-50'>
                        <div className='h-[50px] flex justify-between lg:justify-around items-center  pl-2 sm:pl-8 dark:bg-customBGDark shadow-black/20 shadow-md bg-customBlue'>
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
                                        <Tooltip title="Create New Chat">
                                            <button
                                                disabled={createLoading}
                                                className={`sm:p-2 bg-inherit text-white/50 hover:text-white rounded-md hover:bg-black/20 hover:font-medium sm:ml-2`}
                                                onClick={handleCreateNewChat}
                                            >
                                                <div className='hidden'>
                                                    <DriveFileRenameOutlineIcon />
                                                </div>
                                                <div className='text-xs flex items-center '>
                                                    <AddIcon fontSize='small' />
                                                    <p>
                                                        New Chat
                                                    </p>
                                                </div>
                                            </button>
                                        </Tooltip>
                                    )
                                }


                                {isDropdownOpen && (
                                    <LoginDropdown />
                                )}
                            </div>
                            <div>
                                <button
                                    onClick={(toggleLogin)}
                                    className='px-5 py-1 bg-white text-xs sm:text-base hover:bg-white/60 text-customBlue mr-4 lg:mr-0 dark:hover:bg-[#D9D9D9]/70 dark:bg-[#D9D9D9] dark:text-black rounded-full font-semibold'>
                                    Login
                                </button>
                                {
                                    isLoginOpen && (
                                        <LoginModal isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
                                    )
                                }
                            </div>
                        </div>
                    </nav>
                )
            }

        </>
    )
}

export default checkAuth(Navbar)