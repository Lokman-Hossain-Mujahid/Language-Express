import React, { useState } from 'react';
import Swal from 'sweetalert2';

const MySingleClasses = ({ singleClass, index, setUpdated }) => {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleUpdate = (event) => {
    event.preventDefault();

    const form = event.target;
    const price = form.price.value;
    const availableSeats = form.availableSeats.value;
    const id = form.id.value;

    fetch(`http://localhost:5000/update/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ price: price, availableSeats: availableSeats })
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Updated Successfully',
            text: 'The class has been updated successfully.',
            confirmButtonText: 'OK',
            onClose: () => {
              // Handle any necessary actions after the alert is closed
            }
          });
          event.target.reset();
          setUpdated(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isFeedbackDisabled = singleClass.status !== 'denied';

  return (
    <>
      <tr className="text-center">
        <td>{index + 1}</td>
        <td>{singleClass.className}</td>
        <td>{singleClass.status}</td>
        <td>{singleClass.enrolledStudents}</td>
        <td>
          <label htmlFor={`feedback-${singleClass._id}`} className="btn" disabled={isFeedbackDisabled}>
            Feedback
          </label>
          <input
            type="checkbox"
            id={`feedback-${singleClass._id}`}
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h2 className="text-6xl font-bebas font-semibold text-center">
                Feedback
              </h2>
              <hr className="md:w-1/4 mx-auto border-yellow-500 mb-6" />
              <div className="text-center md:my-6 md:h-[50vh] hero bg-orange-300 py-5 md:w-2/4 mx-auto rounded-lg">
                {singleClass.feedBack}
              </div>
              <div className="modal-action">
                <label
                  htmlFor={`feedback-${singleClass._id}`}
                  className="btn"
                  onClick={() => setFeedbackModalOpen(false)}
                >
                  Done
                </label>
              </div>
            </div>
          </div>
        </td>
        <td>
          <label htmlFor={`update-${singleClass._id}`} className="btn">
            Update
          </label>
          <input
            type="checkbox"
            id={`update-${singleClass._id}`}
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h2 className="text-6xl font-bebas font-semibold text-center">
                Update a Class
              </h2>
              <hr className="md:w-1/4 mx-auto border-yellow-500 mb-6" />
              <div className="text-center md:my-6 md:h-[70vh] hero bg-orange-300 py-5 md:w-2/4 mx-auto rounded-lg">
                <form className="flex flex-col" onSubmit={handleUpdate}>
                  <label htmlFor="price" className="label">
                    Price
                  </label>
                  <input
                    name="price"
                    defaultValue={singleClass.price}
                    type="number"
                    required={true}
                    placeholder="price"
                    className="input input-bordered w-full max-w-xs"
                  />

                  <label htmlFor="availableSeats" className="label">
                    Available Seats
                  </label>
                  <input
                    name="availableSeats"
                    defaultValue={singleClass.availableSeats}
                    type="number"
                    required={true}
                    placeholder="availableSeats"
                    className="input input-bordered w-full max-w-xs"
                  />

                  <input className="hidden" name="id" type="text" value={singleClass._id} />
                  <input className="hidden" name="email" type="email" value={singleClass.instructorEmail} />
                  <input className="btn btn-primary my-2" type="submit" value="Update" />
                </form>
              </div>
              <div className="modal-action">
                <label
                  htmlFor={`update-${singleClass._id}`}
                  className="btn"
                  onClick={() => setUpdateModalOpen(false)}
                >
                  Done
                </label>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default MySingleClasses;
