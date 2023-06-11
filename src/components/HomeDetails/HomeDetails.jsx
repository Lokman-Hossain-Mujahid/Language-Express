import React from 'react';
import HomeBanner from '../HomeBanner/HomeBanner';
import PopularInstructors from '../PopularInstructors/PopularInstructors';

const HomeDetails = () => {
    return (
        <div>
            <div className=' w-11/12 border-4 border-orange-500 rounded mx-auto mb-6'>
                <HomeBanner></HomeBanner>
            </div>
            <div>
                <PopularInstructors></PopularInstructors>
            </div>
        </div>
    );
};

export default HomeDetails;