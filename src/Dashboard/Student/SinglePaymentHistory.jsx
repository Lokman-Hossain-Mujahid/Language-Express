import React, { useContext } from 'react';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';

const SinglePaymentHistory = ({ singleClassHistory, student, index }) => {


    const { user } = useContext(AuthContext)

    


    console.log(singleClassHistory);
    console.log(student);

    return (
        <tr className='text-center'>
            
            <td>{index + 1}</td>
            <td className="flex justify-center">
                <div className="mask mask-squircle w-12 h-12">
                    <img src={user?.photoURL} alt="Avatar Tailwind CSS Component" />
                </div>
            </td>
            <td>
                {student?.name}
            </td>
            <td>{student?.email}</td>
            <td>{singleClassHistory?.className}</td>
            <td>${singleClassHistory?.price}</td>
            
        </tr>
    );
};

export default SinglePaymentHistory;