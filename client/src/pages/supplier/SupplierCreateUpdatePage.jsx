import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import SupplierCreateUpdate from "../../components/supplier/SupplierCreateUpdate.jsx";

const SupplierCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <SupplierCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default SupplierCreateUpdatePage;