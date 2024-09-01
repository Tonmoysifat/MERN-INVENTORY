import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import SupplierList from "../../components/supplier/SupplierList.jsx";

const CustomerListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <SupplierList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};
export default CustomerListPage;