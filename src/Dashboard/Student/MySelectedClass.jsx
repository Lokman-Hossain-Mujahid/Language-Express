// MySelectedClass.js

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutFrom from '../../Pages/PaymentPage/CheckoutFrom';
import { loadStripe } from '@stripe/stripe-js';
import PageTItle from '../../Shared/PageTitle/PageTItle';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

  // 

const MySelectedClass = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [successfulPayments, setSuccessfulPayments] = useState([]);

  const deleteClass = (classData) => {
    const updatedClasses = selectedClasses.filter(
      (singleData) => singleData._id !== classData._id
    );

    fetch(`http://localhost:5000/deleteClass/${user.email}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ addedClasses: updatedClasses }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSelectedClasses(updatedClasses); // Update the state after successful deletion
        setSuccessfulPayments((prevPayments) => [...prevPayments, classData._id]); // Update successful payments state
        // Swal.fire('Deleted!', 'The class has been removed.', 'success');
      })
      .catch((error) => {
        console.error(error);
        Swal.fire('Error', 'An error occurred while deleting the class.', 'error');
      });

      console.log(updatedClasses);

  };

  const handlePaymentSuccess = (classData) => {
    deleteClass(classData);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/currentUser/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedClasses(data[0]?.addedClasses || []);
      });
  }, [loading, user]);

  return (
    <div className="w-full">
      <PageTItle title={"My Selected Classes"}></PageTItle>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Image</th>
              <th>ClassName</th>
              <th>InstructorName</th>
              <th>SeatsAvailable</th>
              <th>Price</th>
              <th>Delete</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
            {selectedClasses.map((classData, index) =>
              !classData.paid &&
              !successfulPayments.includes(classData._id) && (
                <tr key={classData._id} className="text-center">
                  <td>{index + 1}</td>
                  <td className="flex justify-center">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={classData.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </td>
                  <td>{classData.className}</td>
                  <td>{classData.instructorName}</td>
                  <td>{classData.availableSeats}</td>
                  <td>${classData.price}</td>
                  <td>
                    <button
                      onClick={() => deleteClass(classData)}
                      className="btn btn-primary"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <label htmlFor={classData._id} className="btn">
                      Pay
                    </label>
                    <input type="checkbox" id={classData._id} className="modal-toggle" />
                    <div className="modal">
                      <div className="modal-box w-11/12 max-w-5xl">
                        <div className="w-[50vw] rounded-lg p-4 mx-auto">
                          <div>
                            <h2 className="text-8xl text-center font-bebas py-4">Payment</h2>
                          </div>

                          <div className="">
                            <Elements stripe={stripePromise}>
                              <CheckoutFrom
                                classData={classData}
                                price={classData.price}
                                onSuccess={() => handlePaymentSuccess(classData)}
                              />
                            </Elements>
                          </div>
                        </div>
                        <div className="modal-action">
                          <label htmlFor={classData._id} className="btn">
                            Done
                          </label>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySelectedClass;
