import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';
import MySingleEnrolledClass from './MySingleEnrolledClass';
import PageTItle from '../../Shared/PageTitle/PageTItle';

const MyEnrolledClass = () => {

    const { user, loading } = useContext(AuthContext);

    const [enrolledClasses, setEnrolledClasses] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/currentUser/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setEnrolledClasses(data[0]?.paymentHistory || []);
            });
    }, [loading, user]);

    return (

        <div className="w-full">
            <PageTItle title={"My Enrolled Classes"}></PageTItle>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr className='text-center'>
                            <th>#</th>
                            <th>Image</th>
                            <th>ClassName</th>
                            <th>InstructorName</th>
                            
                            <th>Price</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            enrolledClasses.map((enrolledClass, index) => <MySingleEnrolledClass key={index} index={index} enrolledClass={enrolledClass.classData}></MySingleEnrolledClass>)
                        }
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default MyEnrolledClass;