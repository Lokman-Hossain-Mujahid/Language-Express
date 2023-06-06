import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(result => { })
            .catch(error => console.error(error))
    }

    return (
        <div>
            <div>
                <div className="navbar bg-base-100 text-2xl md:text-3xl">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/instructors">Instructors</Link></li>
                                <li><Link to="/classes">classes</Link></li>
                                {user && <li><Link to="/dashboard">Dashboard</Link></li>}
                            </ul>
                        </div>
                        <div className='flex items-center'>
                            <div>
                                <img className='w-20' src="/public/images/logo.png" alt="" />
                            </div>
                            <div>
                                <Link to="/" className="normal-case text-4xl font-semibold italic text-orange-500">LanguageExpress</Link>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-center hidden font-bebas lg:flex">
                        <ul className="menu menu-horizontal px-1 text-2xl">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/instructors">Instructors</Link></li>
                            <li><Link to="/classes">classes</Link></li>
    

                            {user && <div className='flex-col mx-auto md:mx-0 md:flex'>
                                <li><Link to="/addtoys">Dashboard</Link></li>
                            </div>}

                        </ul>
                    </div>
                    <div className="navbar-end md:mr-3">
                        <div className='text-xl pt-1 flex'>

                            {user?.photoURL ? <img className='h-8 mt-2 mr-2 md:h-11 rounded-full md:mr-2 mx-auto md:mt-0 md:mx-0 cursor-pointer' src={user.photoURL} alt="profile" title={user.displayName}></img> : user ? <img className='h-8 mt-2 mr-2 md:h-11 rounded-full md:mr-2 mx-auto md:mt-0 md:mx-0 cursor-pointer' src='/pictures/nouser.jpg' title={user.displayName} ></img> : ''}

                            {user && <div className='flex-col mx-auto md:mx-0 md:flex'>

                                <button onClick={handleLogOut} className="btn">Logout</button>

                            </div>}

                            {user == null && <Link to='/login'><button className="btn ">Login</button></Link>}

                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Navbar;