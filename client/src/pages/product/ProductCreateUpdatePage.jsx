import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import ProductCreateUpdate from "../../components/product/ProductCreateUpdate.jsx";

const ProductCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ProductCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProductCreateUpdatePage;