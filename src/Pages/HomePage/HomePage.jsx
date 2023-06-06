import React from 'react';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h2>HomePage</h2>
            <Outlet></Outlet>
        </div>
    );
};

export default HomePage;