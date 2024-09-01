import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import ReturnList from "../../components/return/ReturnList.jsx";

const ReturnListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ReturnList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};
export default ReturnListPage;