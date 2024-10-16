import React, { useState } from 'react'
import logo from "../assets/svgs/orca.svg"
import {
    Mail as MailIcon, Lock as LockIcon,
    Person as PersonIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon
} from "@mui/icons-material"
import { toast } from 'react-toastify';
import { customer_register } from '../api/auth';
import $ from 'jquery'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { login } from '../redux/customerAuthSlice';



const SignUpModal = (props) => {
    const [cookies, setCookie, removeCookies] = useCookies()
    const navigate = useNavigate()
    const [warnings, setWarnings] = useState({})
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [validationStatus, setValidationStatus] = useState({
        minLength: false,
        hasUpperCase: false,
        hasSpecialChar: false,
    });

    const validatePassword = (password) => {
        const minLength = /.{8,}/;
        const hasUpperCase = /[A-Z]/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        setValidationStatus({
            minLength: minLength.test(password),
            hasUpperCase: hasUpperCase.test(password),
            hasSpecialChar: hasSpecialChar.test(password),
        });
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };
    const toggleSignUp = () => {
        props.setIsSignUpOpen(false)
    };

    const submitForm = (e) => {
        e.preventDefault()
        if (!acceptedTerms) {
            setWarnings({ ...warnings, terms: 'You must accept the Terms and Conditions and Privacy Policy.' });
            return;
        }

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
                    toast.success(res?.message ?? "Account has been Registered", { position: "bottom-left", autoClose: 2000 })
                    setCookie("customer_authToken", res.data.authToken)
                    dispatch(login(res?.data))
                    navigate('/')
                } else {
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
                    <div className="bg-white dark:bg-customBGDark rounded-lg p-2 md:p-6 w-80 md:w-96 text-white">
                        <div className='flex items-center flex-col'>
                            <img className="size-16 md:size-20" src={logo} alt="Logo Orca" />
                            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[28px] dark:text-white  text-black animate-pulse">Create An Account</h2>
                        </div>
                        <form onSubmit={submitForm} className='px-8' >
                            <div className='mb-3 flex flex-col'>
                                <div className='flex items-center'>
                                    <PersonIcon className="absolute size-2 mt-1 ml-3 text-gray-400" />
                                    <input
                                        className=" dark:border-customColorInput  bg-white w-full p-2 rounded-full pl-12 text-black dark:text-white border dark:focus:border-customBtn focus:outline-none text-[12px] sm:text-base shadow-lg focus:border-customBlue dark:bg-[#303030]"
                                        type="text"
                                        id='username'
                                        autoFocus
                                        autoComplete="true"
                                        placeholder='Username'
                                        maxLength="32" />
                                </div>

                                {
                                    warnings?.username ? (
                                        <p className='text-red-500 mt-1 text-[12px]'>{warnings?.username}</p>
                                    ) : null
                                }
                            </div>
                            <div className='mb-3 flex flex-col'>
                                <div className='flex items-center'>
                                    <MailIcon className="absolute size-2 mt-1 ml-3 text-gray-400" />
                                    <input className=" dark:border-customColorInput  bg-white w-full p-2 rounded-full pl-12 text-black dark:text-white border dark:focus:border-customBtn focus:outline-none text-[12px] sm:text-base shadow-lg focus:border-customBlue dark:bg-[#303030]" type="text" id='email' autoComplete="true" placeholder='Email' />
                                </div>
                                {
                                    warnings?.email ? (
                                        <p className='text-red-500 mt-1 text-[12px]'>{warnings?.email}</p>
                                    ) : null
                                }
                            </div>
                            <div className='flex mb-3 flex-col'>
                                <div>
                                    <LockIcon className="absolute mt-2 ml-3 text-gray-400" />
                                    <input
                                        className="dark:border-customColorInput bg-white w-full p-2 sm:text-base text-black dark:text-white border text-[12px] rounded-full pl-12 darkfocus:border-customBtn focus:outline-none shadow-lg focus:border-customBlue dark:focus:border-customBtn dark:bg-[#303030]"
                                        id='password'
                                        type="password"
                                        placeholder='Password'
                                        maxLength="28"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                </div>
                                <div className="mt-2 text-xs">
                                    <p className='font-bold'>
                                        Password must have:
                                    </p>
                                    <ul className="mt-2 text-xs ml-4 mb-2">
                                        <li className={validationStatus.minLength ? 'text-green-500' : 'text-red-500'}>
                                            {validationStatus.minLength ? <CheckCircleIcon fontSize='small' /> : <CancelIcon fontSize='small' />} 8 Characters
                                        </li>
                                        <li className={validationStatus.hasUpperCase ? 'text-green-500' : 'text-red-500'}>
                                            {validationStatus.hasUpperCase ? <CheckCircleIcon fontSize='small' /> : <CancelIcon fontSize='small' />} 1 Uppercase Letter
                                        </li>
                                        <li className={validationStatus.hasSpecialChar ? 'text-green-500' : 'text-red-500'}>
                                            {validationStatus.hasSpecialChar ? <CheckCircleIcon fontSize='small' /> : <CancelIcon fontSize='small' />} 1 Character or Symbol
                                        </li>
                                    </ul>
                                    <span className='text-[12px] font-semibold text-green-500'>E.g. Password@1</span>
                                </div>

                                {
                                    warnings?.password ? (
                                        <p className='text-red-500 mt-1 text-[12px]'>{warnings?.password}</p>
                                    ) : null
                                }
                            </div>
                            <div className='mb-8 flex'>
                                <LockIcon className="absolute mt-2 ml-3 text-gray-400" />
                                <input
                                    className=" dark:border-customColorInput  bg-white w-full p-2 sm:text-base  text-black dark:text-white border text-[12px] rounded-full pl-12 dark:focus:border-customBtn focus:outline-none shadow-lg focus:border-customBlue dark:bg-[#303030]"
                                    id='password_confirmation'
                                    type="password"
                                    placeholder='Password Confirmation'
                                    maxLength="28"
                                    required
                                />
                            </div>
                            <div className='mb-3 flex items-center'>
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className="mr-2"
                                    required
                                />
                                <label htmlFor="terms" className="text-black dark:text-white text-[12px] sm:text-xs">
                                    I accept the <Link to="/terms-and-conditions" target="_blank" className="text-customBlue dark:text-customBtn">Terms and Conditions</Link> and <Link to="/privacy-policy" target="_blank" className="text-customBlue dark:text-customBtn">Privacy Policy</Link>.
                                </label>
                                {
                                    warnings?.terms ? (
                                        <p className='text-red-500 mt-1 text-[12px]'>{warnings?.terms}</p>
                                    ) : null
                                }
                            </div>
                            <div className='flex items-center flex-col mt-8'>
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className={`${acceptedTerms ? "bg-customBlue hover:bg-customBlue/80 dark:bg-customLightBlue dark:hover:bg-customLightBlue/80" : "bg-gray-700/50 cursor-not-allowed dark:text-gray-500"} font-bold  p-2 w-full rounded-full `}>
                                    Sign Up
                                </button>
                                <button
                                    type="button"
                                    className="text-gray-500 hover:text-gray-70 mt-2 hover:text-black hover:font-semibold dark:hover:text-white"
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