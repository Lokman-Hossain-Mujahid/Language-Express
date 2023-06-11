import React from 'react';

const MySingleEnrolledClass = ({ enrolledClass, index }) => {

    

    return (
        <tr className='text-center'>
            <td>{index + 1}</td>
            <td className="flex justify-center">
                <div className="mask mask-squircle w-12 h-12">
                    <img src={enrolledClass?.image} alt="Avatar Tailwind CSS Component" />
                </div>
            </td>
            <td>{enrolledClass?.className}</td>
            <td>{enrolledClass?.instructorName}</td>
            
            <td>${enrolledClass?.price}</td>
            <td><button className='btn btn-disabled'>Paid</button></td>
        </tr>
    );
};

export default MySingleEnrolledClass;