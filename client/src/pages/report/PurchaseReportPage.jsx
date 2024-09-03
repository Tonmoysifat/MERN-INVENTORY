import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import PurchaseReport from "../../components/report/PurchaseReport.jsx";

const PurchaseReportPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PurchaseReport/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PurchaseReportPage;