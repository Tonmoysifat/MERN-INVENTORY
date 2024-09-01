import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import BrandList from "../../components/brand/BrandList.jsx";

const BrandListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <BrandList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default BrandListPage;