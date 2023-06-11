import React from 'react';
import PageTItle from '../../Shared/PageTitle/PageTItle';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Zoom } from 'react-awesome-reveal';


const PopularInstructors = () => {

    const { data: instructors = [], refetch } = useQuery(['instructors'], async () => {
        const res = await fetch('https://language-express-server.vercel.app/users');
        return res.json();
    });


    return (
        <div>
            <PageTItle title={"Popular Instructors"}></PageTItle>
            <div className=' grid md:grid-cols-2'>

                {
                    instructors.filter(instructor => instructor.role == 'instructor').slice(0, 6).map((instructor, index) =>
                        <Zoom>
                            <div key={index} className=" md:flex gap-10 my-4 mx-2 md:items-center font-bebas p-2 rounded-lg bg-orange-400  text-center md:text-left">
                                <div>
                                    <img className='h-[30vh] w-3/4 md:w-full mx-auto my-2 rounded-lg' src={instructor.photoURL} alt="" />
                                </div>
                                <div>
                                    <h2 className='text-xl md:text-4xl'>Name: {instructor.name}</h2>
                                    <h2 className='text-xl md:text-4xl my-3'>Email: {instructor.email}</h2>
                                    <Link to="/classes"><div className='btn btn-primary text-xl md:text-3xl font-normal'>
                                        Join Classes
                                    </div></Link>
                                </div>
                            </div>
                        </Zoom>
                    )
                }

            </div>
        </div>
    );
};

export default PopularInstructors;