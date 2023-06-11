import React, { useContext, useEffect, useState } from 'react';
import useClasses from '../../hooks/useClasses';

import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';
import MySingleClasses from './MySingleClasses';
import PageTItle from '../../Shared/PageTitle/PageTItle';

const MyClasses = () => {
    //   const [classes] = useClasses();

    const [classes, setClasses] = useState([])

    const { user, loading } = useContext(AuthContext)

    const [updated, setUpdated] = useState(false)

    useEffect(() => {

        if (!loading) {
            fetch(`https://language-express-server.vercel.app/classes/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setClasses(data)
                })
        }
        setUpdated(false)

    }, [loading, updated])



    return (
        <div className='w-full'>
            <div className='overflow-x-scroll'>
                <PageTItle title={"My Class"}></PageTItle>            
                <table className='table table-zebra font-nunito'>
                    <thead>
                        <tr className='text-center'>
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
                            classes.map((singleClass, index) => <MySingleClasses key={index} index={index} singleClass={singleClass} setUpdated={setUpdated} ></MySingleClasses>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClasses;
