import React from 'react';
import useClasses from '../../hooks/useClasses';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';

const MyClasses = () => {
    const [classes] = useClasses();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data, allClass) => {
        axios
            .put(`http://localhost:5000/classes/${allClass._id}`, data)
            .then((response) => {
                console.log(response.data);
                if (response.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Updated Successfully',
                        text: 'The class has been updated successfully.',
                        confirmButtonText: 'OK',
                        onClose: () => {
                            // Handle any necessary actions after the alert is closed
                        },
                    });
                    reset(); // Reset the form fields
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className='w-full'>
            <div className='overflow-x-auto'>
                <table className='table table-zebra font-nunito'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Name</th>
                            <th>Status</th>
                            <th>Enrolled Students</th>
                            <th>Feedback</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((allClass, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{allClass.className}</td>
                                <td>{allClass.status}</td>
                                <td>{allClass.enrolledStudents}</td>
                                <td>{allClass.feedBack}</td>
                                <td>
                                    {/* The button to open modal */}
                                    <label htmlFor={allClass._id} className="btn">Update</label>
                                    <input
                                        type='checkbox'
                                        id={allClass._id}
                                        className='modal-toggle'
                                    />
                                    <div className='modal'>
                                        <div className='modal-box w-11/12 max-w-5xl'>
                                            <div>
                                                <h2 className='text-6xl font-bebas font-semibold text-center'>
                                                    Update a Class
                                                </h2>
                                                <hr className='md:w-1/4 mx-auto border-yellow-500 mb-6' />
                                            </div>
                                            <div className='text-center md:my-6 md:h-[70vh] hero bg-orange-300 py-5 md:w-2/4 mx-auto rounded-lg'>
                                                <form
                                                    className='grid gap-2 md:gap-0 md:grid-rows-3'
                                                    onSubmit={handleSubmit((data) =>
                                                        onSubmit(data, allClass)
                                                    )}
                                                >
                                                    <div className='flex flex-col'>
                                                        <div>
                                                            <label htmlFor='price' className='label'>
                                                                Class Price
                                                            </label>
                                                            <input
                                                                className='p-1 rounded'
                                                                defaultValue={allClass.price}
                                                                placeholder='Price'
                                                                {...register('price', { required: false })}
                                                                type='number'
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor='availableSeats' className='label'>
                                                                Available Seats
                                                            </label>
                                                            <input
                                                                className='mt-2 md:mt-0 md:ml-0 p-1 rounded'
                                                                defaultValue={allClass.availableSeats}
                                                                placeholder='availableSeats'
                                                                {...register('availableSeats', {
                                                                    required: false,
                                                                })}
                                                                type='number'
                                                            />
                                                        </div>
                                                    </div>
                                                    <button
                                                        type='submit'
                                                        className='btn mt-4 bg-white text-black'
                                                    >
                                                        Update
                                                    </button>
                                                </form>
                                            </div>
                                            <div className='modal-action'>
                                                <label htmlFor={allClass._id} className='btn'>
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

export default MyClasses;
