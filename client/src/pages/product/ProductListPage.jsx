import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import ProductList from "../../components/product/ProductList.jsx";

const ProductListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ProductList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};
export default ProductListPage;