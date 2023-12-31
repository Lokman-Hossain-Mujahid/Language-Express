import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';
import SinglePaymentHistory from './SinglePaymentHistory';
import PageTItle from '../../Shared/PageTitle/PageTItle';

const PaymentHistory = () => {
  const { user, loading } = useContext(AuthContext);

  const [student, setStudent] = useState(null);
  const [classHistory, setClassHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://language-express-server.vercel.app/currentUser/${user?.email}`);
        const data = await response.json();
        const sortedClassHistory = data[0]?.paymentHistory || [];
        sortedClassHistory.reverse(); // Reverse the array to show the latest payment first
        setClassHistory(sortedClassHistory);
        setStudent(data[0]);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [loading, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <PageTItle title={"Payment History"}></PageTItle>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className='text-center'>
              
              <th>#</th>
              <th>studentImage</th>
              <th>StudentName</th>
              <th>StudentEmail</th>
              <th>className</th>
              <th>Price</th>
              
            </tr>
          </thead>
          <tbody>
            {classHistory.map((singleClassHistory, index) => (
              <SinglePaymentHistory
                key={index}
                index={index}
                student={student}
                singleClassHistory={singleClassHistory.classData}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
