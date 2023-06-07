import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthProvider/AuthProvider';


const Dashboard = () => {

    const [users, setUsers] = useState()

    const {user, loading} = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:5000/currentuser/${user?.email}`)
        .then(res => res.json())
        .then(data => {
            console.log(data[0].role);
            setUsers(data[0])
        })
    }, [loading])


    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Sidebar</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">

                    

                    {
                        users?.role == 'admin' &&

                        <>
                            <li><Link to='manageclasses'>Manage Classes</Link></li>
                            <li><Link to='manageusers'>Manage Users</Link></li>
                        </>
                        

                    }

                    {
                        users?.role === 'instructor' &&
                        <>
                            <li><Link to='addaclass'>Add a class</Link></li>
                            <li><Link to='myclass'>My Classes</Link></li>

                        </>

                    }

                    {
                        users?.role === 'student' &&
                        <>
                            <li><Link to='myselectedclasses'>My Selected Classes</Link></li>
                            <li><Link to='myenrolledclass'>My Enrolled Classes</Link></li>

                        </>

                    }




                    <div className='divider my-3'></div>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/instructors'>Instructors</Link></li>
                    <li><Link to='/classes'>Classes</Link></li>
                   

                </ul>

            </div>
        </div>
    );
};

export default Dashboard;