import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import SaleCreateUpdate from "../../components/sale/SaleCreateUpdate.jsx";

const SaleCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <SaleCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default SaleCreateUpdatePage;