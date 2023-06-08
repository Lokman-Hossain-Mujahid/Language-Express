import React from 'react';



const HomeBanner = () => {
    return (
        <div className='my-6'>
            <div className="hero min-h-screen bg-home-banner rounded-lg font-nunito">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-8xl font-bold">Welcome</h1>
                        <h1 className="mb-5 text-7xl font-bold">To LanguageExpress</h1>
                        <p className="mb-5 text-xl">You can learn any language you want from our best native language Instructors</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;