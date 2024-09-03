import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import ReturnReport from "../../components/report/ReturnReport.jsx";

const ReturnReportPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ReturnReport/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ReturnReportPage;