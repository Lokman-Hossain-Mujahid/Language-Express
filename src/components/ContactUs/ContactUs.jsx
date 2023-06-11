import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import contact from "../../contact.json";
import Lottie from "lottie-react";
import PageTItle from '../../Shared/PageTitle/PageTItle';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';

const ContactUs = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const {user} = useContext(AuthContext)

  const onSubmit = (data) => {
    // Simulating an API call or any asynchronous operation
    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Thank you for contacting us.',
      });
      reset(); // Reset the form after successful submission
    }, 2000);
  };

  return (
    <div className=''>
      <PageTItle title={"Contact Us"}></PageTItle>
      <div className="py-28 lg:flex md:justify-evenly">
        <div className="hero-content flex-col lg:flex-row-reverse font-nunito">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Contact Us</h1>
            <p className="py-6">Have any questions or feedback? Reach out to us using the form below.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered"
                    defaultValue={user?.displayName}
                    {...register("name", { required: true })}
                  />
                  {errors.name && <span className="text-xs text-red-500">Please enter your name</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="input input-bordered"
                    defaultValue={user?.email}
                    {...register("email", { required: true })}
                  />
                  {errors.email && <span className="text-xs text-red-500">Please enter your email</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    placeholder="Enter your message"
                    className="textarea textarea-bordered"
                    {...register("message", { required: true })}
                  ></textarea>
                  {errors.message && <span className="text-xs text-red-500">Please enter your message</span>}
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='rounded-lg'>
          <Lottie animationData={contact} />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
