import React from 'react';
import PageTItle from '../../Shared/PageTitle/PageTItle';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const PopularClass = () => {

    const { data: approvedClasses = [], refetch } = useQuery(
        ['approvedClasses'],
        async () => {
            const res = await fetch('http://localhost:5000/classes');
            return res.json();
        }
    );

    return (
        <div>
            <PageTItle title={"Popular Classes"}></PageTItle>
            <div className='grid md:grid-cols-2'>
                {
                    approvedClasses.filter(approvedClass => approvedClass.status === 'approved').map((approvedClass, index) =>
                        <div key={index} className=" md:flex gap-10 my-4 mx-2 items-center  font-bebas p-2 rounded-lg bg-orange-400">
                            <div>
                                <img className='h-[30vh] rounded-lg' src={approvedClass.image} alt="" />
                            </div>
                            <div className='mt-2 text-center md:text-start'>
                                <h2 className='text-4xl '>Name: {approvedClass.className}</h2>
                                <h2 className='text-4xl  my-3'>price: {approvedClass.price}</h2>
                                <h2 className='text-4xl  my-3'>Seats: {approvedClass.availableSeats}</h2>
                                <Link to="/classes"><div className='btn btn-primary text-3xl font-normal'>
                                    Select Class Now!
                                </div></Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default PopularClass;