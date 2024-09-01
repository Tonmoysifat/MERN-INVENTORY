import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import CategoryList from "../../components/category/CategoryList.jsx";

const CategoryListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <CategoryList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};
export default CategoryListPage;