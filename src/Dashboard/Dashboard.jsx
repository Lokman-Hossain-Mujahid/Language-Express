import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthProvider/AuthProvider';
import { FaUsersCog, FaChalkboard, FaHome, FaUserTie, FaBook, FaHistory, FaPlusCircle } from "react-icons/fa";



const Dashboard = () => {

    const [users, setUsers] = useState()

    const { user, loading } = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:5000/currentuser/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data[0].role);
                setUsers(data[0])
            })
    }, [loading])


    return (
        <div className="drawer lg:drawer-open">

            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className=" mt-4 md:mt-0 btn btn-primary drawer-button lg:hidden">Open Sidebar</label>

            </div>
            <div className="drawer-side">

                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content font-nunito">

                    <Link to="/">
                        <div className='text-center mb-6 flex items-center italic'>
                            <div>
                                <img className='h-14' src="/public/images/logo.png" alt="" />
                            </div>
                            <div>
                                <h2 className='text-xl font-semibold pb-1 md:pb-0'>LanguageExpress</h2>
                            </div>
                        </div>
                    </Link>


                    {
                        users?.role == 'admin' &&

                        <>
                            <li><Link to='/dashboard/manageclasses'><FaChalkboard></FaChalkboard>Manage Classes</Link></li>
                            <li><Link to='/dashboard/manageusers'><FaUsersCog></FaUsersCog>Manage Users</Link></li>
                        </>


                    }

                    {
                        users?.role === 'instructor' &&
                        <>
                            <li><Link to='/dashboard/addaclass'><FaPlusCircle></FaPlusCircle>Add a class</Link></li>
                            <li><Link to='/dashboard/myclass'><FaChalkboard></FaChalkboard>My Classes</Link></li>

                        </>

                    }

                    {
                        users?.role === 'student' &&
                        <>
                            <li><Link to='/dashboard/myselectedclasses'><FaBook></FaBook>My Selected Classes</Link></li>
                            <li><Link to='/dashboard/myenrolledclass'><FaChalkboard></FaChalkboard>My Enrolled Classes</Link></li>
                            <li><Link to='/dashboard/paymentHistory'><FaHistory></FaHistory>PaymentHistory</Link></li>
                        </>

                    }




                    <div className='divider my-3'></div>
                    <li><Link to='/'><FaHome></FaHome>Home</Link></li>
                    <li><Link to='/instructors'><FaUserTie></FaUserTie>Instructors</Link></li>
                    <li><Link to='/classes'><FaChalkboard></FaChalkboard>Classes</Link></li>


                </ul>

            </div>
        </div>
    );
};

export default Dashboard;