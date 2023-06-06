import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Register = () => {
    const { createUser, logOut, setSuccess } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    const [error, setError] = useState('');

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/;

    const onSubmit = async (data) => {
        const { name, email, password, confirmPassword, photoURL, gender, phoneNumber, address } = data;

        if (password !== confirmPassword) {
            setError('*Passwords do not match');
            return;
        }

        if (!passwordRegex.test(password)) {
            setError('*Password requirements not met');
            return;
        }

        try {
            const response = await createUser(email, password);
            const user = response.user;

            await updateProfile(user, {
                displayName: name,
                photoURL: photoURL,
            });

            console.log(user);
            reset();
            setSuccess('*Registration complete! You can now Login');
            logOut();
            navigate('/login');
        } catch (error) {
            console.log(error);
            setError('*This E-mail already exists*');
        }
    };

    return (
        <div className="hero bg-orange-300 mx-auto">
            <div>
                <div className="hero-content flex-col lg:flex">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold font-nunito">Register now!</h1>
                        <p className="py-6 text-xl font-nunito">
                            To enroll in various language courses in {' '}
                            <span className="font-semibold italic">"Language Express"</span>
                        </p>
                    </div>
                    
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-10">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <div className="form-control">
                                <label htmlFor="name" className="label">
                                    Your name
                                </label>
                                <input
                                    {...register('name', { required: true })}
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    className="input input-bordered"
                                />
                                {errors.name && <p className="text-red-500">Name is required</p>}
                            </div>
                            <div className="form-control">
                                <label htmlFor="email" className="label">
                                    Your email
                                </label>
                                <input
                                    {...register('email', { required: true })}
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="input input-bordered"
                                />
                                {errors.email && <p className="text-red-500">Email is required</p>}
                            </div>
                            <div className="form-control">
                                <label htmlFor="password" className="label">
                                    Your password
                                </label>
                                <input
                                    {...register('password', { required: true })}
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered"
                                />
                                {errors.password && <p className="text-red-500">Password is required</p>}
                            </div>
                            <div className="form-control">
                                <label htmlFor="confirmPassword" className="label">
                                    Confirm password
                                </label>
                                <input
                                    {...register('confirmPassword', { required: true })}
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    className="input input-bordered"
                                />
                                {errors.confirmPassword && <p className="text-red-500">Confirm Password is required</p>}
                                {errors.confirmPassword?.type === 'validate' && (
                                    <p className="text-red-500">Passwords do not match</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label htmlFor="photoURL" className="label">
                                    Photo URL
                                </label>
                                <input
                                    {...register('photoURL')}
                                    id="photoURL"
                                    type="url"
                                    placeholder="Enter your photo URL"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="gender" className="label">
                                    Gender
                                </label>
                                <select
                                    {...register('gender', { required: true })}
                                    id="gender"
                                    className="input input-bordered"
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.gender && <p className="text-red-500">Gender is required</p>}
                            </div>
                            <div className="form-control">
                                <label htmlFor="phoneNumber" className="label">
                                    Phone number
                                </label>
                                <input
                                    {...register('phoneNumber')}
                                    id="phoneNumber"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="address" className="label">
                                    Address
                                </label>
                                <textarea
                                    {...register('address')}
                                    id="address"
                                    placeholder="Enter your address"
                                    className="input input-bordered"
                                ></textarea>
                            </div>
                            <p className="text-red-500 mt-4">{error}</p>
                            <button type="submit" className="btn mt-4 bg-white text-black">
                                Submit
                            </button>
                        </form>
                        <div className="mt-6">
                            <h2>
                                <small>
                                    Already registered?{' '}
                                    <Link className="text-red-600 underline" to="/login">
                                        Login
                                    </Link>
                                </small>
                            </h2>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
