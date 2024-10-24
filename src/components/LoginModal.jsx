import React, { useState } from 'react'
import logo from '../assets/svgs/orca.svg'
import {
    Mail as MailIcon,
    Lock as LockIcon,
    Close as CloseIcon
} from "@mui/icons-material"
import { Button } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { customer_login as CustomerLoginAPI } from '../api/auth';
import { toast } from 'react-toastify';
import { login } from '../redux/customerAuthSlice';
import SignUpModal from './SignUpModal';


const LoginModal = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [cookies, setCookie, removeCookies] = useCookies()
    const navigate = useNavigate()
    const [warnings, setWarnings] = useState({})
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [invalid, setInvalid] = useState("")

    const toggleLogin = () => {
        props.setIsLoginOpen(false)
    };

    const submitForm = (e) => {
        e.preventDefault()
        if (!loading) {
            setLoading(true)
            CustomerLoginAPI({
                username,
                password
            }).then(res => {
                if (res?.ok) {
                    setCookie("customer_authToken", res.data.token)
                    dispatch(login(res?.data))
                    toast.success(res?.message ?? "Logged In Successfully", { position: "bottom-left", autoClose: 2000 })
                    navigate('/')
                } else {
                    setInvalid(res.message)
                    setWarnings(res?.errors)
                }
            }).finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 6000);
            })
        }
    }
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const toggleSignUp = () => {
        setIsSignUpOpen(!isSignUpOpen)
    };
    return (
        <>{
            props.isLoginOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="dark:bg-customBGDark bg-white shadow-lg shadow-black/50 rounded-lg p-2 md:p-6 w-80 md:w-96 text-white relative">
                        <button
                            type="button"
                            className="text-gray-500 hover:font-semibold hover:text-gray-70 mt-2 dark:hover:text-white hover:text-black absolute right-4 top-4"
                            onClick={toggleLogin}

                        >
                            <CloseIcon />
                        </button>
                        <div className='flex items-center flex-col'>
                            <img className="size-16 md:size-20" src={logo} alt="Logo Orca" />
                            <h2 className="animate-pulse text-xl md:text-3xl font-bold nd:mb-4 text-[32px] text-black dark:text-white">Login</h2>
                        </div>
                        <form onSubmit={submitForm} className='mt-2 px-8' >
                            {
                                invalid ? (
                                    <div className=' border border-red-400 p-2 rounded-md mb-4 dark:bg-white/10'>
                                        <p className='text-red-600 dark:text-red-500 text-center text-xs self-start mt-1 font-semibold'><span className='font-bold'> ! </span>{invalid}</p>
                                    </div>
                                ) : null
                            }
                            <div className='mb-3 flex flex-col'>
                                <div className='flex items-center'>
                                    <MailIcon className="absolute size-2 mt-1 ml-3 text-gray-400" />
                                    <input
                                        className="w-full p-2 rounded-full pl-12 dark:focus:border-customBtn focus:border-customBlue dark:border-customColorInput focus:outline-none text-[12px] sm:text-base dark:bg-customColorInput shadow-md text-black dark:text-white border"
                                        type="text"
                                        autoFocus
                                        autoComplete="true"
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder='Username'
                                        maxLength="32"
                                    />
                                </div>
                                {
                                    warnings?.username ? (
                                        <p className='text-red-500 text-center text-[12px] self-start mt-1'>{warnings?.username}</p>
                                    ) : null
                                }
                            </div>
                            <div className='mb-8 flex flex-col'>
                                <div>
                                    <LockIcon className="absolute mt-2 ml-3 text-gray-400" />
                                    <input
                                        className="dark:border-customColorInput w-full p-2 sm:text-base text-[12px] rounded-full pl-12 dark:focus:border-customBtn focus:outline-none dark:bg-customColorInput shadow-md dark:text-white text-black focus:border-customBlue border"
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Password'
                                        maxLength="32" />
                                </div>
                                {
                                    warnings?.password ? (
                                        <p className='text-red-500 text-center text-[12px] self-start mt-1'>{warnings?.password}</p>
                                    ) : null
                                }
                            </div>
                            <div className='flex items-center flex-col'>
                                <button disabled={loading} type="submit" className={`${loading ? 'cursor-not-allowed bg-gray-700/50' : 'bg-customBlue hover:bg-customBlue/80'} font-bold  dark:bg-customBtn p-2 w-full rounded-full dark:hover:bg-customBtn/80`}>Login</button>
                                {/* <button className="text-white w-full h-[42px] bg-customBtn rounded-xl hover:shadow-customBtn hover:bg-customBtn50" disabled={loading} type="submit"><span className='font-semibold text-[20px] sm:text-2xl tracking-wider'>Login</span></button> */}

                                <div className='mt-2 text-black dark:text-white text-xs lg:text-base'>
                                    No Account yet? <span onClick={toggleSignUp} className="text-customBtn cursor-pointer hover:font-semibold hover:text-customBtn/80 underline">Sign Up</span>
                                </div>
                            </div>
                        </form>

                    </div>
                    {
                        isSignUpOpen && (
                            <SignUpModal isSignUpOpen={isSignUpOpen} setIsSignUpOpen={setIsSignUpOpen} />
                        )
                    }
                </div>
            )
        }
        </>
    )
}

export default LoginModal