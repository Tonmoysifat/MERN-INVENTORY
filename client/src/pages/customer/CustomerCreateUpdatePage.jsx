import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import CustomerCreateUpdate from "../../components/customer/CustomerCreateUpdate.jsx";

const CustomerCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <CustomerCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};
export default CustomerCreateUpdatePage;