import React, {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
const Login = lazy(() => import  ("../../components/user/Login.jsx"));

const LoginPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <Login/>
            </Suspense>
        </Fragment>
    );
};

export default LoginPage;