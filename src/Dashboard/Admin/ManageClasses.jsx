import React, { useEffect, useState } from 'react';

const ManageClasses = () => {


    const [addedClasses, setAddedClasses] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAddedClasses(data)
            })
    }, [])

    return (
        <div className="w-full">
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr className=''>
                            <th>#</th>
                            <th>Class Image</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Instructor Email</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                            addedClasses.map((addClass, index) => console.log(addClass))
                        } */}
                        {
                            addedClasses.map((addClass, index) => (
                            
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={addClass.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </td>
                                    <td>{addClass.className}</td>
                                    <td>{addClass.instructorName}</td>
                                    <td>{addClass.instructorEmail}</td>
                                    <td>{addClass.availableSeats}</td>
                                    <td>${addClass.price}</td>
                                    <td>{addClass.status}</td>
                                    
                                    <td className=''>

                                        <button className='btn btn-warning'>1</button>
                                        <button className='btn btn-warning'>2</button>
                                        <button className='btn btn-warning'>3</button>
                                    
                                    </td>

                                </tr>
                            )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;