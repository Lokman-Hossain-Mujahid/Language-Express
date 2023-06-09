import React from 'react';

const SingleInstructor = ({ instructor }) => {


    const { name, email, photoURL } = instructor

    return (
        <div className=''>
            <div className="card w-96 bg-orange-400 h-[50vh] font-nunito shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={photoURL} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{email}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleInstructor;