import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import checkAuth from '../hoc/checkAuthCustomer';
import Guest from '../components/Guest';
import DisclaimerModal from '../components/DsiclaimerModal';

const LandingPage = () => {
    // GET CUSTOMER FROM REDUX
    const customer = useSelector((state) => state.c_auth.customer);
    const [openModal, setOpenModal] = useState(true);

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    return (
        <>
            <DisclaimerModal isOpen={openModal} onClose={handleCloseModal} />
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