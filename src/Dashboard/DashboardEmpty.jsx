import React from 'react';
import PageTItle from '../Shared/PageTitle/PageTItle';

const DashboardEmpty = () => {
    return (
        <div>
            <hr className='md:w-4/4 border-2 rounded-lg mx-auto border-orange-400 mb-2' />
           <PageTItle title={"Please Select Any Of The Routes From Dashboard"}></PageTItle>
        </div>
    );
};

export default DashboardEmpty;