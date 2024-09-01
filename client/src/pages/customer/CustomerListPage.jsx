import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import CustomerList from "../../components/customer/CustomerList.jsx";

const CustomerListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <CustomerList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};
export default CustomerListPage;