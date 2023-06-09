import { useQuery } from '@tanstack/react-query';
import React from 'react';
import MySingleSelectedClass from './MySingleSelectedClass';

const MySelectedClass = () => {


    

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users');
        return res.json();
      });


    return (
        <div>
            {
                users.filter(user => user.role == "student").map(user => <MySingleSelectedClass key={user._id} selectedClasses={user.addedClasses}></MySingleSelectedClass> )
            }
        </div>
    );
};

export default MySelectedClass;