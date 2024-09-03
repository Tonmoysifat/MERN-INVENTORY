import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import BrandCreateUpdate from "../../components/brand/BrandCreateUpdate.jsx";

const BrandCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <BrandCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default BrandCreateUpdatePage;