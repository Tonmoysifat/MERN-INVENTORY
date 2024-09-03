import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import CategoryCreateUpdate from "../../components/category/CategoryCreateUpdate.jsx";

const CategoryCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <CategoryCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CategoryCreateUpdatePage;