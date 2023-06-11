import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SingleApprovedClass from './SingleApprovedClass';
import PageTItle from '../../Shared/PageTitle/PageTItle';

    

const ClassesPage = () => {

    const { data: approvedClasses = [], refetch } = useQuery(
        ['approvedClasses'],
        async () => {
            const res = await fetch('http://localhost:5000/classes');
            return res.json();
        }
    );

    return (
        <div>
            <PageTItle title={"All Available Classes"}></PageTItle>
            <div className='grid md:grid-cols-3 max-w-7xl mx-auto gap-10 md:my-6'>
            

            {
                approvedClasses.filter(approvedClass => approvedClass.status === 'approved').map((approvedClass, index) => <SingleApprovedClass key={index} index={index} approvedClass={approvedClass}></SingleApprovedClass>)

            }
        </div>
        </div>
    );
};

export default ClassesPage;