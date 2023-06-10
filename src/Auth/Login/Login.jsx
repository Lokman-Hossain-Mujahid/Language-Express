import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';


const Login = () => {

  const { googleSignIn, signIn, success, setSuccess } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const { handleSubmit, register, formState: { errors } } = useForm();

  const from = location.state?.from?.pathname || '/';
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = data => {
    const { email, password } = data;

    setError('');
    if (password.length < 6) {
      setError('*Password needs to be 6 characters or longer*');
      return;
    }

    signIn(email, password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);

        setSuccess(null);
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.log(error);
        setError('*No user found*');
      });
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

      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <div>
      {/* <Link to="/"><button className='absolute top-2 left-2 px-3 py-3 text-white font-bebas text-3xl bg-gradient-to-r from-orange-500 to-orange-500 rounded-lg mt-4 md:mt-0'>Return To Home</button></Link> */}
      <div className="hero md:h-[100vh] bg-orange-300">
        <div className="text-white text-center py-2">
          {success ? <p>{success}</p> : ''}
        </div>
        <div className="hero-content flex-col lg:flex">
          <div className="text-center">
            <h1 className="text-5xl font-bold font-nunito">Login now!</h1>
            <p className="py-6 text-xl font-nunito">
              To enroll in various language courses in {' '}
              <span className="font-semibold italic">"Language Express"</span>
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="form-control">
                <label htmlFor="email" className="label">
                  Your email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required={true}
                  className="input input-bordered"
                  {...register('email', { required: true })}
                />
                {errors.email && <p className="text-red-500">Email is required</p>}
              </div>
              <div className="form-control relative">
                <label htmlFor="password" className="label">
                  Your password
                </label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required={true}
                  className="input input-bordered"
                  {...register('password', { required: true })}
                />
                <span onClick={togglePasswordVisibility} className="password-toggle-icon absolute right-0 bottom-[16%] pr-2">
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </span>
                {errors.password && <p className="text-red-500">Password is required</p>}
              </div>
              <button type="submit" className="btn mt-4 bg-white text-black">
                Login
              </button>
            </form>
            <h2 className="text-center text-xl mt-2">Or</h2>
            <button onClick={handleGoogleSingIn} className="btn my-4">
              Login With Google
            </button>
            <p className="text-red-500 text-center mt-6">{error}</p>
          </div>
          <div className="mt-6">
            <h2>
              <small>
                Don't have an account? <Link className="text-red-600 underline" to="/register">Register</Link>
              </small>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
