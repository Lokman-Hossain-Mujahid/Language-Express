import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthProvider/AuthProvider';
import { FaUsersCog, FaChalkboard, FaHome, FaUserTie, FaBook, FaHistory, FaPlusCircle } from "react-icons/fa";



const Dashboard = () => {

    const [users, setUsers] = useState()

    const { user, loading } = useContext(AuthContext)

    useEffect(() => {
        fetch(`https://language-express-server.vercel.app/currentuser/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data[0].role);
                setUsers(data[0])
            })
    }, [loading])


    return (
        <div className="drawer lg:drawer-open">

            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col justify-center overflow-x-scroll w-[100%]">
            <label htmlFor="my-drawer-2" className=" mt-4 md:mt-0 btn btn-primary drawer-button lg:hidden">Open Sidebar</label>
                <div className=''>
                    <Outlet></Outlet>
                </div>
                

            </div>
            <div className="drawer-side absolute top-0 z-[69696969696]">

                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content font-nunito ">
                    <div className='text-xl pt-1'>
                        {user?.photoURL ? <img className='h-20 mt-2 mr-2 md:h-28 rounded-full md:mr-0 ml-24 md:mt-0 md:ml-16 cursor-pointer' src={user.photoURL} alt="profile" title={user.displayName}></img>
                            : user ? <img className='h-20 mt-2 mr-2 md:h-28 rounded-full md:mr-0 ml-24 md:mt-0 md:ml-16 cursor-pointer' src='/images/nouser.jpg' title={user.displayName} ></img> : ''}
                    </div>

                    <div className='text-center mb-4 flex items-center italic'>
                        <div>
                            <Link to="/">
                                <img className='h-14' src="/images/logo.png" alt="" />
                            </Link>
                        </div>
                        <div>
                            <Link to="/">
                                <h2 className='text-xl font-semibold pb-1 md:pb-0'>LanguageExpress</h2>
                            </Link>
                        </div>
                    </div>



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