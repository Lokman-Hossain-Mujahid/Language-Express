import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SingleApprovedClass from './SingleApprovedClass';

const ClassesPage = () => {

    const { data: approvedClasses = [], refetch } = useQuery(
        ['approvedClasses'],
        async () => {
            const res = await fetch('http://localhost:5000/classes');
            return res.json();
        }
    );

    return (
        <div className='grid grid-cols-3 mx-auto gap-10 my-6'>
            {
                approvedClasses.filter(approvedClass => approvedClass.status === 'approved').map((approvedClass, index) => <SingleApprovedClass key={index} index={index} approvedClass={approvedClass}></SingleApprovedClass>)

            }
        </div>
    );
};

export default ClassesPage;