import React, {lazy, Suspense} from 'react';
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
const SendOtp = lazy(() => import  ("../../components/user/SendOtp.jsx"));

const SendOtpPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <SendOtp/>
        </Suspense>
    );
};

export default SendOtpPage;