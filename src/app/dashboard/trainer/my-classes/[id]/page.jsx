import AddClassForm from '@/components/dashboard/trainer/AddClassForm';
import { GetClassById } from '@/lib/api/getClasses';
import React from 'react';

const UpdateClass = async({params}) => {
    const {id} =await params

    const classData = await GetClassById(id);

    return (
        <div>
            <AddClassForm classData={classData.data}/>
        </div>
    );
};

export default UpdateClass;