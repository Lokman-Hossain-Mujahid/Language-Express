import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const Register = () => {
    const { googleSignIn, createUser, logOut, setSuccess } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();


    const from = location.state?.from?.pathname || '/';
    const [error, setError] = useState('');

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/;

    const onSubmit = async (data) => {
        const { name, email, password, confirmPassword, photoURL, gender, phoneNumber, address } = data;

        if (password !== confirmPassword) {
            setError('*Passwords do not match');
            return;
        }

        if (!passwordRegex.test(password)) {
            setError('*Password needs to be 6 characters long with one capital and special character*');
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

            // Add role to user
            await user.getIdTokenResult(true).then((idTokenResult) => {
                user.role = 'student'; // Assign the 'student' role to the user
                idTokenResult.claims.role = 'student'; // Assign the 'student' role to the user's ID token
                user.getIdToken(true); // Refresh the user's ID token with the updated claims
            });

            const userData = {
                name,
                email,
                photoURL,
                role: 'student' // Include the role in the userData object
            };

            fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(userData)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Registration complete! You can now Login',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        logOut();
                        navigate('/login');
                    }
                })


        } catch (error) {
            console.log(error);
            setError('*This E-mail already exists*');
        }
    };



    const handleGoogleSingIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);

                const userData = { name: user.displayName, email: user.email, photoURL: user.photoURL, role: 'student' }

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })

                setSuccess(null);
                navigate('');

            })
            .catch(error => {
                console.log(error);
                setError(error.message);
            });
    };


    return (
        <div className="hero bg-orange-300 mx-auto">
            {/* <Link to="/"><button className='absolute top-2 left-2 px-3 py-3 text-white font-bebas text-3xl bg-gradient-to-r from-orange-500 to-orange-500 rounded-lg mt-4 md:mt-0'>Return To Home</button></Link> */}
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
                        <h2 className="text-center text-xl mt-2">Or</h2>
                        <button onClick={handleGoogleSingIn} className="btn my-4">
                            Login With Google
                        </button>
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
