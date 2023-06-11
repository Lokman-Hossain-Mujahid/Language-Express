import React from 'react';
import HomeBanner from '../HomeBanner/HomeBanner';
import PopularInstructors from '../PopularInstructors/PopularInstructors';
import PopularClass from '../PopularClass/PopularClass';
import ContactUs from '../ContactUs/ContactUs';

const HomeDetails = () => {
    return (
        <div>
            <div className=' w-11/12 border-4 border-orange-500 rounded mx-auto mt-2 mb-6'>
                <HomeBanner></HomeBanner>
            </div>
            <div className='mb-6'>               
                <PopularClass></PopularClass>
            </div>
            <div>
                <PopularInstructors></PopularInstructors>
            </div>
            <div className='md:h-[80vh]'>
                <ContactUs></ContactUs>
            </div>
        </div>
    );
};

export default HomeDetails;