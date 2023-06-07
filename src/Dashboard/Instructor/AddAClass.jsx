import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';

const AddAClass = () => {

    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = (data) => {
        // Create a class in the database with the submitted data
        const classData = {
            ...data,
            status: 'pending',
        };

        // Perform the necessary database operations to create the class
        // Example: make an API request or use a database library

        console.log(classData);
    };

    return (
        <div className='md:my-0 md:h-[100vh] hero bg-orange-300 py-5 md:w-full md:mx-auto rounded-lg'>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="form-control">
                    <label htmlFor="className" className="label">
                        Class Name
                    </label>
                    <input
                        id="className"
                        type="text"
                        placeholder="Enter class name"
                        className="input input-bordered"
                        {...register('className', { required: true })}
                    />
                    {errors.className && <p className="text-red-500">Class Name is required</p>}
                </div>
                <div className="form-control">
                    <label htmlFor="classImage" className="label">
                        Class Image
                    </label>
                    <input 
                    type="file"
                    {...register('image', { required: true })}  
                    className="file-input file-input-bordered w-full max-w-xs" />
                    {errors.classImage && <p className="text-red-500">Class Image is required</p>}
                </div>
                <div className="form-control">
                    <label htmlFor="instructorName" className="label">
                        Instructor Name
                    </label>
                    <input
                        id="instructorName"
                        type="text"
                        value={user?.displayName}
                        readOnly
                        className="input input-bordered"
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="instructorEmail" className="label">
                        Instructor Email
                    </label>
                    <input
                        id="instructorEmail"
                        type="text"
                        value={user?.email}
                        readOnly
                        className="input input-bordered"
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="availableSeats" className="label">
                        Available Seats
                    </label>
                    <input
                        id="availableSeats"
                        type="number"
                        className="input input-bordered"
                        {...register('availableSeats', { required: true })}
                    />
                    {errors.availableSeats && <p className="text-red-500">Available Seats is required</p>}
                </div>
                <div className="form-control">
                    <label htmlFor="price" className="label">
                        Price
                    </label>
                    <input
                        id="price"
                        type="number"
                        className="input input-bordered"
                        {...register('price', { required: true })}
                    />
                    {errors.price && <p className="text-red-500">Price is required</p>}
                </div>
                <div className="form-control">
                    <button type="submit" className="btn mt-4 bg-white text-black">
                        Add Class
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAClass;
