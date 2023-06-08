import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';


const MySingleClasses = ({ singleClass, index, setUpdated }) => {


    const [modalOpen, setModalOpen] = useState(false);



    const handleUpdate = (event) => {
        event.preventDefault();



        const form = event.target;
        const price = form.price.value;
        const availableSeats = form.availableSeats.value;
        const id = form.id.value;


        fetch(`http://localhost:5000/update/${id}`, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ price: price, availableSeats: availableSeats })
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
                    setUpdated(true);
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
            <tr className='text-center'>

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
                                <form className='flex flex-col' onSubmit={handleUpdate}>

                                    <label htmlFor="email" className="label">
                                        Price
                                    </label>
                                    <input name='price' defaultValue={singleClass.price} type="number" required={true} placeholder="price" className="input input-bordered w-full max-w-xs" />

                                    <label htmlFor="email" className="label">
                                        Available Seats
                                    </label>
                                    <input name='availableSeats' defaultValue={singleClass.availableSeats} type="number" required={true} placeholder="availableSeats" className="input input-bordered w-full max-w-xs" />

                                    <input className='hidden' name='id' type="text" value={singleClass._id} />
                                    <input className='hidden' name='email' type="email" value={singleClass.instructorEmail} />
                                    <input className='btn btn-primary my-2' type='submit'></input>
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