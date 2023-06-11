import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';

const HomePage = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <div  className='min-h-[740px]'>
                <Outlet></Outlet>
            </div>
            <div className=''>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default HomePage;