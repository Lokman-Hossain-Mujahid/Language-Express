import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';

const SingleApprovedClass = ({ approvedClass, index }) => {
  const { image, className, instructorName, availableSeats, price } = approvedClass;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClassSelected, setIsClassSelected] = useState(false);

  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5000/currentUser/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data[0]);
        setIsLoading(false);
      });
  }, [loading, user]);

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
      <div className="card w-96 bg-orange-400 h-[50vh] shadow-xl font-nunito text-white">
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{className}</h2>
          <p className="font-semibold">Name: {instructorName}</p>
          <p className="font-semibold">Seats available: {availableSeats}</p>
          <p className="font-semibold">price: ${price}</p>
          <div className="card-actions">
            <button
              onClick={() => handleAppliedClasses(user?.email, user)}
              disabled={
                isClassSelected ||
                data?.role === 'admin' ||
                data?.role === 'instructor' ||
                approvedClass.seats === '0' ||
                (data?.addedClasses && data?.addedClasses.find((Class) => Class._id === approvedClass._id))
              }
              className={`btn btn-primary ${
                approvedClass.seats === '0' && 'disabled'
              } ${user?.role === 'admin' ? 'disabled' : user?.role === 'instructor' && 'disabled'}`}
            >
              {isClassSelected ? 'Already Selected' : 'Select Class'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleApprovedClass;
