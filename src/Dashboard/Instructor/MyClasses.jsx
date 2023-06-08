import React, { useContext, useEffect, useState } from 'react';
import useClasses from '../../hooks/useClasses';

import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';
import MySingleClasses from './MySingleClasses';

const MyClasses = () => {
    //   const [classes] = useClasses();

    const [classes, setClasses] = useState([])

    const { user, loading } = useContext(AuthContext)

    useEffect(() => {

        if (!loading) {
            fetch(`http://localhost:5000/classes/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setClasses(data)
                })
        }

    }, [loading])



    return (
        <div className='w-full'>
            <div className='overflow-x-auto'>
                <table className='table table-zebra font-nunito'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Name</th>
                            <th>Status</th>
                            <th>Enrolled Students</th>
                            <th>Feedback</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        classes.map((singleClass, index) => <MySingleClasses key={index} index={index} singleClass={singleClass} ></MySingleClasses>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClasses;
