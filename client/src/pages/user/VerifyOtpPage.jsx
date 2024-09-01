import React, {lazy, Suspense} from 'react';
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
const VerifyOtp = lazy(() => import  ("../../components/user/VerifyOtp.jsx"));

const VerifyOtpPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <VerifyOtp/>
        </Suspense>
    );
};

export default VerifyOtpPage;