import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import PurchaseList from "../../components/purchase/PurchaseList.jsx";

const CustomerListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PurchaseList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};
export default CustomerListPage;