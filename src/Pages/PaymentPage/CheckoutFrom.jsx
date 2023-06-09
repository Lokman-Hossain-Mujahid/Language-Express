import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutFrom = ({ price, classData }) => {
    // console.log(price);
    // const classPrice = parseFloat(price).toFixed(2)
    // console.log(classPrice);

    const stripe = useStripe()
    const elements = useElements()
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    const [isClassSelected, setIsClassSelected] = useState(false);

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error);
            setCardError(error.message);
        }
        else {
            setCardError('')
            // console.log('payment method', paymentMethod);
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                },
            },
        })
        if (confirmError) {
            console.log(confirmError);
        }

        console.log('payment intent', paymentIntent);
        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id)
            // Saving payment info to server
            const paymentHistory = {
                classData,
                transactionId: paymentIntent.id
            }
            console.log(paymentHistory);
            fetch(`http://localhost:5000/managePayment/${user.email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ paymentHistory: [paymentHistory] }),
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    setIsClassSelected(true); // Update local state to indicate class selection

                    Swal.fire({
                        title: 'Success',
                        text: 'Class added successfully',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                });


        }

    }

    return (
        <>
            <form className=' p-6 rounded-lg bg-orange-400' onSubmit={handleSubmit}>
                <CardElement className='bg-white px-2 rounded-lg'
                    options={{
                        style: {
                            base: {
                                fontSize: '40px',
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
                <div className='text-center mt-4'>
                    <button className='btn btn-group' type="submit" disabled={!stripe || !clientSecret || processing}>
                        Pay
                    </button>
                </div>
            </form>
            {cardError && <p className='text-red-600 text-center text-xl font-nunito font-semibold mt-2'>{cardError}</p>}
            {transactionId && <p className='text-green-600 text-center text-xl font-nunito font-semibold mt-2'>Transaction completed with transactionId: {transactionId}</p>}
        </>
    );
};

export default CheckoutFrom;