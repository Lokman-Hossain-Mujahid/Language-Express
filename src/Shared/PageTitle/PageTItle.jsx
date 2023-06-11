import React from 'react';

const PageTItle = ({title}) => {
    return (
        <div>
            <h2 className='text-6xl font-bebas font-semibold text-center'>{title}</h2>
            <hr className='md:w-4/4 border-2 rounded-lg mx-auto border-orange-400 mb-6' />
        </div>
    );
};

export default PageTItle;