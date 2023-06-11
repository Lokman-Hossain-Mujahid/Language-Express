import React, { useContext } from 'react';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';

const MySingleSelectedClass = ({ classData, index, selectedClasses }) => {
    // console.log(classData);

    const {user} = useContext(AuthContext) 

    const { className, availableSeats, price, image, instructorName } = classData


    function deleteCLass(data,Class,user){

        const newData= data.filter(singleData=>singleData._id!=Class._id)
        console.log (newData)

        fetch(`https://language-express-server.vercel.app/deleteClass/${user.email}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({addedClasses:newData})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            
        })
 
 
     }

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
            <td>{availableSeats}</td>
            <td>${price}</td>
            <td><button onClick={() => deleteCLass(selectedClasses, classData, user )} className='btn btn-primary'>Delete</button></td>
            <td><button className='btn btn-primary'>Pay</button></td>
        </tr>
    );
};

export default MySingleSelectedClass;