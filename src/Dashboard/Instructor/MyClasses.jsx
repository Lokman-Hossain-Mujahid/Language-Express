import React from 'react';
import useClasses from '../../hooks/useClasses';
import { RxUpdate} from "react-icons/rx";

const MyClasses = () => {

    const [classes] = useClasses();
    console.log(classes);

    return (
        <div className='w-full'>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Name</th>
                            <th>Status</th>
                            <th>Enrolled Students</th>
                            <th>Feedback</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            classes.map((allClass, index) =>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <th>{allClass.className}</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th><button className="btn btn-warning"><RxUpdate/></button></th>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
        
    );
};

export default MyClasses;