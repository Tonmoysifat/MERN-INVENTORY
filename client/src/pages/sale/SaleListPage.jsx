import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import SaleList from "../../components/sale/SaleList.jsx";

const SaleListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <SaleList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};
export default SaleListPage;