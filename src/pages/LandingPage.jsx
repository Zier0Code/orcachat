import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import checkAuth from '../hoc/checkAuthCustomer';
import Guest from '../components/Guest';

const LandingPage = () => {
    // GET CUSTOMER FROM REDUX
    const customer = useSelector((state) => state.c_auth.customer);
    return (
        <>
            {
                customer ? (
                    <Guest />
                ) : (
                    <Guest />
                )
            }
        </>
    )
}

export default checkAuth(LandingPage)