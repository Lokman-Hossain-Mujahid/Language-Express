import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import PageTItle from '../../Shared/PageTitle/PageTItle';


const img_hosting_token = import.meta.env.VITE_Image_Upload_token
const AddAClass = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?expiration=600&key=${img_hosting_token}`

    const onSubmit = (data) => {

        const formData = new FormData();
        formData.append('image', data.image[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { className, availableSeats, price } = data;
                    const classItem = { className, image: imgURL, instructorName: user.displayName, instructorEmail: user.email, availableSeats, price: parseFloat(price), status: 'pending', feedBack: 'none yet', enrolledStudents: 0 }
                    console.log(classItem);
                    axiosSecure.post('/classes', classItem)
                        .then(data => {
                            console.log('after posting new class', data.data);
                            if (data.data.insertedId) {
                                reset()
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Class Added Successfully',
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                            }
                        })
                }
            })

    };

    console.log(img_hosting_token);

    return (
        <div className='md:my-0 md:h-[100vh] hero bg-orange-300 py-5 md:w-full md:mx-auto rounded-lg font-nunito'>


            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <PageTItle title={"Add a Class"}></PageTItle>
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
                        name='instructorName'
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
                        name='instructorEmail'
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
