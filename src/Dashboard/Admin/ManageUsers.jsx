import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaUserShield, FaChalkboardTeacher } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const { data: users = [], refetch } = useQuery(['users'], async () => {
    const res = await fetch('http://localhost:5000/users');
    return res.json();
  });

  const handleMakeAdmin = (user) => {
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  const handleMakeInstructor = (user) => {
    fetch(`http://localhost:5000/users/instructor/${user._id}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: `${user.name} is an Instructor Now!`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Make Instructor</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.email !== 'rclash163@gmail.com')
              .map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      onClick={() => handleMakeInstructor(user)}
                      className="btn btn-warning"
                      disabled={user.role === 'instructor' || user.role === 'admin'}
                    >
                      <FaChalkboardTeacher />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-warning"
                      disabled={user.role === 'admin'}
                    >
                      <FaUserShield />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
