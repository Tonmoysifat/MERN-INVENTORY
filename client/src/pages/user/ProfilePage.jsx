import React, {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
const Profile = lazy(() => import  ("../../components/user/Profile.jsx"));


const ProfilePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Profile/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProfilePage;