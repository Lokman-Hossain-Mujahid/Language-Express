// import React from 'react';
// import CheckoutFrom from './CheckoutFrom';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

// const PaymentPage = () => {
//     return (
//         <div className='w-[50vw] rounded-lg p-4 mx-auto'>
//             <div>
//                 <h2 className='text-8xl text-center font-bebas py-4'>Payment</h2>
//             </div>

//             <div className=''>
//                 <Elements stripe={stripePromise}>
//                     <CheckoutFrom></CheckoutFrom>
//                 </Elements>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;