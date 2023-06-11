import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SingleInstructor from './SingleInstructor';
import PageTItle from '../../Shared/PageTitle/PageTItle';



const InstructorPage = () => {

        const { data: instructors = [], refetch } = useQuery(['instructors'], async () => {
          const res = await fetch('http://localhost:5000/users');
          return res.json();
        });

    return (
        <div>
            <PageTItle title={"All Instructors"}></PageTItle>
            <div className='grid grid-cols-3 max-w-7xl mx-auto gap-10 my-6'>
            {
                instructors.filter(instructor => instructor.role == 'instructor').map((instructor, index) => <SingleInstructor key={index} instructor={instructor}></SingleInstructor>)
            }
        </div>
        </div>
    );
};

export default InstructorPage;