import React, { useState } from 'react'
import logo from "../assets/images/Logo Middle Customer.png"
import { Mail as MailIcon, Lock as LockIcon, Person as PersonIcon } from "@mui/icons-material"
import { toast } from 'react-toastify';
import { customer_register } from '../api/auth';
import $ from 'jquery'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { login } from '../redux/customerAuthSlice';

const SignUpModal = (props) => {
    const [cookies, setCookie, removeCookies] = useCookies()
    const navigate = useNavigate()
    const [warnings, setWarnings] = useState({})
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const toggleSignUp = () => {
        props.setIsSignUpOpen(false)
    };

    const submitForm = (e) => {
        e.preventDefault()

        if (!loading) {

            const body = {
                username: $("#username").val(),
                email: $("#email").val(),
                password: $("#password").val(),
                password_confirmation: $("#password_confirmation").val(),
            }
            setLoading(true)
            customer_register(body).then(res => {
                if (res?.ok) {
                    toast.success(res?.message ?? "Account has been Registered")
                    setCookie("customer_authToken", res.data.token)
                    dispatch(login(res?.data))
                    navigate('/orca/chat')
                } else {
                    toast.error(res?.message ?? "Something Went Wrong.")
                    setWarnings(res?.errors)
                }
            }).finally(() => {
                setLoading(false)
            })
        }

    }

    return (
        <>{
            props.isSignUpOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-[#212121] rounded-lg p-6 w-96 text-white">
                        <div className='flex items-center flex-col'>
                            <img className="size-12 mb-5" src={logo} alt="Logo Orca" />
                            <h2 className="text-2xl font-bold mb-4 text-[28px]">Create An Account</h2>
                        </div>
                        <form onSubmit={submitForm} className='mt-5 px-8' >
                            <div className='mb-3 flex flex-col'>
                                <div className='flex items-center'>
                                    <PersonIcon className="absolute size-2 mt-1 ml-3 text-gray-400" />
                                    <input className="w-full p-2 rounded-full pl-12 focus:border-customBtn focus:outline-none text-[12px] sm:text-base bg-[#303030]" type="text" id='username' autoFocus autoComplete="true" placeholder='Username' />
                                </div>
                                {
                                    warnings?.username ? (
                                        <p className='text-red-500 text-center mt-1 text-[12px]'>{warnings?.username}</p>
                                    ) : null
                                }
                            </div>
                            <div className='mb-3 flex flex-col'>
                                <div className='flex items-center'>
                                    <MailIcon className="absolute size-2 mt-1 ml-3 text-gray-400" />
                                    <input className="w-full p-2 rounded-full pl-12 focus:border-customBtn focus:outline-none text-[12px] sm:text-base bg-[#303030]" type="text" id='email' autoFocus autoComplete="true" placeholder='Email' />
                                </div>
                                {
                                    warnings?.email ? (
                                        <p className='text-red-500 text-center mt-1 text-[12px]'>{warnings?.email}</p>
                                    ) : null
                                }
                            </div>
                            <div className='flex mb-3 flex-col'>
                                <div>
                                    <LockIcon className="absolute mt-2 ml-3 text-gray-400" />
                                    <input className="w-full p-2 sm:text-base text-[12px] rounded-full pl-12 focus:border-customBtn focus:outline-none bg-[#303030]" id='password' type="password" placeholder='Password' />
                                </div>
                                {
                                    warnings?.password ? (
                                        <p className='text-red-500 text-center mt-1 text-[12px]'>{warnings?.password}</p>
                                    ) : null
                                }
                            </div>
                            <div className='mb-8 flex'>
                                <div>
                                    <LockIcon className="absolute mt-2 ml-3 text-gray-400" />
                                    <input className="w-full p-2 sm:text-base text-[12px] rounded-full pl-12 focus:border-customBtn focus:outline-none bg-[#303030]" id='password_confirmation' type="password" placeholder='Password Confirmation' />
                                </div>
                            </div>
                            <div className='flex items-center flex-col mt-8'>
                                <button disabled={loading} type="submit" className='font-bold bg-customLightBlue p-2 w-full rounded-full hover:bg-customLightBlue/80'> Create </button>
                                {/* <button className="text-white w-full h-[42px] bg-customBtn rounded-xl hover:shadow-customBtn hover:bg-customBtn50" disabled={loading} type="submit"><span className='font-semibold text-[20px] sm:text-2xl tracking-wider'>Login</span></button> */}
                                <button
                                    type="button"
                                    className="text-gray-500 hover:text-gray-70 mt-2 hover:text-white"
                                    onClick={toggleSignUp}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default SignUpModal