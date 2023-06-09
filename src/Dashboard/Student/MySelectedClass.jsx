import { useQuery } from '@tanstack/react-query';
import React from 'react';

const MySelectedClass = () => {

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users');
        return res.json();
      });


    return (
        <div>
            {
                users.filter(user => user.role == "student").map(user => console.log(user.addedclasses))
            }
        </div>
    );
};

export default MySelectedClass;