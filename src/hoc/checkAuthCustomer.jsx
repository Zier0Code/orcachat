import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { customer_checkToken } from '../api/auth';
import { login } from '../redux/customerAuthSlice'


// HIGH ORDER COMPONENT OR HOC
const checkAuth = (WrappedComponent) => {
    const Authenticate = (props) => {
        const customer = useSelector((state) => state.c_auth.customer);
        const [cookies, setCookie, removeCookie] = useCookies()
        const dispatch = useDispatch()
        if (!customer) {
            if (cookies.customer_authToken) {
                customer_checkToken(cookies.customer_authToken).then(res => {
                    if (res?.ok) {
                        // store value in redux
                        dispatch(login(res.data))
                    } else {
                        removeCookie('customer_authToken')
                    }
                })
            }
        }
        return < WrappedComponent {...props} />
    }
    return Authenticate
}
export default checkAuth;