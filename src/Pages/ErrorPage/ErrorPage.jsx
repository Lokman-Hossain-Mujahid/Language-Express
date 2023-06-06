import React from 'react';
import { Link, useRouteError } from "react-router-dom";
import Error from "../../error.json"
import Lottie from "lottie-react"

export default function ErrorPage() {
    // const error = useRouteError();
    // console.error(error);

    return (
        <div className=' text-5xl text-center' id="ErrorPage">
            <div className='w-[50vw] mx-auto'>
                <Lottie animationData={Error} />
            </div>
            
            <Link to="/"><button className='px-5 py-5 text-white font-bebas text-3xl bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg mt-4 md:mt-0'>Return To Home</button></Link>
        </div>
    );
}