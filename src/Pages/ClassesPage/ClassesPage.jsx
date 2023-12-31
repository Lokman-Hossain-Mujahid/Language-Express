import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import SingleApprovedClass from './SingleApprovedClass';
import PageTItle from '../../Shared/PageTitle/PageTItle';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';

    // Changing

const ClassesPage = () => {
    const [added, setAdded] = useState()
    const {user, loading} = useContext(AuthContext)
    const [approvedClasses, setApproveClasses] = useState([])

        useEffect(() => {
            fetch('https://language-express-server.vercel.app/classes')
            .then(res => res.json())
            .then(data => 
                
                setApproveClasses(data)   

                )
        }, [user, loading, added])


    return (
        <div>
            <PageTItle title={"All Available Classes"}></PageTItle>
            <div className='grid md:grid-cols-3 max-w-7xl mx-auto gap-10 mb-2 md:my-6'>
            

            {
                approvedClasses.filter(approvedClass => approvedClass.status === 'approved').map((approvedClass, index) => <SingleApprovedClass added={added} setAdded={setAdded} key={index} index={index} approvedClass={approvedClass}></SingleApprovedClass>)

            }
        </div>
        </div>
    );
};

export default ClassesPage;