import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {

    const isAdmin = true;

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
                        isAdmin ?
                            <> <li><Link to='manageclasses'>Manage Classes</Link></li>
                                <li><Link to='manageusers'>Manage Users</Link></li>
                            </> :
                            <>
                                <li><Link to='myselectedclass'>My Selected Classes</Link></li>
                                <li><Link to='myenrolledclass'>My Enrolled Classes</Link></li>
                            </>
                    }

                    {/* <li><Link to='myselectedclass'>My Selected Classes</Link></li>
                    <li><Link to='myenrolledclass'>My Enrolled Classes</Link></li> */}
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