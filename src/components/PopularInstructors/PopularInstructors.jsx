import React from 'react';
import PageTItle from '../../Shared/PageTitle/PageTItle';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';


const PopularInstructors = () => {

    const { data: instructors = [], refetch } = useQuery(['instructors'], async () => {
        const res = await fetch('http://localhost:5000/users');
        return res.json();
    });


    return (
        <div>
            <PageTItle title={"Popular Instructors"}></PageTItle>
            <div className=' grid md:grid-cols-2 '>

                {
                    instructors.filter(instructor => instructor.role == 'instructor').slice(0, 6).map((instructor, index) =>
                        <div key={index} className=" md:flex gap-10 my-4 mx-2 items-center bg-base-200 font-bebas p-2 rounded-lg bg-orange-400">
                            <div>
                                <img className='h-[30vh] rounded-lg' src={instructor.photoURL} alt="" />
                            </div>
                            <div>
                                <h2 className='text-4xl '>Name: {instructor.name}</h2>
                                <h2 className='text-4xl  my-3'>Email: {instructor.email}</h2>
                                <Link to="/classes"><div className='btn btn-primary text-3xl font-normal'>
                                    Join Classes
                                </div></Link>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default PopularInstructors;