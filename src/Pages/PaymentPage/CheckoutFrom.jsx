import { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutFrom = ({ price, classData, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

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
      card,
    });

    if (error) {
      console.log('error', error);
      setCardError(error.message);
      return;
    }

    setCardError('');
    setProcessing(true);

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      console.log(confirmError);
    }

    console.log('payment intent', paymentIntent);
    setProcessing(false);

    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);

      // Saving payment info to server
      const paymentHistory = {
        classData,
        transactionId: paymentIntent.id,
      };

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
          onSuccess(); // Call the onSuccess callback function
          Swal.fire({
            title: 'Success',
            text: 'Payment Successful!',
            icon: 'success',
            confirmButtonText: 'OK',
          });

          // Update class information
          const updateData = {
            price: classData.price,
            availableSeats: classData.availableSeats - 1,
          };

          fetch(`http://localhost:5000/update/${classData._id}`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(updateData),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
            })
            .catch((error) => {
              console.error(error);
            });
        });
    }
  };

  return (
    <>
      <form className="p-6 rounded-lg bg-orange-400" onSubmit={handleSubmit}>
        <CardElement
          className="bg-white px-2 rounded-lg"
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
        <div className="text-center mt-4">
          <button className="btn btn-group" type="submit" disabled={!stripe || !clientSecret || processing}>
            Pay
          </button>
        </div>
      </form>
      {cardError && (
        <p className="text-red-600 text-center text-xl font-nunito font-semibold mt-2">{cardError}</p>
      )}
      {transactionId && (
        <p className="text-green-600 text-center text-xl font-nunito font-semibold mt-2">
          Transaction completed with transactionId: {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutFrom;
