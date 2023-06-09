import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';
import SinglePaymentHistory from './SinglePaymentHistory';

const PaymentHistory = () => {

    const { user, loading } = useContext(AuthContext);

    const [student, setStudent] = useState([])
    const [classHistory, setClassHistory] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/currentUser/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data[0].paymentHistory);
                setClassHistory(data[0]?.paymentHistory || []);
            });
    }, [loading, user]);

    useEffect(() => {
        fetch(`http://localhost:5000/currentUser/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data[0]);
                setStudent(data[0]);
            });
    }, [loading, user]);

    return (
        <div className="w-full">
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr className='text-center'>
                            <th>#</th>
                            <th>studentImage</th>
                            <th>StudentName</th>
                            <th>StudentEmail</th>
                            <th>className</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classHistory.map((singleClassHistory, index) => <SinglePaymentHistory key={index} index={index} student={student} singleClassHistory={singleClassHistory.classData}></SinglePaymentHistory>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;