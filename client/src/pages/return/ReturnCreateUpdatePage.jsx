import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import ReturnCreateUpdate from "../../components/return/ReturnCreateUpdate.jsx";

const ReturnCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ReturnCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ReturnCreateUpdatePage;