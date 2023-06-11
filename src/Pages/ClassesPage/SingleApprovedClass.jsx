import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';

  

const SingleApprovedClass = ({ approvedClass, index, added, setAdded }) => {
  const { image, className, instructorName, availableSeats, price, _id } = approvedClass;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClassSelected, setIsClassSelected] = useState(false);
  

  const navigate = useNavigate();

  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user && !loading) {
      fetch(`http://localhost:5000/currentUser/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data[0]);
          setIsLoading(false);
          console.log(data[0]);
        });
    } else {
      setIsLoading(false); // Stop loading if user is not logged in
    }
  }, [loading, user, added]);
  

  useEffect(() => {
    if (data) {
      const selectedClasses = data.selectedClasses || [];
      setIsClassSelected(selectedClasses.includes(approvedClass._id));
    }
  }, [approvedClass, data]);

  const handleAppliedClasses = (email, user) => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:5000/manageUserAddClass/${email}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ addedClass: [approvedClass] }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsClassSelected(true);

        fetch(`http://localhost:5000/updateSelectedClasses/${email}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ selectedClasses: [approvedClass._id] }),
        });
        setAdded(true)
        Swal.fire({
          title: 'Success',
          text: 'Class added successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  

  return (
    <div>
      <div className={`card w-96 ${availableSeats === 0 ? 'bg-red-500' : 'bg-orange-400'} h-[50vh] shadow-xl font-nunito text-white`}>
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{className}</h2>
          <p className="font-semibold">Name: {instructorName}</p>
          <p className="font-semibold">Seats available: {availableSeats}</p>
          <p className="font-semibold">Price: ${price}</p>
          <div className="card-actions">
            <button onClick={() => handleAppliedClasses(user?.email, user)} disabled={data?.role == 'admin' ? true : data?.role == 'instructor' ? true : availableSeats == '0' ? true : data?.addedClasses?.find(Class => Class._id == _id) ? true : false} className={`btn btn-primary ${availableSeats == '0' && 'disabled'} ${user?.role == 'admin' ? 'disabled' : user?.role == 'instructor' && 'disabled'}`}>{data?.addedClasses?.find(Class => Class._id == _id) ? 'already Added' : 'Add to list'}</button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default SingleApprovedClass;
