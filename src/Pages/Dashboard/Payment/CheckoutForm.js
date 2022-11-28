import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ data }) => {
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe()
    const elements = useElements()
    const { productPrice, customerName, customerEmail, _id, productId } = data
    console.log(_id)
    const navigate = useNavigate()

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productPrice })
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [productPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            console.log(error)
            setCardError(error.message)
        }
        else {
            setCardError('')
        }
        setSuccess('');
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: customerName,
                        email: customerEmail
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return
        }
        console.log(paymentIntent)
        if (paymentIntent.status === "succeeded") {

            // console.log('card info', card);
            // // store payment info in the database
            // const payment = {
            //     price,
            //     transactionId: paymentIntent.id,
            //     email,
            //     bookingId: _id
            // }
            fetch(`http://localhost:5000/bookings/${_id}`, {
                method: 'PATCH',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.acknowledged) {
                        setSuccess('Congrats! your payment completed');
                        setTransactionId(paymentIntent.id);
                        fetch(`http://localhost:5000/products/${productId}`, {
                            method: 'PATCH',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({ status: 'sold' })
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                if (data.acknowledged) {
                                    toast.success('saved changes')
                                    navigate('/dashboard/MyOrders')
                                }
                                else {
                                    toast.error(data.message)
                                }
                            })
                    }
                })
        }
        setProcessing(false);


    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            <p className='text-red-500'>{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;