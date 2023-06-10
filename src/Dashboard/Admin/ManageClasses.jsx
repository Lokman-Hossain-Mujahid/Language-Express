import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const ManageClasses = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleGetFeedback = (event, addClass) => {
    event.preventDefault();

    const form = event.target;
    const feedBack = form.feedBack.value;
    const id = addClass._id;
    console.log(feedBack);

    fetch(`http://localhost:5000/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ feedBack: feedBack }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.modifiedCount > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Feedback Submitted',
            text: 'Your feedback has been submitted successfully.',
            confirmButtonText: 'OK',
            onClose: () => {
              form.reset();
              setModalOpen(false);
            },
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleApprove = (addClass) => {
    fetch(`http://localhost:5000/classes/${addClass._id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status: 'approved' }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: `${addClass.className} is Approved!`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  const handleDeny = (addClass) => {
    fetch(`http://localhost:5000/classes/${addClass._id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status: 'denied' }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: `${addClass.className} is Denied!`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  const { data: addedClasses = [], refetch } = useQuery(
    ['addedClasses'],
    async () => {
      const res = await fetch('http://localhost:5000/classes');
      return res.json();
    }
  );

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Class Image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {addedClasses.map((addClass, index) => (
              <tr className="text-center" key={index}>
                <td>{index + 1}</td>
                <td className="flex justify-center">
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
                <td className="">
                  <button
                    onClick={() => handleApprove(addClass)}
                    className="btn btn-warning"
                    disabled={addClass.status === 'approved' || addClass.status === 'denied'}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeny(addClass)}
                    className="btn btn-warning mx-1"
                    disabled={addClass.status === 'approved' || addClass.status === 'denied'}
                  >
                    Deny
                  </button>
                </td>
                <td>
                  <label htmlFor={addClass._id} className="btn">
                    Feedback
                  </label>
                  <input type="checkbox" id={addClass._id} className="modal-toggle" />
                  <div className={`modal ${modalOpen ? 'open' : ''}`}>
                    <div className="modal-box w-11/12 max-w-5xl">
                      <h2 className="text-6xl font-bebas font-semibold text-center">Give Feedback</h2>
                      <hr className="md:w-1/4 mx-auto border-yellow-500 mb-6" />
                      <div className="text-center md:my-6 md:h-[70vh] hero bg-orange-300 py-5 md:w-2/4 mx-auto rounded-lg">
                        <form className="flex flex-col" onSubmit={(event) => handleGetFeedback(event, addClass)}>
                          <label htmlFor="email" className="label">
                            Add Description
                          </label>
                          <textarea
                            name="feedBack"
                            required={true}
                            defaultValue={addClass.feedBack}
                            className="textarea my-2"
                            placeholder="feedback"
                          ></textarea>
                          <input className="hidden" name="id" type="text" value={addClass._id} />
                          <input className="hidden" name="email" type="email" value={addClass.instructorEmail} />
                          <input className="btn btn-primary my-2" type="submit" />
                        </form>
                      </div>
                      <div className="modal-action">
                        <label htmlFor={addClass._id} className="btn" onClick={() => setModalOpen(false)}>
                          Done
                        </label>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
