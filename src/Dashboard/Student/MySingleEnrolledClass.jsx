import React from 'react';

const MySingleEnrolledClass = ({ enrolledClass, index }) => {

    const {className, availableSeats, price, image, instructorName} = enrolledClass

    return (
        <tr className='text-center'>
            <td>{index + 1}</td>
            <td className="flex justify-center">
                <div className="mask mask-squircle w-12 h-12">
                    <img src={image} alt="Avatar Tailwind CSS Component" />
                </div>
            </td>
            <td>{className}</td>
            <td>{instructorName}</td>
            
            <td>${price}</td>
            <td><button className='btn btn-disabled'>Paid</button></td>
        </tr>
    );
};

export default MySingleEnrolledClass;