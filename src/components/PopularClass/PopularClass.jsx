import React from 'react';
import PageTItle from '../../Shared/PageTitle/PageTItle';
import { useQuery } from '@tanstack/react-query';
import { Fade } from 'react-awesome-reveal';
import { FaDollarSign, FaChair, FaUserAlt } from "react-icons/fa";

const PopularClass = () => {

    const { data: approvedClasses = [], refetch } = useQuery(
        ['approvedClasses'],
        async () => {
            const res = await fetch('https://language-express-server.vercel.app/popularClasses');
            return res.json();
        }
    );

    return (
        <div>
            <PageTItle title={"Popular Classes"}></PageTItle>
            <div className='grid md:grid-cols-2'>
                {
                    approvedClasses.filter(approvedClass => approvedClass.status === 'approved').slice(0, 6).map((approvedClass, index) =>
                        <Fade key={index}>
                            <div  className=" md:flex gap-10 my-4 mx-2 items-center  font-bebas p-2 rounded-lg bg-orange-400">
                                <div>
                                    <img className='h-[30vh] mx-auto rounded-lg' src={approvedClass.image} alt="" />
                                </div>
                                <div className='mt-2 text-center md:text-start'>
                                    <h2 className='text-4xl '>{approvedClass.className}</h2>
                                    <h2 className='text-3xl flex items-center my-3'><span className='text-2xl'><FaDollarSign></FaDollarSign></span>Price: {approvedClass.price}</h2>
                                    <h2 className='text-3xl flex items-center my-3'><span className='text-2xl'><FaChair></FaChair></span>Seats Available: {approvedClass.availableSeats}</h2>
                                    <h2 className=' text-3xl flex items-center  my-3'><span className='text-2xl'><FaUserAlt></FaUserAlt></span>Students: {approvedClass.enrolledStudents}</h2>
                                </div>
                            </div>
                        </Fade>
                    )
                }
            </div>
        </div>
    );
};

export default PopularClass;