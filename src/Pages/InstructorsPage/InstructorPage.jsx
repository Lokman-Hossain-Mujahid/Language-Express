import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SingleInstructor from './SingleInstructor';



const InstructorPage = () => {

        const { data: instructors = [], refetch } = useQuery(['instructors'], async () => {
          const res = await fetch('http://localhost:5000/users');
          return res.json();
        });

    return (
        <div className='grid grid-cols-3 mx-auto gap-10 my-6'>
            {
                instructors.filter(instructor => instructor.role == 'instructor').map((instructor, index) => <SingleInstructor key={index} instructor={instructor}></SingleInstructor>)
            }
        </div>
    );
};

export default InstructorPage;