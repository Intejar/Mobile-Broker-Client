import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { TabTitle } from '../../../DynamicTitle/DynamicTitle';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51M8jIFCRKiTr81AEwQ9Uwa2VTyvep9sHhbne0P978NBiDUImftN0oVCx4etDWsh2ebV3OfCD9lWbh2zuGYO0dtS400XUCYc8uc');

const Payment = () => {
    TabTitle('Payment-Mobile Broker')
    const data = useLoaderData()
    const { customerName, customerEmail, customerPhone, productName, productPrice } = data
    return (
        <div>
            <h1 className='text-xl font-bold'>Hi {customerName} make PAYMENT for {productName} </h1>
            <p>Please pay {productPrice} Taka !</p>
            <div className='w-1/2 mt-10 mx-auto bg-orange-200 p-5'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm data = {data} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;