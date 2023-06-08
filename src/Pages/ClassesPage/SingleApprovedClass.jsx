import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';

const SingleApprovedClass = ({ approvedClass, index }) => {
  const { image, className, instructorName, availableSeats, price } = approvedClass;
  const [isSelected, setIsSelected] = useState(false);

  const handleSelectClass = () => {
    const selectedClass = {
      image,
      className,
      instructorName,
      availableSeats,
      price
    };

    fetch('http://localhost:5000/selectedClasses', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedClass)
    })
      .then(response => {
        if (response.ok) {
          // Show success alert
          Swal.fire({
            icon: 'success',
            title: 'Class selected successfully!',
            showConfirmButton: false,
            timer: 1500
          });

          // Disable the button for the selected class
          setIsSelected(true);
        } else {
          // Show error alert
          Swal.fire({
            icon: 'error',
            title: 'Failed to select the class.',
            text: 'Please try again.',
            confirmButtonText: 'OK'
          });
        }
      })
      .catch(error => {
        console.error('Error occurred while selecting the class:', error);
        // Show error alert
        Swal.fire({
          icon: 'error',
          title: 'An error occurred',
          text: 'Please try again.',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <div>
      <div className="card w-96 bg-orange-400 h-[50vh] shadow-xl font-nunito">
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{className}</h2>
          <p>Name: {instructorName}</p>
          <p>Seats available: {availableSeats}</p>
          <p>price: ${price}</p>
          <div className="card-actions">
            <button className="btn" onClick={handleSelectClass} disabled={isSelected}>
              {isSelected ? 'Class Selected' : 'Select Class'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleApprovedClass;
