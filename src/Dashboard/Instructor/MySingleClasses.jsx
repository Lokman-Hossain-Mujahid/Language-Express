import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const MySingleClasses = ({singleClass, index}) => {


    const [modalOpen, setModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data, singleClass, event) => {
        data.price = parseInt(data.price); // Convert price to integer

        // axios
        //   .put(`http://localhost:5000/classes/${singleClass._id}`, data)
        //   .then((response) => {
        //     console.log(response.data);

        fetch(`http://localhost:5000/classes/${singleClass._id}`, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Updated Successfully',
                        text: 'The class has been updated successfully.',
                        confirmButtonText: 'OK',
                        onClose: () => {
                            // Handle any necessary actions after the alert is closed
                        },
                    });
                    event.target.reset()
                    // reset(); // Reset the form fields
                    // setModalOpen(true); // Close the modal
                }
            })


            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <tr>
                
                <td>{index + 1}</td>
                <td>{singleClass.className}</td>
                <td>{singleClass.status}</td>
                <td>{singleClass.enrolledStudents}</td>
                <td>{singleClass.feedBack}</td>
                <td>
                    <label htmlFor={singleClass._id} className='btn'>Update</label>
                    <input
                        type='checkbox'
                        id={singleClass._id}
                        className='modal-toggle'
                    />
                    <div className='modal'>
                        <div className='modal-box w-11/12 max-w-5xl'>
                            <h2 className='text-6xl font-bebas font-semibold text-center'>
                                Update a Class
                            </h2>
                            <hr className='md:w-1/4 mx-auto border-yellow-500 mb-6' />
                            <div className='text-center md:my-6 md:h-[70vh] hero bg-orange-300 py-5 md:w-2/4 mx-auto rounded-lg'>
                                <form
                                    className='grid gap-2 md:gap-0 md:grid-rows-3'
                                    onSubmit={handleSubmit((data) => onSubmit(data, singleClass))}
                                >
                                    <div className='flex flex-col'>
                                        <div>
                                            <label htmlFor='price' className='label'>
                                                Class Price
                                            </label>
                                            <input
                                                className='p-1 rounded'
                                                defaultValue={singleClass.price}
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
                                                defaultValue={singleClass.availableSeats}
                                                placeholder='availableSeats'
                                                {...register('availableSeats', { required: false })}
                                                type='number'
                                            />
                                        </div>
                                    </div>
                                    <button type='submit' className='btn mt-4 bg-white text-black'>
                                        Update
                                    </button>
                                </form>
                            </div>
                            <div className='modal-action'>
                                <label htmlFor={singleClass._id} className='btn' onClick={() => setModalOpen(false)}>
                                    Done
                                </label>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default MySingleClasses;