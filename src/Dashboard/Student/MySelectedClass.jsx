import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutFrom from '../../Pages/PaymentPage/CheckoutFrom';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const MySelectedClass = () => {
    const [selectedClasses, setSelectedClasses] = useState([]);
    const { user, loading } = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);

    function deleteClass(data, Class, user) {
        const newData = data.filter(singleData => singleData._id !== Class._id);
        console.log(newData);

        fetch(`http://localhost:5000/deleteClass/${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ addedClasses: newData })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSelectedClasses(newData); // Update the state after successful deletion
                Swal.fire('Deleted!', 'The class has been deleted.', 'success');
            })
            .catch(error => {
                console.error(error);
                Swal.fire('Error', 'An error occurred while deleting the class.', 'error');
            });
    }

    useEffect(() => {
        fetch(`http://localhost:5000/currentUser/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setSelectedClasses(data[0]?.addedClasses || []);
            });
    }, [loading, user]);

    return (
        <div className="w-full">
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr className='text-center'>
                            <th>#</th>
                            <th>Image</th>
                            <th>ClassName</th>
                            <th>InstructorName</th>
                            <th>SeatsAvailable</th>
                            <th>Price</th>
                            <th>Delete</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedClasses.map((classData, index) => (
                            <tr key={classData._id} className='text-center'>
                                <td>{index + 1}</td>
                                <td className="flex justify-center">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={classData.image} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </td>
                                <td>{classData.className}</td>
                                <td>{classData.instructorName}</td>
                                <td>{classData.availableSeats}</td>
                                <td>${classData.price}</td>
                                <td>
                                    <button onClick={() => deleteClass(selectedClasses, classData, user)} className='btn btn-primary'>Delete</button>
                                </td>

                                {/* PAYMENT PAGE */}

                                <td>
                                    <label htmlFor={classData._id} className="btn">
                                        Pay
                                    </label>
                                    <input
                                        type="checkbox"
                                        id={classData._id}
                                        className="modal-toggle"
                                    />
                                    <div className="modal">
                                        <div className="modal-box w-11/12 max-w-5xl">
                                            <div className='w-[50vw] rounded-lg p-4 mx-auto'>
                                                <div>
                                                    <h2 className='text-8xl text-center font-bebas py-4'>Payment</h2>
                                                </div>

                                                <div className=''>
                                                    <Elements stripe={stripePromise}>
                                                        <CheckoutFrom classData={classData} price={classData.price}></CheckoutFrom>
                                                    </Elements>
                                                </div>
                                            </div>
                                            <div className="modal-action">
                                                <label htmlFor={classData._id} className="btn" onClick={() => setModalOpen(false)}>
                                                    Done
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySelectedClass;
