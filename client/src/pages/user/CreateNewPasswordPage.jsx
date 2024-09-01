import React, {lazy, Suspense} from 'react';
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
const CreateNewPassword = lazy(() => import  ("../../components/user/CreateNewPassword.jsx"));
const CreateNewPasswordPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <CreateNewPassword/>
        </Suspense>
    );
};

export default CreateNewPasswordPage;