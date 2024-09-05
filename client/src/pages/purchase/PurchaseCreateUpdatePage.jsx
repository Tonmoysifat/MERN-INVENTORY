import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import PurchaseCreateUpdate from "../../components/purchase/PurchaseCreateUpdate.jsx";

const PurchaseCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PurchaseCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PurchaseCreateUpdatePage;